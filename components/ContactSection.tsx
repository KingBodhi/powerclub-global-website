import React, { useRef } from "react";
import {
  Mail,
  Phone,
  Send,
  LucideIcon,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  info: string;
  delay?: number;
  primary?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  info,
  primary = false,
}) => (
  <div
    className={`group p-6 rounded-xl backdrop-blur-sm 
      ${
        primary
          ? "bg-[#ae904c] border-none"
          : "bg-black/20 border border-[#ae904c]/20"
      } 
      hover:scale-105 transition-all duration-300`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`p-3 rounded-lg ${
          primary ? "bg-black/20" : "bg-[#ae904c]/10"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${primary ? "text-white" : "text-[#ae904c]"}`}
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h4
          className={`font-medium mb-1 ${
            primary ? "text-white" : "text-[#ae904c]"
          }`}
        >
          {title}
        </h4>
        <p className={`${primary ? "text-white/90" : "text-white/60"}`}>
          {info}
        </p>
      </div>
    </div>
  </div>
);

const HighlightCard: React.FC = () => (
  <div className="relative">
    {/* Static border frame */}
    <div className="absolute inset-0 rounded-xl border border-[#ae904c]/30" />

    {/* Card content */}
    <div
      className="relative p-8 rounded-xl bg-gradient-to-br from-[#ae904c]/20 to-black/40 
      border border-[#ae904c]/30 backdrop-blur-md transform-gpu 
      transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-[#ae904c]" />
          <h3 className="text-xl font-semibold text-[#ae904c]">
            Quick Response
          </h3>
        </div>
        <p className="text-white/70">
          We typically respond within 2 hours during business hours. Schedule a
          call or send us a message - we&apos;re here to help!
        </p>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ae904c] text-white
            hover:bg-[#ae904c]/90 transition-colors duration-300"
          >
            Schedule Call <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ae904c]/30
            text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ContactSection: React.FC = () => {
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });

  return (
    <div className="relative w-full bg-black/95 pt-10 pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(#ae904c 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c] to-[#ae904c]/80">
                Let&apos;s Connect
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-center text-lg">
              Have a project in mind? We&apos;d love to help bring your vision
              to life
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <HighlightCard />
              <ContactCard
                icon={Mail}
                title="Email Us"
                info="contact@example.com"
                primary
              />
              <ContactCard
                icon={Phone}
                title="Call Us"
                info="+1 (555) 123-4567"
              />
            </div>

            {/* Right Column - Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 20 }}
              animate={
                isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="relative">
                {/* Static border frame */}
                <div className="absolute inset-0 rounded-xl border border-[#ae904c]/20" />

                {/* Form content */}
                <div
                  className="relative rounded-xl backdrop-blur-sm bg-black/20 border border-[#ae904c]/20 p-8
                  transform-gpu transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2"
                >
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                          text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                          focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                          text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                          focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                        text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                        focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={6}
                      className="w-full p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                        text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                        focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-4 px-8 rounded-lg bg-[#ae904c] text-white
                        hover:bg-[#ae904c]/90 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
