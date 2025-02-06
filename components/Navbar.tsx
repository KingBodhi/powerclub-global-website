import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Menu, X } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

interface NavItemProps {
  text: string;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ text, isMobile, onClick }) => (
  <button
    className={`group relative px-4 py-2 ${isMobile ? "w-full text-left" : ""}`}
    onClick={onClick}
  >
    <span className="text-sm font-light tracking-widest text-amber-400/50 group-hover:text-amber-400/80 transition-colors duration-300">
      {text}
    </span>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/70 transition-all duration-500" />
  </button>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["HOME", "ABOUT", "SERVICES", "PRESS RELEASES", "CONTACT"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 ${inter.className} bg-black`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout - Exactly as original */}
        <div className="hidden md:flex justify-between items-center">
          <img src="/logo-transparent.png" alt="Logo" className="w-20" />
          {navItems.map((item) => (
            <NavItem key={item} text={item} />
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden justify-between items-center">
          <img src="/logo-transparent.png" alt="Logo" className="w-16" />
          <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-6 w-6 text-amber-400/50" />
            ) : (
              <Menu className="h-6 w-6 text-amber-400/50" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`
          md:hidden 
          fixed left-0 right-0 
          bg-black/95 
          transition-all duration-300 ease-in-out
          ${isOpen ? "top-16 opacity-100" : "-top-full opacity-0"}
        `}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item}
                text={item}
                isMobile
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
