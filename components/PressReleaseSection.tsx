"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/notion";

interface PressReleaseCardProps {
  post: BlogPost;
}

const PressReleaseCard: React.FC<PressReleaseCardProps> = ({ post }) => (
  <Link href={`/press/${post.id}`}>
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
            {post.mediaType === "video" && post.coverVideo ? (
              <video
                src={post.coverVideo}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            ) : post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#ae904c]/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>

          <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ae904c]/20 via-transparent to-[#ae904c]/20 animate-gradient-shift" />
            <div className="absolute -inset-px rounded-md bg-gradient-to-r from-[#ae904c]/30 via-[#ae904c]/10 to-[#ae904c]/30 blur-sm group-hover:animate-pulse" />
          </div>

          <div className="relative z-10 p-6 w-full h-[calc(100%-12rem)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#ae904c]/80 text-sm font-medium">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {post.tags && post.tags.length > 0 && (
                <span className="text-white/40 text-sm">{post.tags[0]}</span>
              )}
            </div>

            <h3 className="text-lg font-semibold mb-3 text-[#ae904c] group-hover:text-[#ae904c]/90 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-white/60 mb-4 flex-grow text-sm line-clamp-3">
              {post.description}
            </p>

            <div
              className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 
              group-hover:translate-x-1 mt-auto relative
              before:absolute before:-inset-4 before:rounded-lg before:bg-[#ae904c]/5 before:opacity-0 
              before:group-hover:opacity-100 before:transition-opacity before:duration-300"
            >
              Read More <ArrowUpRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const PressReleaseSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const [time, setTime] = useState(0);
  const gridSize = 60;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.slice(0, 4)); // Get only first 4 posts
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch posts"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
      <div className="relative w-full pb-32 overflow-hidden bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-[#ae904c]/10 rounded mb-4" />
              <div className="h-4 w-64 bg-[#ae904c]/5 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full pb-32">
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
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 mb-12 md:mb-16 lg:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80">
                    Latest Updates
                  </span>
                </h2>
                <p className="text-white/60 max-w-2xl">
                  Stay updated with our latest announcements and company news
                </p>
              </div>
              <Link
                href="/press"
                className="hidden md:flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-colors duration-300"
              >
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Press Releases Grid */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[450px] rounded-md animate-pulse bg-[#ae904c]/5"
                />
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center text-[#ae904c]/80">
                No posts available
              </div>
            ) : (
              posts.map((post) => (
                <PressReleaseCard key={post.id} post={post} />
              ))
            )}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/press"
              className="inline-flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-colors duration-300"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseSection;
