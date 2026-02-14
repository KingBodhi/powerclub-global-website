"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkGridBackground from "@/components/DarkGridBackground";
import DarkGridBackground2 from "@/components/DarkGridBackground2";
import { Download, Workflow, Zap, Shield, Globe, Terminal, Database } from "lucide-react";

const platformDownloads = [
  {
    platform: "macOS",
    icon: "🍎",
    description: "Mac Studio, MacBook - Intel & Apple Silicon",
    downloadUrl: "https://github.com/KingBodhi/pcg-cc-mcp/releases/download/v1.0.0-macos/orcha-macos-installer.tar.gz",
    size: "113 MB",
    available: true,
  },
  {
    platform: "Windows",
    icon: "🪟",
    description: "Windows 10/11 - 64-bit",
    downloadUrl: "#",
    size: "TBA",
    available: false,
  },
  {
    platform: "Linux",
    icon: "🐧",
    description: "Ubuntu 20.04+, Debian, Pop!_OS",
    downloadUrl: "#",
    size: "TBA",
    available: false,
  },
];

const orchaFeatures = [
  {
    icon: Workflow,
    title: "Task Orchestration",
    description: "Coordinate complex workflows across your sovereign devices",
  },
  {
    icon: Database,
    title: "Sovereign Data",
    description: "Your data stays on your devices - full federation, zero central storage",
  },
  {
    icon: Globe,
    title: "Alpha Protocol Network",
    description: "Connect all your devices through the α mesh network",
  },
  {
    icon: Shield,
    title: "Always-On Nodes",
    description: "Deploy ORCHA on Mac Studio or desktop for 24/7 availability",
  },
  {
    icon: Zap,
    title: "Auto-Start Services",
    description: "Launch on boot with system tray status indicator",
  },
  {
    icon: Terminal,
    title: "Web Dashboard",
    description: "Access your orchestration center from any device on your network",
  },
];

