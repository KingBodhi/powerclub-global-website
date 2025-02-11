"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "CTO",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "CO-Founder",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "CFO",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
];

export default function AboutPage() {
  const [time, setTime] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const gridSize = 60;

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 1000 / 30);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearInterval(interval);
    };
  }, []);

  const cols = Math.ceil(dimensions.width / gridSize) || 0;
  const rows = Math.ceil(dimensions.height / gridSize) || 0;

  const calculateOpacity = (row: number, col: number): number => {
    const waveX = Math.sin((col * 0.3 + time) * 0.5);
    const waveY = Math.cos((row * 0.3 + time) * 0.5);
    const baseOpacity = (waveX + waveY + 2) / 4;
    const pulse = Math.sin(time * 0.5) * 0.1 + 0.9;
    return Math.min(0.3, Math.max(0.1, baseOpacity * 0.2 * pulse));
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="animate-pulse pt-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="h-8 w-48 bg-[#ae904c]/10 rounded mb-4" />
            <div className="h-4 w-64 bg-[#ae904c]/5 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="relative w-full min-h-screen pb-32">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            className="[mask-image:radial-gradient(circle_at_center,white,transparent)]"
          >
            {Array.from({ length: rows }).map((_, row) =>
              Array.from({ length: cols }).map((_, col) => {
                const x = col * gridSize;
                const y = row * gridSize;
                const opacity = calculateOpacity(row, col);

                return (
                  <rect
                    key={`${row}-${col}`}
                    x={x}
                    y={y}
                    width={gridSize - 2}
                    height={gridSize - 2}
                    fill={`rgba(174, 144, 76, ${opacity * 0.15})`}
                    stroke={`rgba(174, 144, 76, ${opacity})`}
                    strokeWidth="1"
                    className="transition-all duration-500"
                  />
                );
              })
            )}
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black/80" />

        {/* Content */}
        <div className="relative z-10 pt-32">
          {/* Header */}
          <div className="container mx-auto px-4 mb-16">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-xs md:text-sm mb-6">
                <Sparkles className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                About Us
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6">
                <span className="whitespace-normal lg:whitespace-nowrap">
                  We Are Building
                </span>
                <br />
                <span className="font-bold text-[#ae904c] whitespace-normal lg:whitespace-nowrap">
                  The Future of Events
                </span>
                <br />
                Together
              </h1>
              <p className="text-white/60 max-w-2xl text-lg">
                Pioneering the next generation of roadshow and event management
                with cutting-edge technology and unparalleled expertise.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="container mx-auto px-4 mb-32">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-4 flex-wrap">
                <AnimatedTooltip items={people} />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6 text-center">
            WIP
          </h1>
        </div>
      </div>
      <Footer />
    </main>
  );
}
