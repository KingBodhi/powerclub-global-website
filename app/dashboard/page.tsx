"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkGridBackground from "@/components/DarkGridBackground";
import DarkGridBackground2 from "@/components/DarkGridBackground2";
import { Download, Coins, Zap, Shield, Globe, Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

const platformDownloads = [
  {
    platform: "Mac",
    icon: "🍎",
    description: "macOS 10.15+ (Intel & Apple Silicon)",
  },
  {
    platform: "Linux",
    icon: "🐧",
    description: "Ubuntu 20.04+, Debian, and compatible",
  },
];

const dashboardFeatures = [
  {
    icon: Coins,
    title: "Earn VIBE Rewards",
    description: "Contribute compute power and earn VIBE tokens automatically",
  },
  {
    icon: Zap,
    title: "Auto-Start Services",
    description: "APN node runs in background on system startup",
  },
  {
    icon: Shield,
    title: "Device Wallet",
    description: "Each device gets its own wallet for VIBE rewards",
  },
  {
    icon: Terminal,
    title: "Web Dashboard",
    description: "Monitor your network status and earnings at localhost:58297",
  },
  {
    icon: Globe,
    title: "Mesh Network",
    description: "Join the decentralized compute network instantly",
  },
  {
    icon: Download,
    title: "One Command Setup",
    description: "Install everything with a single command",
  },
];

function CopyButton() {
  const [copied, setCopied] = useState(false);
  const installCommand = "curl -fsSL https://raw.githubusercontent.com/KingBodhi/pcg-cc-mcp/main/install-pcg-client.sh | bash";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] rounded-lg hover:bg-[#ae904c]/20 transition-all uppercase tracking-wider text-xs"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function DashboardPage() {
  return (
    <main className="relative">
      <Navbar />

      {/* Hero Section */}
      <DarkGridBackground>
        <div className="container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#ae904c]/20 to-[#ae904c]/10 border border-[#ae904c]/30 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#ae904c] flex items-center justify-center">
                <span className="text-lg font-bold text-black">PCG</span>
              </div>
              <span className="text-sm tracking-wider font-light text-white/80 uppercase">
                Power Club Global Dashboard
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80 uppercase">
                Transform Your Device
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/60 mb-12 uppercase tracking-wide max-w-3xl mx-auto font-light">
              Turn your computer into a decentralized compute node • Earn VIBE tokens 24/7
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#ae904c]">$0.001</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-2">VIBE Price</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white">11+</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-2">Active Nodes</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#ae904c]">24/7</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-2">Earning</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#download"
                className="px-10 py-4 bg-gradient-to-r from-[#ae904c]/20 to-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] rounded-lg hover:bg-[#ae904c]/30 transition-all uppercase tracking-wider text-sm font-light inline-flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download Dashboard
              </a>
              <a
                href="#vibe"
                className="px-10 py-4 bg-white/5 border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition-all uppercase tracking-wider text-sm font-light inline-flex items-center gap-3"
              >
                <Coins className="w-5 h-5" />
                Buy VIBE Tokens
              </a>
            </div>
          </motion.div>
        </div>
      </DarkGridBackground>

      {/* Download Section */}
      <DarkGridBackground2>
        <div id="download" className="container mx-auto px-4 py-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80 uppercase">
                  One Command Installation
                </span>
              </h2>
              <p className="text-white/60 uppercase tracking-wide text-sm">
                Install the PCG Dashboard and start earning VIBE tokens in seconds
              </p>
            </motion.div>

            {/* Installation Command */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#ae904c]/20 flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-[#ae904c]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white uppercase tracking-wide">Quick Install</h3>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Copy and paste into your terminal</p>
                  </div>
                </div>
                <CopyButton />
              </div>

              <div className="p-4 rounded-lg bg-black/50 border border-white/10 font-mono text-sm overflow-x-auto">
                <code className="text-[#ae904c]">
                  curl -fsSL https://raw.githubusercontent.com/KingBodhi/pcg-cc-mcp/main/install-pcg-client.sh | bash
                </code>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-[#ae904c]/10 border border-[#ae904c]/30">
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-[#ae904c] uppercase tracking-wider">Requirements:</span> Rust/Cargo must be installed. Visit{" "}
                  <a href="https://rustup.rs" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] hover:underline">
                    rustup.rs
                  </a>{" "}
                  if needed.
                </p>
              </div>
            </motion.div>

            {/* Platform Support */}
            <div className="grid md:grid-cols-2 gap-6">
              {platformDownloads.map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:border-[#ae904c]/30 transition-all"
                >
                  <div className="text-6xl mb-4">{platform.icon}</div>
                  <h3 className="text-2xl font-semibold text-white uppercase tracking-wide mb-2">
                    {platform.platform}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">{platform.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ae904c]/20 text-[#ae904c] text-xs uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#ae904c]"></span>
                    Supported
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </DarkGridBackground2>

      {/* What You Get */}
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80 uppercase">
                What You Get
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#ae904c]/30 transition-all"
                >
                  <IconComponent className="w-10 h-10 text-[#ae904c] mb-4" />
                  <h3 className="text-lg font-semibold text-white uppercase tracking-wide mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* VIBE Token Section */}
      <DarkGridBackground>
        <div id="vibe" className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-2xl bg-gradient-to-br from-[#ae904c]/10 to-transparent border border-[#ae904c]/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-full bg-[#ae904c] flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">V</span>
                </div>
                <span className="px-4 py-2 rounded-full bg-[#ae904c]/20 text-[#ae904c] text-xs uppercase tracking-wider">
                  Ecosystem Token
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80 uppercase">
                  Buy VIBE Tokens
                </span>
              </h2>

              <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
                Purchase VIBE tokens instantly with V Link. Use them in the Power Club Global ecosystem or hold as your devices earn more.
              </p>

              {/* Token Info */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-bold text-[#ae904c]">$0.001</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-2">Current Price</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">1B</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-2">Total Supply</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-bold text-[#ae904c]">LIVE</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-2">Status</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://vibe-token.vercel.app/buy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-[#ae904c] hover:bg-[#ae904c]/80 rounded-lg font-semibold text-black transition-all uppercase tracking-wider text-sm inline-flex items-center gap-2"
                >
                  <span>Buy with V Link</span>
                  <Coins className="w-5 h-5" />
                </a>
                <a
                  href="https://vibe-token.vercel.app/tokenomics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 border border-[#ae904c]/30 rounded-lg font-semibold text-[#ae904c] hover:bg-[#ae904c]/10 transition-all uppercase tracking-wider text-sm"
                >
                  View Tokenomics
                </a>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-black/30 border border-white/10">
                <p className="text-sm text-white/70 text-center">
                  <span className="font-semibold text-[#ae904c] uppercase tracking-wider">Two Separate Wallets:</span> Your user wallet (for buying VIBE) is separate from your device wallet (which earns VIBE). Each device automatically gets its own earning wallet.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </DarkGridBackground>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80 uppercase">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-white/60 text-base mb-12 max-w-2xl mx-auto uppercase tracking-wide">
              Join Power Club Global today. Install the dashboard, connect to the network, and start earning VIBE tokens from your device's compute power.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#download"
                className="px-10 py-4 bg-gradient-to-r from-[#ae904c]/20 to-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] rounded-lg hover:bg-[#ae904c]/30 transition-all uppercase tracking-wider text-sm font-light"
              >
                Install Now
              </a>
              <a
                href="https://github.com/KingBodhi/pcg-cc-mcp/blob/main/CLIENT_README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white/5 border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition-all uppercase tracking-wider text-sm font-light"
              >
                Full Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
