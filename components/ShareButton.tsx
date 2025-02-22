"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <button
      className="p-2 rounded-lg border border-[#ae904c]/30 text-[#ae904c] 
                hover:bg-[#ae904c]/10 transition-colors duration-300"
      onClick={handleShare}
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
}
