/**
 * Interactive three.js Rubik's cube scene.
 *
 * Ported from the MevCube frontend (CubeDomElement), which was based on
 * https://github.com/Aaron-Bird/rubiks-cube
 *
 *   MIT License — Copyright (c) Aaron-Bird
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this
 *   software, to deal in the Software without restriction, subject to including the
 *   above copyright notice and this permission notice in all copies or substantial
 *   portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
 *
 * Changes from the original: module-level singletons became an instance class with
 * `dispose()`; nothing touches `window`/`document` at import time; the canvas is sized
 * to its container (ResizeObserver) and pointer math is container-relative; mouse and
 * touch handlers were unified as pointer events; @tweenjs/tween.js was replaced by a
 * small tween runner driven from the render loop; blockchain/redux/router code removed.
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CubeModel, setOpacity } from "./cube-model";
import {
  SOLVED_STATE,
  applyMoves,
  generateScramble,
  getNotation,
  isValidState,
  toRotation,
} from "./cube-state";
import { TweenRunner } from "./tween";
import type { Axis } from "./types";

/** Pixels the pointer must travel before a drag picks a rotation axis. */
const MIN_MOVE_DISTANCE = 10;
const ROTATION_RAD_PER_PX = 0.01;
/** Layer turn animation speed: ms per half turn (original: 500ms per PI). */
const MS_PER_PI = 500;
/** Scramble turns run faster than user-released turns. */
const SCRAMBLE_MS_PER_PI = 300;
/**
 * The original used zoom 0.15 at (3,3,3) — a very wide effective FOV that made the cube
 * look fish-eyed and small. Pulling the camera back and zooming in keeps the framing
 * but with gentler perspective and a slightly larger cube.
 */
const BASE_ZOOM = 0.26;
const CAMERA_POSITION = new THREE.Vector3(4, 4, 4);

export type CubeStateChangeSource = "user" | "scramble" | "reset";

export interface CubeSceneOptions {
  /** 54-char URFDLB facelet string. Defaults to solved. */
  initialState?: string;
  /**
   * Called whenever the logical cube state changes. For user turns, `move` is the turn
   * in Singmaster notation (e.g. "R'", "U2").
   */
  onStateChange?: (state: string, source: CubeStateChangeSource, move?: string) => void;
  /** Fade the layer being dragged (original behaviour). Default true. */
  highlightActiveLayer?: boolean;
}

export interface ScrambleOptions {
  /** Number of random moves. Default 20. */
  moves?: number;
  /** Skip animation. Defaults to the user's prefers-reduced-motion setting. */
  instant?: boolean;
}

interface DragTarget {
  cubelet: THREE.Object3D;
  point: THREE.Vector3;
}

function getClosestAxis(vec: THREE.Vector3): Axis {
  const ax = Math.abs(vec.x);
  const ay = Math.abs(vec.y);
  const az = Math.abs(vec.z);
  if (ax >= ay && ax >= az) return "x";
  return ay >= az ? "y" : "z";
}

