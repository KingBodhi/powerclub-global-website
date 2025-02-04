"use client";
import React, { useState, PropsWithChildren } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const DarkGridBackground: React.FC<PropsWithChildren> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const gridSize = 60;
  const cols = Math.ceil(window.innerWidth / gridSize);
  const rows = Math.ceil(window.innerHeight / gridSize);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Content Container - Moved up in DOM order */}
      <div className="relative pointer-events-none">
        {/* This wrapper makes the content clickable again */}
        <div className="pointer-events-auto">{children}</div>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(243,178,12,0.00)] via-[rgba(243,178,12,0.03)_82.5%] to-[rgba(243,178,12,0.03)] mix-blend-plus-lighter" />

      {/* Interactive Grid Pattern */}
      <div className="absolute inset-0" onMouseMove={handleMouseMove}>
        <svg
          width="100%"
          height="100%"
          className="[mask-image:radial-gradient(circle_at_center,white,transparent)]"
        >
          <defs>
            <radialGradient id="hoverGradient">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
            </radialGradient>
          </defs>

          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              const x = col * gridSize;
              const y = row * gridSize;
              const distance = calculateDistance(
                x + gridSize / 2,
                y + gridSize / 2,
                mousePosition.x,
                mousePosition.y
              );
              const opacity = Math.max(0, 1 - distance / 150);

              return (
                <rect
                  key={`${row}-${col}`}
                  x={x}
                  y={y}
                  width={gridSize - 2}
                  height={gridSize - 2}
                  fill="transparent"
                  stroke="rgba(255, 215, 0, 0.1)"
                  strokeWidth="1"
                  className="transition-all duration-200"
                  style={{
                    fill: `rgba(255, 215, 0, ${opacity * 0.25})`,
                  }}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 50%)",
        }}
      />

      {/* Golden Blob */}
      {/* <div
        className="absolute top-20 left-20 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,215,0,0.15), transparent 70%)",
          filter: "blur(40px)",
        }}
      /> */}
    </div>
  );
};

export default DarkGridBackground;
