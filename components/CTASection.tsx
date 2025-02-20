import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "Let's Work Together!",
  description = "Let's work together to achieve your goals. Our team of experts is ready to help bring your vision to life.",
  primaryButtonText = "Schedule Call",
  secondaryButtonText = "Let's Chat",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const router = useRouter();

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      window.open(
        "https://calendly.com/powerclub-global/business-interaction",
        "_blank"
      );
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      router.push("/contact");
    }
  };

  return (
    <div className="relative w-full bg-black/95 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 w-full">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(#ae904c 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 w-full">
        <div className="relative mx-auto w-full">
          {/* Border Frame */}
          <div className="absolute inset-0 rounded-xl border border-[#ae904c]/70" />

          {/* Content Box */}
          <div
            className="relative rounded-xl backdrop-blur-sm bg-black/20 border border-[#ae904c]/70 p-12
              transform-gpu transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2 text-center"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c] to-[#ae904c]/80">
                {title}
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg mb-12">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePrimaryClick}
                className="px-8 py-4 rounded-lg bg-[#ae904c] text-white hover:bg-[#ae904c]/90
                          transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {primaryButtonText} <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleSecondaryClick}
                className="px-8 py-4 rounded-lg border border-[#ae904c]/30 text-[#ae904c]
                          hover:bg-[#ae904c]/10 transition-colors duration-300
                          flex items-center justify-center gap-2"
              >
                {secondaryButtonText} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
