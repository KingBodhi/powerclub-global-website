import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const Navbar: React.FC = () => {
  return (
    <nav className={`fixed top-0 w-full z-50 px-8 py-6 ${inter.className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Home */}
          <button className="group relative px-4 py-2">
            <span className="text-sm font-light tracking-widest text-amber-400/50 group-hover:text-amber-400/80 transition-colors duration-300">
              HOME
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/70 transition-all duration-500" />
          </button>

          {/* About */}
          <button className="group relative px-4 py-2">
            <span className="text-sm font-light tracking-widest text-amber-400/50 group-hover:text-amber-400/80 transition-colors duration-300">
              ABOUT
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/70 transition-all duration-500" />
          </button>

          {/* Press */}
          <button className="group relative px-4 py-2">
            <span className="text-sm font-light tracking-widest text-amber-400/50 group-hover:text-amber-400/80 transition-colors duration-300">
              PRESS
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/70 transition-all duration-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
