import { NextResponse } from "next/server";

type CacheControlOptions = {
  public?: boolean;
  maxAge?: number;
  staleWhileRevalidate?: number;
  mustRevalidate?: boolean;
};

export function setCacheHeaders(
  response: NextResponse,
  options: CacheControlOptions = {}
) {
  const {
    public: isPublic = true,
    maxAge = 3600, // 1 hour default
    staleWhileRevalidate = 60, // 1 minute default
    mustRevalidate = false,
  } = options;

  const directives = [
    isPublic ? "public" : "private",
    `max-age=${maxAge}`,
    `stale-while-revalidate=${staleWhileRevalidate}`,
  ];

  if (mustRevalidate) {
    directives.push("must-revalidate");
  }

  response.headers.set("Cache-Control", directives.join(", "));
  return response;
}

export const CACHE_CONFIGS = {
  staticAssets: {
    public: true,
    maxAge: 31536000, // 1 year
    staleWhileRevalidate: 86400, // 1 day
  },
  dynamicContent: {
    public: true,
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 60, // 1 minute
  },
  userSpecific: {
    public: false,
    maxAge: 300, // 5 minutes
    mustRevalidate: true,
  },
} as const;
