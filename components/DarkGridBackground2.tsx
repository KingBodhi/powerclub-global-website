import React, { useState, useEffect, useRef, PropsWithChildren } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface AnimationPoint {
  x: number;
  y: number;
  duration: number;
}

const DarkGridBackground: React.FC<PropsWithChildren> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: window.innerWidth * 0.1,
    y: window.innerHeight * 0.9,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const animationFrameRef = useRef<number>(0);
  const lastInteractionTime = useRef<number>(0);
  const currentPathIndex = useRef<number>(0);
  const animationPath = useRef<AnimationPoint[]>([]);

  const gridSize = 60;
  const cols = Math.ceil(window.innerWidth / gridSize);
  const rows = Math.ceil(window.innerHeight / gridSize);

  const generateRandomPoint = () => {
    // Generate points along the edges of the screen
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y;

    switch (edge) {
      case 0: // top
        x = Math.random() * window.innerWidth;
        y = 0;
        break;
      case 1: // right
        x = window.innerWidth;
        y = Math.random() * window.innerHeight;
        break;
      case 2: // bottom
        x = Math.random() * window.innerWidth;
        y = window.innerHeight;
        break;
      default: // left
        x = 0;
        y = Math.random() * window.innerHeight;
    }

    return { x, y };
  };

  const generateNewPath = () => {
    const start = generateRandomPoint();
    const end = generateRandomPoint();
    const centerOffset = {
      x: (Math.random() - 0.5) * 200, // Random offset from center
      y: (Math.random() - 0.5) * 200,
    };

    // Create a path through center with random durations
    return [
      {
        x: start.x,
        y: start.y,
        duration: 1000 + Math.random() * 1000,
      },
      {
        x: window.innerWidth / 2 + centerOffset.x,
        y: window.innerHeight / 2 + centerOffset.y,
        duration: 1000 + Math.random() * 1000,
      },
      {
        x: end.x,
        y: end.y,
        duration: 1000 + Math.random() * 1000,
      },
    ];
  };

  const animate = (timestamp: number) => {
    if (!animationPath.current.length) {
      animationPath.current = generateNewPath();
      currentPathIndex.current = 0;
    }

    const currentPoint = animationPath.current[currentPathIndex.current];
    const nextPoint = animationPath.current[currentPathIndex.current + 1];

    if (!currentPoint || !nextPoint) {
      animationPath.current = generateNewPath();
      currentPathIndex.current = 0;
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const progress =
      (timestamp - lastInteractionTime.current) / currentPoint.duration;

    if (progress >= 1) {
      lastInteractionTime.current = timestamp;
      currentPathIndex.current++;

      if (currentPathIndex.current >= animationPath.current.length - 1) {
        animationPath.current = generateNewPath();
        currentPathIndex.current = 0;
      }
    } else {
      const newX = currentPoint.x + (nextPoint.x - currentPoint.x) * progress;
      const newY = currentPoint.y + (nextPoint.y - currentPoint.y) * progress;
      setMousePosition({ x: newX, y: newY });
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Start initial animation
    lastInteractionTime.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsUserInteracting(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Clear any existing timeout
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsUserInteracting(false);
    lastInteractionTime.current = performance.now();
    animationPath.current = generateNewPath();
    currentPathIndex.current = 0;
    animationFrameRef.current = requestAnimationFrame(animate);
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
    <div
      className="relative min-h-screen w-full bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(243,178,12,0.00)] via-[rgba(243,178,12,0.03)_82.5%] to-[rgba(243,178,12,0.03)] mix-blend-plus-lighter" />

      {/* Interactive Grid Pattern */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          className="[mask-image:radial-gradient(circle_at_center,white,transparent)]"
        >
          {/* <defs>
            <radialGradient id="hoverGradient">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
            </radialGradient>
          </defs> */}

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
            "radial-gradient(circle at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 50%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>
  );
};

export default DarkGridBackground;
