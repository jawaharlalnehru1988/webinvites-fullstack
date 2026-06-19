import { useRef, useEffect, useState } from "react";

interface ScratchCardProps {
  children: React.ReactNode;
  width: number;
  height: number;
  coverColor?: string;
  brushSize?: number;
  onComplete?: () => void;
}

export function CustomScratchCard({
  children,
  width,
  height,
  coverColor = "#bc9268",
  brushSize = 40,
  onComplete,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCleared, setIsCleared] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill the cover
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, width, height);

    // Add instructions text on the cover
    ctx.font = "20px 'EB Garamond', serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch Here!", width / 2, height / 2);

    const getPointerPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true;
      handleMove(e);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || isCleared) return;
      e.preventDefault(); // Prevent scrolling while scratching
      const pos = getPointerPos(e);
      
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      checkIfCleared();
    };

    const handleEnd = () => {
      isDrawing.current = false;
    };

    const checkIfCleared = () => {
      const imageData = ctx.getImageData(0, 0, width, height);
      let transparentPixels = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 128) {
          transparentPixels++;
        }
      }
      const totalPixels = width * height;
      if (transparentPixels / totalPixels > 0.5) { // 50% scratched
        setIsCleared(true);
        if (onComplete) {
          onComplete();
        }
        canvas.style.transition = "opacity 0.5s ease-out";
        canvas.style.opacity = "0";
        setTimeout(() => {
          canvas.style.display = "none";
        }, 500);
      }
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [width, height, coverColor, brushSize, isCleared, onComplete]);

  return (
    <div style={{ position: "relative", width, height, userSelect: "none" }}>
      {children}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          cursor: "pointer",
          borderRadius: "19px", // match card border radius
        }}
      />
    </div>
  );
}
