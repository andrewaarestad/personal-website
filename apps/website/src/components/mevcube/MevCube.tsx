"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CubeScene, CubeStateChangeSource } from "./lib/cube-scene";

export interface MevCubeHandle {
  /** Animate a random scramble (instant when the user prefers reduced motion). */
  scramble: () => Promise<void>;
  /** Jump back to the solved cube. */
  reset: () => void;
  /** Current 54-char facelet state, or null before the scene has loaded. */
  getState: () => string | null;
}

export interface MevCubeProps {
  /**
   * Starting position as a 54-char facelet string in URFDLB order
   * (e.g. "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB" = solved).
   * Read on mount only. Invalid strings fall back to solved.
   */
  initialState?: string;
  /** Classes for the outer wrapper. Give it a height (default: aspect-square, max 480px). */
  className?: string;
  /** Called whenever the cube state changes (user turn, scramble step, reset). */
  onStateChange?: (state: string, source: CubeStateChangeSource) => void;
  /** Imperative access to scramble/reset. */
  ref?: Ref<MevCubeHandle>;
}

type LoadStatus = "loading" | "ready" | "error";

/**
 * MevCube - interactive 3D Rubik's cube (three.js)
 *
 * Features:
 * - Drag a face to turn that layer; drag the background to orbit
 * - Mouse and touch (pointer events)
 * - Scramble (animated random moves) and Reset overlay buttons
 * - Transparent canvas: sits on whatever surface it is placed in, light or dark
 * - three.js is code-split and only loaded in the browser
 *
 * @example
 * ```tsx
 * <DataVisualizationSection title="Try it">
 *   <MevCube className="h-[420px]" />
 * </DataVisualizationSection>
 * ```
 */
export function MevCube({ initialState, className, onStateChange, ref }: MevCubeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CubeScene | null>(null);
  const onStateChangeRef = useRef(onStateChange);
  const initialStateRef = useRef(initialState);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [scrambling, setScrambling] = useState(false);

  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let scene: CubeScene | null = null;

    // Dynamic import keeps three.js out of the server bundle and the initial JS.
    import("./lib/cube-scene")
      .then(({ CubeScene }) => {
        if (cancelled) return;
        try {
          scene = new CubeScene(container, {
            initialState: initialStateRef.current,
            onStateChange: (state, source) => onStateChangeRef.current?.(state, source),
          });
          sceneRef.current = scene;
          setStatus("ready");
        } catch (error) {
          console.error("[MevCube] Failed to start WebGL scene", error);
          setStatus("error");
        }
      })
      .catch((error: unknown) => {
        console.error("[MevCube] Failed to load cube scene", error);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const scramble = useCallback(async () => {
    const scene = sceneRef.current;
    if (!scene || scene.isScrambling) return;
    setScrambling(true);
    try {
      await scene.scramble();
    } finally {
      setScrambling(false);
    }
  }, []);

  const reset = useCallback(() => {
    sceneRef.current?.reset();
    setScrambling(false);
  }, []);

  useImperativeHandle(
    ref,
    () => ({ scramble, reset, getState: () => sceneRef.current?.state ?? null }),
    [scramble, reset]
  );

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-h-[480px]", className)}>
      {/* Soft halo so white stickers still read against a white surface in light mode. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_closest-side,hsl(var(--muted)),transparent)]"
      />
      <div
        ref={containerRef}
        className="absolute inset-0 select-none"
        role="img"
        aria-label="Interactive 3D Rubik's cube. Drag a face to turn a layer, drag the background to rotate the view."
      />

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-text-secondary">
          Loading cube…
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-text-secondary">
          This interactive cube needs WebGL, which isn&apos;t available in this browser.
        </div>
      )}

      {status === "ready" && (
        <div className="absolute bottom-3 right-3 flex gap-2">
          <Button size="sm" variant="outline" onClick={scramble} disabled={scrambling}>
            {scrambling ? "Scrambling…" : "Scramble"}
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
