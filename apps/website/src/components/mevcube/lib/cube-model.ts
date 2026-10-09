import * as THREE from "three";
import { roundedEdgeBox, roundedPlane } from "./geometries";
import { stateToCubelets } from "./cube-state";
import type { Face } from "./types";

/** Sticker colours (sRGB hex), matching the original MevCube palette. */
export const FACE_HEX: Record<Face, string> = {
  U: "#FEFEFE", // white
  R: "#891214", // red
  F: "#199B4C", // green
  D: "#FED52F", // yellow
  L: "#FF5525", // orange
  B: "#0D48AC", // blue
};

/** Colour of the plastic cubelet body. */
const BODY_HEX = "#333333";

const FACE_TRANSFORMS: Record<
  Face,
  { position: [number, number, number]; rotation: [number, number, number] }
> = {
  U: { position: [0, 0.51, 0], rotation: [-Math.PI / 2, 0, 0] },
  D: { position: [0, -0.51, 0], rotation: [Math.PI / 2, 0, 0] },
  F: { position: [0, 0, 0.51], rotation: [0, 0, 0] },
  B: { position: [0, 0, -0.51], rotation: [Math.PI, 0, 0] },
  L: { position: [-0.51, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  R: { position: [0.51, 0, 0], rotation: [0, Math.PI / 2, 0] },
};

/**
 * The 27 cubelet meshes for a given state. Geometries are shared between all
 * cubelets; materials are per-mesh so a layer's opacity can be changed while dragging.
 */
export class CubeModel {
  readonly group = new THREE.Group();
  private readonly boxGeometry = roundedEdgeBox(1, 1, 1, 0.05, 4);
  private readonly stickerGeometry = roundedPlane(0, 0, 0.9, 0.9, 0.1);

  constructor(state: string) {
    for (const info of stateToCubelets(state)) {
      const body = new THREE.Mesh(
        this.boxGeometry,
        new THREE.MeshLambertMaterial({ emissive: BODY_HEX, transparent: true })
      );
      body.name = "cubelet";
      body.position.set(info.x, info.y, info.z);

      for (const [face, color] of Object.entries(info.colors) as [Face, Face][]) {
        const sticker = new THREE.Mesh(
          this.stickerGeometry,
          new THREE.MeshLambertMaterial({ emissive: FACE_HEX[color], transparent: true })
        );
        sticker.name = "face";
        sticker.rotation.fromArray(FACE_TRANSFORMS[face].rotation);
        sticker.position.fromArray(FACE_TRANSFORMS[face].position);
        body.add(sticker);
      }
      this.group.add(body);
    }
  }

  /** Top-level cubelet meshes currently attached to the model group. */
  get cubelets(): THREE.Object3D[] {
    return this.group.children;
  }

  /**
   * Dispose GPU resources. Pass every root that may currently hold cubelets
   * (they move into the layer group during a turn).
   */
  dispose(roots: THREE.Object3D[] = [this.group]) {
    for (const root of roots) {
      root.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          const material = obj.material as THREE.Material | THREE.Material[];
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
    }
    this.boxGeometry.dispose();
    this.stickerGeometry.dispose();
  }
}

/** Set opacity on a mesh and all its descendants. */
export function setOpacity(object: THREE.Object3D, opacity: number) {
  object.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const material = obj.material as THREE.Material | THREE.Material[];
      if (Array.isArray(material)) material.forEach((m) => (m.opacity = opacity));
      else material.opacity = opacity;
    }
  });
}
