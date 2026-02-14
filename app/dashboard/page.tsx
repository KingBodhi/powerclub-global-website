"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new ORCHA page
    router.replace("/orcha");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#ae904c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/60 uppercase tracking-wide">Redirecting to ORCHA...</p>
      </div>
    </div>
  );
}