export default function OrchaPage() {
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
              <div className="w-10 h-10 rounded-full bg-[#ae904c] flex items-center justify-center text-2xl">
                🐋
              </div>
              <span className="text-sm tracking-wider font-light text-white/80 uppercase">
                ORCHA - Orchestration Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80 uppercase">
                Your Sovereign Stack
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/60 mb-12 uppercase tracking-wide max-w-3xl mx-auto font-light">
              Orchestrate tasks • Federate data • Connect devices • Full sovereignty
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#ae904c]">α</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-2">APN Mesh</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-2">Sovereign</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-[#ae904c]">24/7</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-2">Always On</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#download"
                className="px-10 py-4 bg-gradient-to-r from-[#ae904c]/20 to-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] rounded-lg hover:bg-[#ae904c]/30 transition-all uppercase tracking-wider text-sm font-light inline-flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download ORCHA
              </a>
              <a
                href="https://github.com/KingBodhi/pcg-cc-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white/5 border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition-all uppercase tracking-wider text-sm font-light inline-flex items-center gap-3"
              >
                <Terminal className="w-5 h-5" />
                View Documentation
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
                  Download for Your Platform
                </span>
              </h2>
              <p className="text-white/60 uppercase tracking-wide text-sm">
                Install ORCHA on your Mac Studio, desktop, or laptop
              </p>
            </motion.div>

            {/* Platform Downloads */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {platformDownloads.map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#ae904c]/30 transition-all"
                >
                  <div className="text-6xl mb-4 text-center">{platform.icon}</div>
                  <h3 className="text-2xl font-semibold text-white uppercase tracking-wide mb-2 text-center">
                    {platform.platform}
                  </h3>
                  <p className="text-sm text-white/60 mb-2 text-center">{platform.description}</p>
                  <p className="text-xs text-white/40 mb-6 text-center">{platform.size}</p>

                  {platform.available ? (
                    <a
                      href={platform.downloadUrl}
                      download
                      className="block w-full px-6 py-3 bg-[#ae904c] hover:bg-[#ae904c]/80 rounded-lg font-semibold text-black transition-all uppercase tracking-wider text-sm text-center"
                    >
                      <Download className="w-4 h-4 inline mr-2" />
                      Download
                    </a>
                  ) : (
                    <div className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white/40 uppercase tracking-wider text-sm text-center cursor-not-allowed">
                      Coming Soon
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Installation Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#ae904c]/20 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-[#ae904c]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white uppercase tracking-wide">macOS Installation</h3>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Quick setup for Mac Studio & MacBook</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-black/50 border border-white/10">
                  <p className="text-sm text-white/70 mb-2 uppercase tracking-wider font-semibold">Step 1: Download & Extract</p>
                  <code className="block font-mono text-xs text-[#ae904c]">
                    cd ~/Downloads<br/>
                    tar -xzf orcha-macos-installer.tar.gz<br/>
                    cd pcg-cc-mcp
                  </code>
                </div>

                <div className="p-4 rounded-lg bg-black/50 border border-white/10">
                  <p className="text-sm text-white/70 mb-2 uppercase tracking-wider font-semibold">Step 2: Run Setup</p>
                  <code className="block font-mono text-xs text-[#ae904c]">
                    chmod +x orcha-deployment/setup-bonomotion-macos.sh<br/>
                    ./orcha-deployment/setup-bonomotion-macos.sh
                  </code>
                </div>

                <div className="p-4 rounded-lg bg-black/50 border border-white/10">
                  <p className="text-sm text-white/70 mb-2 uppercase tracking-wider font-semibold">Step 3: Start Services</p>
                  <code className="block font-mono text-xs text-[#ae904c]">
                    launchctl load ~/Library/LaunchAgents/com.powerclubglobal.apn-node.plist<br/>
                    launchctl load ~/Library/LaunchAgents/com.powerclubglobal.orcha.plist
                  </code>
                </div>

                <div className="p-4 rounded-lg bg-black/50 border border-white/10">
                  <p className="text-sm text-white/70 mb-2 uppercase tracking-wider font-semibold">Step 4: Access Dashboard</p>
                  <code className="block font-mono text-xs text-[#ae904c]">
                    http://localhost:3000<br/>
                    http://&lt;your-mac-ip&gt;:3000 (from other devices)
                  </code>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-[#ae904c]/10 border border-[#ae904c]/30">
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-[#ae904c] uppercase tracking-wider">Full Guide:</span> See{" "}
                  <code className="text-[#ae904c] text-xs">MACOS_SETUP_GUIDE.md</code> included in the download for detailed instructions and troubleshooting.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </DarkGridBackground2>

      {/* Features */}
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
            {orchaFeatures.map((feature, index) => {
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

      {/* What's Included */}
      <DarkGridBackground>
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-2xl bg-gradient-to-br from-[#ae904c]/10 to-transparent border border-[#ae904c]/30 backdrop-blur-sm"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80 uppercase">
                  What&apos;s Included
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 uppercase tracking-wide">✅ ORCHA Server</h3>
                  <p className="text-sm text-white/60">Main orchestration engine with web dashboard</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 uppercase tracking-wide">✅ APN Node</h3>
                  <p className="text-sm text-white/60">Alpha Protocol Network mesh connectivity</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 uppercase tracking-wide">✅ Topsi Database</h3>
                  <p className="text-sm text-white/60">Complete project, task, and workflow data</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 uppercase tracking-wide">✅ Media Pipeline</h3>
                  <p className="text-sm text-white/60">Generated cinematics and content assets</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 uppercase tracking-wide">✅ Auto-Start Services</h3>
                  <p className="text-sm text-white/60">launchd configuration for boot-time startup</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3 uppercase tracking-wide">✅ Full Documentation</h3>
                  <p className="text-sm text-white/60">Setup guides and troubleshooting</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                <p className="text-sm text-white/70 text-center">
                  <span className="font-semibold text-[#ae904c] uppercase tracking-wider">System Tray Icon:</span> ORCHA shows α APN status in your system tray (like Telegram/RustDesk), visible even when the dashboard is closed.
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
              Download ORCHA for your Mac Studio or desktop. Deploy your sovereign orchestration node in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#download"
                className="px-10 py-4 bg-gradient-to-r from-[#ae904c]/20 to-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] rounded-lg hover:bg-[#ae904c]/30 transition-all uppercase tracking-wider text-sm font-light"
              >
                Download Now
              </a>
              <a
                href="https://github.com/KingBodhi/pcg-cc-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white/5 border border-white/20 text-white/80 rounded-lg hover:bg-white/10 transition-all uppercase tracking-wider text-sm font-light"
              >
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
