import DarkGridBackground from "@/components/DarkGridBackground";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <DarkGridBackground>
        {/* Main Content */}
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto text-center">
            <h1 className="text-7xl font-bold mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200/80 via-amber-400/80 to-amber-200/80">
                LOREM IPSUM DOLOR
              </span>
            </h1>
            <p className="text-lg text-white/60 mb-12 uppercase tracking-wide max-w-2xl font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-amber-400/10 to-amber-500/10 border border-amber-400/30 text-amber-300/90 rounded-lg hover:bg-amber-400/20 transition-all duration-300 uppercase tracking-wider text-sm font-light">
              Get Started
            </button>
          </div>
        </div>
      </DarkGridBackground>
    </main>
  );
}