/** Camera rotation angle around the y axis, relative to the origin. */
function horizontalRotationAngle(position: THREE.Vector3) {
  const dir = new THREE.Vector3(position.x, 0, position.z).normalize();
  return new THREE.Vector2(dir.z, dir.x).angle();
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export class CubeScene {
  private readonly container: HTMLElement;
  private readonly options: CubeSceneOptions;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly raycaster = new THREE.Raycaster();
  private readonly tweens = new TweenRunner();
  /** Holds the cubelets of the layer currently being turned. */
  private readonly layer = new THREE.Group();
  private model: CubeModel;
  private currentState: string;

  private rafId = 0;
  private visible = true;
  private disposed = false;
  /** Bumped by reset()/dispose() so in-flight animations know to bail out. */
  private generation = 0;
  private busy = false;
  /** Snap animation of a just-released user turn, if one is running. */
  private pendingTurn: Promise<void> | null = null;
  private readonly resizeObserver: ResizeObserver | null;
  private readonly intersectionObserver: IntersectionObserver | null;

  // Drag state
  private draggable = true;
  private activePointerId: number | null = null;
  private target: DragTarget | null = null;
  private lockRotationDirection = false;
  private mouseMoveAxis: "x" | "y" = "x";
  private layerRotationAxis: Axis | null = null;
  private layerRotationAxisToward: 1 | -1 = 1;
  private initMoveToward = 0;
  private readonly targetFaceDirection = new THREE.Vector3();
  private readonly pointer = new THREE.Vector2();
  private readonly pointerDown = new THREE.Vector2();
  private readonly viewCenter = new THREE.Vector2();
  private readonly ndc = new THREE.Vector2();

  constructor(container: HTMLElement, options: CubeSceneOptions = {}) {
    this.container = container;
    this.options = options;
    this.currentState =
      options.initialState && isValidState(options.initialState)
        ? options.initialState
        : SOLVED_STATE;
    if (options.initialState && !isValidState(options.initialState)) {
      console.warn("[MevCube] Ignoring invalid initialState; expected 54 URFDLB chars.");
    }

    // Transparent canvas so the surrounding surface colour shows through in both themes.
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const canvas = this.renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.cursor = "grab";
    container.appendChild(canvas);

    // Very dim lights: stickers are emissive, the lights only add a hint of shading.
    // (Pre-r155 light intensities were implicitly scaled by PI; with colour management
    // the addition also happens in linear space, so these are tuned to match visually.)
    const light1 = new THREE.DirectionalLight(0xffffff, 0.05);
    light1.position.set(10, 10, 10);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.05);
    light2.position.set(-10, -10, -10);
    this.scene.add(light1, light2);

    this.camera = new THREE.PerspectiveCamera(20, 1, 0.1, 660);
    this.camera.zoom = BASE_ZOOM;
    this.camera.position.copy(CAMERA_POSITION);

    this.model = new CubeModel(this.currentState);
    this.scene.add(this.model.group, this.layer);

    // Register our pointer handlers BEFORE OrbitControls so pointerdown on a cubelet
    // can disable the controls before they start orbiting.
    canvas.addEventListener("pointerdown", this.onPointerDown);
    canvas.addEventListener("pointermove", this.onPointerMove);
    canvas.addEventListener("pointerup", this.onPointerUp);
    canvas.addEventListener("pointercancel", this.onPointerUp);
    canvas.addEventListener("pointerleave", this.onPointerLeave);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enablePan = false;
    // Zoom would hijack page scrolling (wheel / pinch) when embedded in an article.
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.rotateSpeed = 2;

    const rect = container.getBoundingClientRect();
    this.resize(rect.width, rect.height);
    this.resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver((entries) => {
            const box = entries[0]?.contentRect;
            if (box) this.resize(box.width, box.height);
          })
        : null;
    this.resizeObserver?.observe(container);

    // Skip rendering while scrolled out of view.
    this.intersectionObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            this.visible = entries.some((e) => e.isIntersecting);
          })
        : null;
    this.intersectionObserver?.observe(container);

    this.rafId = requestAnimationFrame(this.animate);
  }

  /** Current 54-char facelet state. */
  get state(): string {
    return this.currentState;
  }

  get isScrambling(): boolean {
    return this.busy;
  }

  /**
   * Jump (without animation) to `state`, defaulting to solved, and restore the default
   * view unless `keepView` is set. Cancels a running scramble.
   */
  reset(state: string = SOLVED_STATE, { keepView = false }: { keepView?: boolean } = {}) {
    if (this.disposed) return;
    if (!isValidState(state)) throw new Error(`Invalid cube state: ${state}`);
    this.generation++;
    this.tweens.cancelAll();
    this.clearDrag();
    this.busy = false;
    this.draggable = true;
    this.rebuild(state);
    // Also restore the default camera angle.
    if (!keepView) this.controls.reset();
    this.emit("reset");
  }

  /** Apply random moves, animated one at a time (or instantly with reduced motion). */
  async scramble({ moves = 20, instant = prefersReducedMotion() }: ScrambleOptions = {}) {
    if (this.disposed || this.busy) return;
    this.busy = true;
    const generation = this.generation;
    const sequence = generateScramble(moves);
    try {
      // Let a released user turn finish snapping, and abort any drag in progress.
      if (this.pendingTurn) await this.pendingTurn;
      if (generation !== this.generation) return;
      this.clearDrag();
      this.draggable = false;

      if (instant) {
        this.rebuild(applyMoves(this.currentState, sequence.join(" ")));
        this.emit("scramble");
        return;
      }

      for (const move of sequence) {
        const [axis, value, rad] = toRotation(move);
        this.currentState = applyMoves(this.currentState, move);
        this.groupLayer(axis, value, false);
        await this.animateLayer(axis, rad, SCRAMBLE_MS_PER_PI);
        if (generation !== this.generation) return;
        this.ungroupLayer();
        this.emit("scramble");
      }
    } finally {
      if (generation === this.generation) {
        this.busy = false;
        this.draggable = true;
      }
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.generation++;
    cancelAnimationFrame(this.rafId);
    this.tweens.cancelAll();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();

    const canvas = this.renderer.domElement;
    canvas.removeEventListener("pointerdown", this.onPointerDown);
    canvas.removeEventListener("pointermove", this.onPointerMove);
    canvas.removeEventListener("pointerup", this.onPointerUp);
    canvas.removeEventListener("pointercancel", this.onPointerUp);
    canvas.removeEventListener("pointerleave", this.onPointerLeave);
    this.controls.dispose();

    this.model.dispose([this.model.group, this.layer]);
    this.scene.clear();
    this.renderer.dispose();
    // Free the WebGL context immediately (matters under StrictMode double-mount).
    this.renderer.forceContextLoss();
    canvas.remove();
  }

  // ---------------------------------------------------------------------------
  // Internals
  // ---------------------------------------------------------------------------

  private emit(source: CubeStateChangeSource, move?: string) {
    this.options.onStateChange?.(this.currentState, source, move);
  }

  private animate = (now: number) => {
    this.rafId = requestAnimationFrame(this.animate);
    this.tweens.update(now);
    if (!this.visible) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private resize(width: number, height: number) {
    if (width <= 0 || height <= 0) return;
    this.renderer.setSize(width, height, false);
    this.viewCenter.set(width / 2, height / 2);
    const aspect = width / height;
    this.camera.aspect = aspect;
    // Keep the whole cube in frame on portrait/narrow containers.
    this.camera.zoom = BASE_ZOOM * Math.min(1, aspect);
    this.camera.updateProjectionMatrix();
  }

  private rebuild(state: string) {
    this.scene.remove(this.model.group);
    this.model.dispose([this.model.group, this.layer]);
    this.layer.clear();
    this.layer.rotation.set(0, 0, 0);
    this.currentState = state;
    this.model = new CubeModel(state);
    this.scene.add(this.model.group);
  }

  /** Move every cubelet in the given layer into the rotating layer group. */
  private groupLayer(axis: Axis, value: number, highlight: boolean) {
    const cubelets = this.model.cubelets;
    for (let i = cubelets.length - 1; i >= 0; i--) {
      const cubelet = cubelets[i]!;
      if (Math.round(cubelet.position[axis]) === value) {
        if (highlight) setOpacity(cubelet, 0.5);
        this.layer.add(cubelet);
      }
    }
  }

  /** Bake the layer's rotation into its cubelets and return them to the cube. */
  private ungroupLayer() {
    this.layer.updateMatrixWorld(true);
    for (let i = this.layer.children.length - 1; i >= 0; i--) {
      const cubelet = this.layer.children[i]!;
      this.model.group.attach(cubelet);
      cubelet.position.round();
      setOpacity(cubelet, 1);
    }
    this.layer.rotation.set(0, 0, 0);
  }

  private animateLayer(axis: Axis, endRad: number, msPerPi: number) {
    const startRad = this.layer.rotation[axis];
    const duration = Math.abs(endRad - startRad) * (msPerPi / Math.PI);
    return this.tweens.run(startRad, endRad, duration, (rad) => {
      this.layer.rotation[axis] = rad;
    });
  }

  /** Abort any drag: a partially turned layer snaps back to where it started. */
  private clearDrag() {
    if (this.activePointerId !== null) {
      const canvas = this.renderer.domElement;
      if (canvas.hasPointerCapture(this.activePointerId)) {
        canvas.releasePointerCapture(this.activePointerId);
      }
    }
    if (this.layer.children.length) {
      this.layer.rotation.set(0, 0, 0);
      this.ungroupLayer();
    }
    if (this.target) setOpacity(this.target.cubelet, 1);
    this.activePointerId = null;
    this.target = null;
    this.lockRotationDirection = false;
    this.layerRotationAxis = null;
    this.layerRotationAxisToward = 1;
    this.initMoveToward = 0;
    this.controls.enabled = true;
  }

  private updatePointer(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(e.clientX - rect.left, e.clientY - rect.top);
    this.ndc.set((this.pointer.x / rect.width) * 2 - 1, -(this.pointer.y / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.ndc, this.camera);
  }

  /** Walk up from a hit mesh (possibly a sticker) to its top-level cubelet. */
  private cubeletOf(object: THREE.Object3D): THREE.Object3D | null {
    let obj: THREE.Object3D | null = object;
    while (obj && obj.parent !== this.model.group && obj.parent !== this.layer) obj = obj.parent;
    return obj;
  }

  private onPointerDown = (e: PointerEvent) => {
    if (!e.isPrimary || this.activePointerId !== null) return;
    this.updatePointer(e);
    const hits = this.raycaster.intersectObjects(this.model.cubelets, true);

    // Don't orbit when grabbing the cube, or while a turn is animating.
    if (hits.length || this.raycaster.intersectObjects(this.layer.children, true).length) {
      this.controls.enabled = false;
    }
    if (!this.draggable) return;

    const hit = hits[0];
    const cubelet = hit && this.cubeletOf(hit.object);
    if (!hit || !cubelet) return;

    this.activePointerId = e.pointerId;
    this.renderer.domElement.setPointerCapture(e.pointerId);
    this.renderer.domElement.style.cursor = "grabbing";
    this.pointerDown.copy(this.pointer);
    this.target = { cubelet, point: hit.point.clone() };
    if (this.options.highlightActiveLayer !== false) setOpacity(cubelet, 0.5);
  };

  private onPointerLeave = () => {
    if (this.activePointerId === null) this.renderer.domElement.style.cursor = "grab";
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!e.isPrimary) return;
    this.updatePointer(e);

    if (this.activePointerId === null) {
      if (e.pointerType === "mouse") {
        const over = this.raycaster.intersectObjects(this.model.cubelets, true).length > 0;
        this.renderer.domElement.style.cursor = over ? "pointer" : "grab";
      }
      return;
    }
    if (e.pointerId !== this.activePointerId || !this.target || !this.draggable) return;

    if (!this.lockRotationDirection) {
      this.lockDragAxis();
      if (!this.lockRotationDirection) return;
    }

    const axis = this.layerRotationAxis;
    if (!axis) return;
    let distance = this.pointer[this.mouseMoveAxis] - this.pointerDown[this.mouseMoveAxis];

    // On the top/bottom faces, measure movement in a frame rotated by the camera's
    // horizontal angle so dragging "along" the face feels natural from any view.
    if (Math.abs(this.targetFaceDirection.y) > 0.9) {
      const yAxisDirection = Math.sign(this.targetFaceDirection.y) * -1;
      const rad = horizontalRotationAngle(this.camera.position);
      const current = this.pointer.clone().rotateAround(this.viewCenter, rad * yAxisDirection);
      const down = this.pointerDown.clone().rotateAround(this.viewCenter, rad * yAxisDirection);
      distance = current[this.mouseMoveAxis] - down[this.mouseMoveAxis];
    }

    if (!this.initMoveToward) this.initMoveToward = Math.sign(distance);
    if (this.layer.children.length) {
      this.layer.rotation[axis] =
        (distance - MIN_MOVE_DISTANCE * this.initMoveToward) *
        ROTATION_RAD_PER_PX *
        this.layerRotationAxisToward;
    }
  };

  /** Once the pointer has moved far enough, decide which layer/axis the drag turns. */
  private lockDragAxis() {
    const target = this.target!;
    if (this.pointerDown.distanceTo(this.pointer) < MIN_MOVE_DISTANCE) return;
    this.lockRotationDirection = true;

    const direction = new THREE.Vector2().subVectors(this.pointer, this.pointerDown).normalize();
    let moveAxis: "x" | "y" = Math.abs(direction.x) > Math.abs(direction.y) ? "x" : "y";

    // Use the hit point's direction from the centre rather than the face normal:
    // the rounded corners of a cubelet can face the "wrong" way.
    const fromCenter = target.point.clone().normalize();
    const closestAxis = getClosestAxis(fromCenter);
    const face = this.targetFaceDirection.set(0, 0, 0);
    face[closestAxis] = Math.sign(fromCenter[closestAxis]);

    let axis: Axis;
    let toward: 1 | -1 = 1;
    if (face.y > 0.9) {
      // Top face
      direction.rotateAround(new THREE.Vector2(), -horizontalRotationAngle(this.camera.position));
      moveAxis = Math.abs(direction.x) > Math.abs(direction.y) ? "x" : "y";
      if (moveAxis === "y") axis = "x";
      else {
        axis = "z";
        toward = -1;
      }
    } else if (face.y < -0.9) {
      // Down face
      direction.rotateAround(new THREE.Vector2(), horizontalRotationAngle(this.camera.position));
      moveAxis = Math.abs(direction.x) > Math.abs(direction.y) ? "x" : "y";
      axis = moveAxis === "y" ? "x" : "z";
    } else if (face.x < -0.9) {
      // Left face
      axis = moveAxis === "y" ? "z" : "y";
    } else if (face.x > 0.9) {
      // Right face
      if (moveAxis === "y") {
        axis = "z";
        toward = -1;
      } else axis = "y";
    } else if (face.z > 0.9) {
      // Front face
      axis = moveAxis === "y" ? "x" : "y";
    } else {
      // Back face
      if (moveAxis === "y") {
        axis = "x";
        toward = -1;
      } else axis = "y";
    }

    this.mouseMoveAxis = moveAxis;
    this.layerRotationAxis = axis;
    this.layerRotationAxisToward = toward;
    this.groupLayer(
      axis,
      Math.round(target.cubelet.position[axis]),
      this.options.highlightActiveLayer !== false
    );
  }

  private onPointerUp = async (e: PointerEvent) => {
    if (e.pointerId !== this.activePointerId) {
      if (this.activePointerId === null) this.controls.enabled = true;
      return;
    }
    const canvas = this.renderer.domElement;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    canvas.style.cursor = "grab";

    const axis = this.layerRotationAxis;
    const target = this.target;
    if (!axis || !target || !this.draggable) {
      // A click without a drag.
      this.clearDrag();
      return;
    }

    // Snap to a whole number of quarter turns; >40° past a quarter commits to the next.
    const rotation = this.layer.rotation[axis];
    const deg = Math.abs(THREE.MathUtils.radToDeg(rotation));
    const sign = Math.sign(rotation) || 1;
    const quarters = Math.floor(deg / 90) + (deg % 90 > 40 ? 1 : 0);
    const endRad = (Math.PI / 2) * quarters * sign;

    const notation = getNotation(axis, Math.round(target.cubelet.position[axis]), quarters * sign);
    if (notation) this.currentState = applyMoves(this.currentState, notation);

    const generation = this.generation;
    this.draggable = false;
    this.pendingTurn = this.animateLayer(axis, endRad, MS_PER_PI);
    await this.pendingTurn;
    this.pendingTurn = null;
    if (generation !== this.generation) return;
    this.ungroupLayer();
    this.draggable = true;
    this.clearDrag();
    if (notation) this.emit("user", notation);
  };
}
