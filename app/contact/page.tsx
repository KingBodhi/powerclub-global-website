"use client";

import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Send,
  MessageCircle,
  ArrowRight,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  info: string;
  primary?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  info,
  primary = false,
}) => (
  <div
    className={`group p-6 rounded-xl backdrop-blur-sm 
      ${
        primary
          ? "bg-[#ae904c] border-none"
          : "bg-black/20 border border-[#ae904c]/20"
      } 
      hover:scale-105 transition-all duration-300 h-full`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`p-3 rounded-lg ${
          primary ? "bg-black/20" : "bg-[#ae904c]/10"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${primary ? "text-white" : "text-[#ae904c]"}`}
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h4
          className={`font-medium mb-1 ${
            primary ? "text-white" : "text-[#ae904c]"
          }`}
        >
          {title}
        </h4>
        <p className={`${primary ? "text-white/90" : "text-white/60"}`}>
          {info}
        </p>
      </div>
    </div>
  </div>
);

const HighlightCard: React.FC = () => (
  <div className="relative h-full">
    {/* Static border frame */}
    <div className="absolute inset-0 rounded-xl border border-[#ae904c]/30" />

    {/* Card content */}
    <div
      className="relative p-8 rounded-xl bg-gradient-to-br from-[#ae904c]/20 to-black/40 
      border border-[#ae904c]/30 backdrop-blur-md transform-gpu h-full
      transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-[#ae904c]" />
          <h3 className="text-xl font-semibold text-[#ae904c]">
            Quick Response
          </h3>
        </div>
        <p className="text-white/70">
          We typically respond within 2 hours during business hours. Schedule a
          call or send us a message - we&apos;re here to help!
        </p>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ae904c] text-white
            hover:bg-[#ae904c]/90 transition-colors duration-300"
          >
            Schedule Call <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ae904c]/30
            text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function ContactPage() {
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
                Get in Touch
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6">
                <span className="whitespace-normal lg:whitespace-nowrap">
                  Let&apos;s Start Your
                </span>
                <br />
                <span className="font-bold text-[#ae904c] whitespace-normal lg:whitespace-nowrap">
                  Journey Together
                </span>
                <br />
                Today
              </h1>
              <p className="text-white/60 max-w-2xl text-lg">
                Have a project in mind? We&apos;d love to help bring your vision
                to life. Contact us and let&apos;s create something
                extraordinary.
              </p>
            </div>
          </div>

          {/* Contact Form and Info */}
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-5 grid grid-rows-2 gap-6">
                <HighlightCard />
                <div className="grid grid-rows-2 gap-6">
                  <ContactCard
                    icon={Mail}
                    title="Email Us"
                    info="contact@example.com"
                    primary
                  />
                  <ContactCard
                    icon={Phone}
                    title="Call Us"
                    info="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="lg:col-span-7">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl border border-[#ae904c]/50" />
                  <div
                    className="relative rounded-xl backdrop-blur-sm bg-black/20 border border-[#ae904c]/90 p-8
                    transform-gpu transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2"
                  >
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="p-4 rounded-lg bg-black/40 border border-[#ae904c]/50 
                            text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                            focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="p-4 rounded-lg bg-black/40 border border-[#ae904c]/50 
                            text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                            focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full p-4 rounded-lg bg-black/40 border border-[#ae904c]/50 
                          text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                          focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300"
                      />
                      <textarea
                        placeholder="Your Message"
                        rows={6}
                        className="w-full p-4 rounded-lg bg-black/40 border border-[#ae904c]/50 
                          text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                          focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300 resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-4 px-8 rounded-lg bg-[#ae904c] text-white
                          hover:bg-[#ae904c]/90 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        Send Message
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
