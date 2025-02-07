"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import VideoSection from "@/components/AboutSection";
import Partners from "@/components/Carousel";
import ContactSection from "@/components/ContactSection";
import DarkGridBackground from "@/components/DarkGridBackground";
import DarkGridBackground2 from "@/components/DarkGridBackground2";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PressReleaseSection from "@/components/PressReleaseSection";
import ServicesSection from "@/components/ServicesSection";
import { Sparkles } from "lucide-react";
import EventSection from "@/components/EventSection";
interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const handleGetStarted = () => {
    console.log("Get Started button clicked!");
  };

  return (
    <main className="relative">
      <Navbar />
      <DarkGridBackground>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto text-center -mt-10">
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 md:w-40 md:h-40 rounded-full mx-auto mb-4"
              src="/logo-transparent.png"
              alt="Logo"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-2 md:px-4"
            >
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-xs md:text-sm mb-6 md:mb-8">
                <Sparkles className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                Welcome to the future
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight px-4"
            >
              <span className="bg-clip-text text-transparent uppercase bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80">
                Championing the Bold to Achieve the Extraordinary
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xs md:text-base lg:text-lg text-white/60 mb-8 md:mb-12 uppercase tracking-wide max-w-3xl font-light px-4"
            >
              Powerclub Global is a leading international agency specializing in
              branding, marketing, and digital innovation for early to mid-stage
              technology startups.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={handleGetStarted}
              className="px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#ae904c]/10 to-[#ae904c]/10 
              border border-[#ae904c]/30 text-[#ae904c]/90 rounded-lg 
              hover:bg-[#ae904c]/20 transition-all duration-300 
              uppercase tracking-wider text-xs md:text-sm font-light"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </DarkGridBackground>

      <FadeInSection>
        <Partners />
      </FadeInSection>

      <FadeInSection>
        <VideoSection />
      </FadeInSection>
      <DarkGridBackground2>
        <FadeInSection>
          <EventSection />
        </FadeInSection>
      </DarkGridBackground2>

      <DarkGridBackground2>
        <FadeInSection>
          <ServicesSection />
        </FadeInSection>
      </DarkGridBackground2>

      <FadeInSection>
        <PressReleaseSection />
      </FadeInSection>

      <FadeInSection>
        <ContactSection />
      </FadeInSection>

      <Footer />
    </main>
  );
}
