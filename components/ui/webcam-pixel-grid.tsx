"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type WebcamPixelGridProps = {
  /** Number of columns in the grid */
  gridCols?: number;
  /** Number of rows in the grid */
  gridRows?: number;
  /** Maximum elevation for motion detection */
  maxElevation?: number;
  /** Motion sensitivity (0-1) */
  motionSensitivity?: number;
  /** Smoothing factor for elevation transitions */
  elevationSmoothing?: number;
  /** Color mode: 'webcam' uses actual colors, 'monochrome' uses single color */
  colorMode?: "webcam" | "monochrome";
  /** Base color when in monochrome mode */
  monochromeColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Whether to mirror the webcam feed */
  mirror?: boolean;
  /** Gap between cells (0-1, fraction of cell size) */
  gapRatio?: number;
  /** Invert the colors */
  invertColors?: boolean;
  /** Darken factor (0-1, 0 = no darkening, 1 = fully dark) */
  darken?: number;
  /** Border color for cells */
  borderColor?: string;
  /** Border opacity (0-1) */
  borderOpacity?: number;
  /** Additional class name */
  className?: string;
  /** Callback when webcam access is denied */
  onWebcamError?: (error: Error) => void;
  /** Callback when webcam is ready */
  onWebcamReady?: () => void;
  /** Optional pre-approved stream to avoid double permission prompts */
  initialStream?: MediaStream | null;
};

type PixelData = {
  r: number;
  g: number;
  b: number;
  motion: number;
  targetElevation: number;
  currentElevation: number;
};

const createPixel = (): PixelData => ({
  r: 30,
  g: 30,
  b: 30,
  motion: 0,
  targetElevation: 0,
  currentElevation: 0,
});

