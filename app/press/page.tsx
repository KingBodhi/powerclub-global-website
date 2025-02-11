"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

interface PressReleaseCardProps {
  date: string;
  title: string;
  description: string;
  readingTime: string;
  image: string;
}

const PressReleaseCard: React.FC<PressReleaseCardProps> = ({
  date,
  title,
  description,
  readingTime,
  image,
}) => (
  <div className="group relative h-[450px] perspective-1000">
    <div className="preserve-3d transition-transform duration-500 ease-out group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]">
      <div className="absolute inset-0 rounded-md bg-black/30 blur-xl transform translate-y-4 scale-95 transition-all duration-500 group-hover:translate-y-8 group-hover:scale-90" />
      <div className="absolute inset-0 rounded-md backdrop-blur-sm bg-[#ae904c]/5 border border-[#ae904c]/20 transform transition-all duration-500" />
      <div
        className="relative h-[450px] rounded-md backdrop-blur-sm bg-gradient-to-b from-[#ae904c]/5 to-[#ae904c]/0 
        border border-[#ae904c]/20 group-hover:border-[#ae904c]/40
        transition-all duration-500 ease-out transform
        group-hover:-translate-y-2 group-hover:-translate-x-2"
      >
        <div className="h-48 w-full rounded-t-md overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>

        <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ae904c]/20 via-transparent to-[#ae904c]/20 animate-gradient-shift" />
          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-[#ae904c]/30 via-[#ae904c]/10 to-[#ae904c]/30 blur-sm group-hover:animate-pulse" />
        </div>

        <div className="relative z-10 p-6 w-full h-[calc(100%-12rem)] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#ae904c]/80 text-sm font-medium">
              {date}
            </span>
            <span className="text-white/40 text-sm">{readingTime}</span>
          </div>

          <h3 className="text-lg font-semibold mb-3 text-[#ae904c] group-hover:text-[#ae904c]/90 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          <p className="text-white/60 mb-4 flex-grow text-sm line-clamp-3">
            {description}
          </p>

          <button
            className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 
            group-hover:translate-x-1 mt-auto relative
            before:absolute before:-inset-4 before:rounded-lg before:bg-[#ae904c]/5 before:opacity-0 
            before:group-hover:opacity-100 before:transition-opacity before:duration-300"
          >
            Read More <ArrowUpRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function PressPage() {
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

  const pressReleases = [
    {
      date: "February 1, 2024",
      title: "Company Launches Revolutionary New Platform",
      description:
        "Announcing the launch of our groundbreaking platform that transforms how businesses interact with their customers.",
      readingTime: "3 min read",
      image: "/press-release/press-release-1.jpg",
    },
    {
      date: "January 15, 2024",
      title: "Strategic Partnership Announcement",
      description:
        "Exciting new partnership set to revolutionize industry standards and create innovative solutions for clients.",
      readingTime: "4 min read",
      image: "/press-release/press-release-2.jpg",
    },
    {
      date: "January 5, 2024",
      title: "Award-Winning Innovation Recognition",
      description:
        "Our team's dedication to excellence recognized with prestigious industry award for technological innovation.",
      readingTime: "2 min read",
      image: "/press-release/press-release-4.jpg",
    },
    {
      date: "December 20, 2023",
      title: "Expansion into New Markets",
      description:
        "Strategic expansion plans unveiled as company moves to establish presence in key international markets.",
      readingTime: "5 min read",
      image: "/press-release/press-release-3.jpg",
    },
    {
      date: "December 10, 2023",
      title: "Year in Review: 2023 Achievements",
      description:
        "Reflecting on a year of unprecedented growth, innovation, and success in transforming the industry landscape.",
      readingTime: "6 min read",
      image: "/press-release/press-release-5.jpg",
    },
    {
      date: "December 1, 2023",
      title: "New Technology Integration Partnership",
      description:
        "Partnering with leading tech firms to enhance our service offerings and deliver cutting-edge solutions.",
      readingTime: "4 min read",
      image: "/press-release/press-release-6.jpg",
    },
    {
      date: "November 15, 2023",
      title: "Sustainability Initiative Launch",
      description:
        "Introducing our comprehensive sustainability program aimed at reducing environmental impact across operations.",
      readingTime: "3 min read",
      image: "/press-release/press-release-7.jpg",
    },
    {
      date: "November 1, 2023",
      title: "Q3 2023 Financial Results",
      description:
        "Announcing strong financial performance and continued growth in key market segments during Q3 2023.",
      readingTime: "5 min read",
      image: "/press-release/press-release-8.jpg",
    },
  ];

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="animate-pulse pt-32 px-4">
          <div className="max-w-6xl mx-auto">
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
                Latest Updates
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6">
                <span className="whitespace-normal lg:whitespace-nowrap">
                  Stay Updated with Our
                </span>
                <br />
                <span className="font-bold text-[#ae904c] whitespace-normal lg:whitespace-nowrap">
                  Latest News
                </span>
                <br />
                and Announcements
              </h1>
              <p className="text-white/60 max-w-2xl text-lg">
                Discover our latest press releases, company updates, and
                industry insights
              </p>
            </div>
          </div>

          {/* Press Releases Grid */}
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
              {pressReleases.map((release, index) => (
                <PressReleaseCard key={index} {...release} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </main>
  );
}
