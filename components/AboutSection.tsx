import React from "react";
import { Play } from "lucide-react";

const VideoSection: React.FC = () => {
  return (
    <div className="relative w-full bg-black py-16 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Video Container */}
          <div className="relative aspect-video rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />

            {/* Placeholder Image - Replace src with your actual image */}
            <img
              src="/thumbnail.png"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />

            {/* Play Button */}
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 rounded-full md:p-8 p-4 transition-all duration-300 group-hover:scale-110">
              <Play className="md:w-12 md:h-12 w-8 h-8 text-amber-200" />
            </button>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