export const WebcamPixelGrid: React.FC<WebcamPixelGridProps> = ({
  gridCols = 64,
  gridRows = 48,
  maxElevation = 15,
  motionSensitivity = 0.4,
  elevationSmoothing = 0.1,
  colorMode = "webcam",
  monochromeColor = "#00ff88",
  backgroundColor = "#0a0a0a",
  mirror = true,
  gapRatio = 0.1,
  invertColors = false,
  darken = 0,
  borderColor = "#ffffff",
  borderOpacity = 0.08,
  className,
  onWebcamError,
  onWebcamReady,
  initialStream = null,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const processingCanvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const previousFrameRef = useRef<Uint8ClampedArray | null>(null);
  const pixelDataRef = useRef<PixelData[][]>([]);
  const animationRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);

  // Parse monochrome color
  const monoRGB = React.useMemo(() => {
    const hex = monochromeColor.replace("#", "");
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }, [monochromeColor]);

  // Parse border color
  const borderRGB = React.useMemo(() => {
    const hex = borderColor.replace("#", "");
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }, [borderColor]);

  // Initialize pixel data
  useEffect(() => {
    pixelDataRef.current = Array.from({ length: gridRows }, () =>
      Array.from({ length: gridCols }, createPixel)
    );
  }, [gridCols, gridRows]);

  const streamRef = useRef<MediaStream | null>(null);
  const ownsStreamRef = useRef(false);
  const activeGridSizeRef = useRef<{ cols: number; rows: number }>({
    cols: gridCols,
    rows: gridRows,
  });

  // Request camera access
  const requestCameraAccess = useCallback(async () => {
    try {
      const hasUsableExternalStream =
        Boolean(initialStream) &&
        (initialStream?.active ?? false) &&
        (initialStream?.getVideoTracks().some((track) => track.readyState === "live") ?? false);

      const stream = hasUsableExternalStream
        ? (initialStream as MediaStream)
        : await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: "user",
            },
          });

      streamRef.current = stream;
      ownsStreamRef.current = !hasUsableExternalStream;

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
          await new Promise<void>((resolve) => {
            const onLoadedMetadata = () => {
              video.removeEventListener("loadedmetadata", onLoadedMetadata);
              resolve();
            };
            video.addEventListener("loadedmetadata", onLoadedMetadata);
            window.setTimeout(() => {
              video.removeEventListener("loadedmetadata", onLoadedMetadata);
              resolve();
            }, 800);
          });
        }

        // Some browsers can transiently reject play() even when permission is granted.
        // Keep going and let the render loop use frames once they become available.
        try {
          await video.play();
        } catch (playError) {
          console.warn("Webcam video play() was blocked, retrying in loop:", playError);
          window.setTimeout(() => {
            video.play().catch(() => undefined);
          }, 120);
        }

        setIsReady(true);
        onWebcamReady?.();
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Webcam access denied");
      onWebcamError?.(error);
    }
  }, [initialStream, onWebcamError, onWebcamReady]);

  // Initialize webcam on mount
  useEffect(() => {
    requestCameraAccess();

    return () => {
      if (ownsStreamRef.current && streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [requestCameraAccess]);

  // Main render loop
  const render = useCallback(function renderFrame() {
    const video = videoRef.current;
    const processingCanvas = processingCanvasRef.current;
    const displayCanvas = displayCanvasRef.current;

    if (!video || !processingCanvas || !displayCanvas || video.readyState < 2) {
      animationRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    const procCtx = processingCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    const dispCtx = displayCanvas.getContext("2d");

    if (!procCtx || !dispCtx) {
      animationRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    // Adapt processing grid to camera aspect to avoid mobile zoom/crop from fixed ratios.
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const fallbackAspect = gridCols / gridRows;
    const sourceAspect = videoWidth > 0 && videoHeight > 0 ? videoWidth / videoHeight : fallbackAspect;

    const targetCellCount = Math.max(1, gridCols * gridRows);
    const adaptedCols = Math.max(1, Math.round(Math.sqrt(targetCellCount * sourceAspect)));
    const adaptedRows = Math.max(1, Math.round(targetCellCount / adaptedCols));
    const hasGridSizeChanged =
      activeGridSizeRef.current.cols !== adaptedCols || activeGridSizeRef.current.rows !== adaptedRows;

    if (hasGridSizeChanged) {
      activeGridSizeRef.current = { cols: adaptedCols, rows: adaptedRows };
      previousFrameRef.current = null;
      pixelDataRef.current = Array.from({ length: adaptedRows }, () =>
        Array.from({ length: adaptedCols }, createPixel)
      );
    }

    const activeCols = activeGridSizeRef.current.cols;
    const activeRows = activeGridSizeRef.current.rows;

    // Set processing canvas size to active grid dimensions
    processingCanvas.width = activeCols;
    processingCanvas.height = activeRows;

    // Draw video to processing canvas using an aspect-preserving crop.
    const targetAspect = activeCols / activeRows;

    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = videoWidth || activeCols;
    let sourceHeight = videoHeight || activeRows;

    if (sourceAspect > targetAspect) {
      sourceWidth = sourceHeight * targetAspect;
      sourceX = (videoWidth - sourceWidth) / 2;
    } else if (sourceAspect < targetAspect) {
      sourceHeight = sourceWidth / targetAspect;
      sourceY = (videoHeight - sourceHeight) / 2;
    }

    procCtx.save();
    if (mirror) {
      procCtx.translate(activeCols, 0);
      procCtx.scale(-1, 1);
    }
    procCtx.drawImage(
      video,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      activeCols,
      activeRows
    );
    procCtx.restore();

    // Get pixel data
    const imageData = procCtx.getImageData(0, 0, activeCols, activeRows);
    const currentData = imageData.data;
    const previousData = previousFrameRef.current;

    // Update pixel data with motion detection
    const nextPixels = pixelDataRef.current.map((row) =>
      row.map((pixel) => ({ ...pixel }))
    );
    for (let row = 0; row < activeRows; row++) {
      for (let col = 0; col < activeCols; col++) {
        const idx = (row * activeCols + col) * 4;
        const r = currentData[idx];
        const g = currentData[idx + 1];
        const b = currentData[idx + 2];

        const pixel = nextPixels[row]?.[col];
        if (!pixel) continue;

        // Calculate motion
        let motion = 0;
        if (previousData) {
          const prevR = previousData[idx];
          const prevG = previousData[idx + 1];
          const prevB = previousData[idx + 2];
          const diff =
            Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);
          motion = Math.min(1, diff / 255 / motionSensitivity);
        }

        // Smooth motion
        pixel.motion = pixel.motion * 0.7 + motion * 0.3;

        // Set colors
        let finalR = r;
        let finalG = g;
        let finalB = b;

        if (colorMode === "monochrome") {
          const brightness = (r + g + b) / 3 / 255;
          finalR = Math.round(monoRGB.r * brightness);
          finalG = Math.round(monoRGB.g * brightness);
          finalB = Math.round(monoRGB.b * brightness);
        }

        // Apply invert
        if (invertColors) {
          finalR = 255 - finalR;
          finalG = 255 - finalG;
          finalB = 255 - finalB;
        }

        // Apply darken
        if (darken > 0) {
          const darkenFactor = 1 - darken;
          finalR = Math.round(finalR * darkenFactor);
          finalG = Math.round(finalG * darkenFactor);
          finalB = Math.round(finalB * darkenFactor);
        }

        pixel.r = finalR;
        pixel.g = finalG;
        pixel.b = finalB;

        // Set target elevation
        pixel.targetElevation = pixel.motion * maxElevation;

        // Smooth elevation transition
        pixel.currentElevation +=
          (pixel.targetElevation - pixel.currentElevation) * elevationSmoothing;
      }
    }

    pixelDataRef.current = nextPixels;

    // Store current frame for next comparison
    previousFrameRef.current = new Uint8ClampedArray(currentData);

    // Render to display canvas
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = displayCanvas.clientWidth;
    const displayHeight = displayCanvas.clientHeight;

    displayCanvas.width = displayWidth * dpr;
    displayCanvas.height = displayHeight * dpr;
    dispCtx.scale(dpr, dpr);

    // Clear canvas
    dispCtx.fillStyle = backgroundColor;
    dispCtx.fillRect(0, 0, displayWidth, displayHeight);

    // Calculate cell size (always square, cover entire container like object-fit: cover)
    const cellSize = Math.max(displayWidth / activeCols, displayHeight / activeRows);
    const gap = cellSize * gapRatio;

    // Calculate offset to center the grid (negative offset for overflow, creating cover effect)
    const gridWidth = cellSize * activeCols;
    const gridHeight = cellSize * activeRows;
    const offsetXGrid = (displayWidth - gridWidth) / 2;
    const offsetYGrid = (displayHeight - gridHeight) / 2;

    // Draw cells with 3D effect
    for (let row = 0; row < activeRows; row++) {
      for (let col = 0; col < activeCols; col++) {
        const pixel = nextPixels[row]?.[col];
        if (!pixel) continue;

        const x = offsetXGrid + col * cellSize;
        const y = offsetYGrid + row * cellSize;
        const elevation = pixel.currentElevation;

        // Calculate 3D offset (isometric-like projection) - MUCH larger effect
        const offsetX = -elevation * 1.2;
        const offsetY = -elevation * 1.8;

        // Draw shadow - larger and more visible
        if (elevation > 0.5) {
          dispCtx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.6, elevation * 0.04)})`;
          dispCtx.fillRect(
            x + gap / 2 + elevation * 1.5,
            y + gap / 2 + elevation * 2.0,
            cellSize - gap,
            cellSize - gap
          );
        }

        // Draw side faces for 3D effect - thicker sides
        if (elevation > 0.5) {
          // Right side
          dispCtx.fillStyle = `rgb(${Math.max(0, pixel.r - 80)}, ${Math.max(0, pixel.g - 80)}, ${Math.max(0, pixel.b - 80)})`;
          dispCtx.beginPath();
          dispCtx.moveTo(x + cellSize - gap / 2 + offsetX, y + gap / 2 + offsetY);
          dispCtx.lineTo(x + cellSize - gap / 2, y + gap / 2);
          dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
          dispCtx.lineTo(x + cellSize - gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
          dispCtx.closePath();
          dispCtx.fill();

          // Bottom side
          dispCtx.fillStyle = `rgb(${Math.max(0, pixel.r - 50)}, ${Math.max(0, pixel.g - 50)}, ${Math.max(0, pixel.b - 50)})`;
          dispCtx.beginPath();
          dispCtx.moveTo(x + gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
          dispCtx.lineTo(x + gap / 2, y + cellSize - gap / 2);
          dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
          dispCtx.lineTo(x + cellSize - gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
          dispCtx.closePath();
          dispCtx.fill();
        }

        // Draw top face (main cell) - brighter when elevated
        const brightness = 1 + elevation * 0.05;
        dispCtx.fillStyle = `rgb(${Math.min(255, Math.round(pixel.r * brightness))}, ${Math.min(255, Math.round(pixel.g * brightness))}, ${Math.min(255, Math.round(pixel.b * brightness))})`;
        dispCtx.fillRect(
          x + gap / 2 + offsetX,
          y + gap / 2 + offsetY,
          cellSize - gap,
          cellSize - gap
        );

        // Draw light border around top face
        dispCtx.strokeStyle = `rgba(${borderRGB.r}, ${borderRGB.g}, ${borderRGB.b}, ${borderOpacity + elevation * 0.008})`;
        dispCtx.lineWidth = 0.5;
        dispCtx.strokeRect(
          x + gap / 2 + offsetX,
          y + gap / 2 + offsetY,
          cellSize - gap,
          cellSize - gap
        );
      }
    }

    animationRef.current = requestAnimationFrame(renderFrame);
  }, [
    gridCols,
    gridRows,
    mirror,
    motionSensitivity,
    colorMode,
    monoRGB,
    maxElevation,
    elevationSmoothing,
    backgroundColor,
    gapRatio,
    invertColors,
    darken,
    borderRGB,
    borderOpacity,
  ]);

  // Start render loop when ready
  useEffect(() => {
    if (!isReady) return;

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isReady, render]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Hidden video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        playsInline
        muted
        autoPlay
      />

      {/* Hidden processing canvas */}
      <canvas
        ref={processingCanvasRef}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />

      {/* Display canvas with fade-in */}
      <canvas
        ref={displayCanvasRef}
        className={cn(
          "w-full h-full transition-opacity duration-1000",
          isReady ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundColor }}
      />



    </div>
  );
};
