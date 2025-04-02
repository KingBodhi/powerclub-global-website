"use client";

import React, { useState } from "react";

interface NotionImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function NotionImage({ src, alt, className }: NotionImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (hasError) {
      // Create a data URI for a colored background with text as final fallback
      const fallbackSvg = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#ae904c10" />
          <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#ae904c" text-anchor="middle" dy=".3em">Image Not Available</text>
        </svg>
      `;
      const encodedSvg = encodeURIComponent(fallbackSvg);
      setImgSrc(`data:image/svg+xml;charset=utf-8,${encodedSvg}`);
    } else {
      // Try proxying the image if direct access fails
      setImgSrc(`/api/image-proxy?url=${encodeURIComponent(src)}`);
      setHasError(true);
    }
  };

  return (
    <div className="w-full h-full bg-[#ae904c]/5 flex flex-col items-center justify-start overflow-hidden">
      <img
        src={imgSrc}
        alt={alt || "Notion image"}
        className={`max-w-full max-h-full object-contain object-top ${
          className || ""
        }`}
        onError={handleError}
        style={{ objectPosition: "top center" }}
      />
    </div>
  );
}
