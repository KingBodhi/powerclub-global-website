"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Globe, Lightbulb, MessageCircle, Sparkles, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  desc?: string;
}

const features: FeatureCard[] = [
  {
    title: "Expert Team",
    description:
      "Our team brings decades of combined experience in the industry.",
    icon: <Users className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Global Reach",
    description:
      "Connect with audiences worldwide through our extensive network.",
    icon: <Globe className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Innovative Solutions",
    description: "Cutting-edge approaches tailored to your unique needs.",
    icon: <Lightbulb className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Transparent Communication",
    description: "Open lines of communication for clarity and peace of mind.",
    icon: <MessageCircle className="w-6 h-6 text-[#ae904c]" />,
  },
];

const stats: Stat[] = [
  {
    value: 500,
    label: "Events Organized",
    suffix: "+",
    desc: "We have successfully organized over 500 events.",
  },
  {
    value: 50,
    label: "Attendees",
    suffix: "K+",
    desc: "We have engaged with over 50,000 attendees.",
  },
  {
    value: 25,
    label: "Countries",
    suffix: "+",
    desc: "We have worked with clients from over 25 countries.",
  },
  {
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    desc: "Our clients rate us highly for our services.",
  },
];

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const VideoGrid = () => {
  const videos = [
    "/about/permissionless2022.mp4",
    "/about/mbw2022.mp4",
    "/about/versace2.mp4",
    "/about/versace1.mp4",
  ];

  return (
    <div className="w-full lg:w-[40%] flex justify-end z-0 mt-20 lg:mt-20 gap-4">
      <div className="w-1/2 flex flex-col gap-4 -mt-12">
        {videos.slice(0, 2).map((src, index) => (
          <div
            key={index}
            className={`h-[${
              index === 0 ? "300" : "400"
            }px] rounded-xl overflow-hidden`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all"
              style={{ objectFit: "cover" }}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        {videos.slice(2).map((src, index) => (
          <div
            key={index}
            className={`h-[${
              index === 0 ? "400" : "300"
            }px] rounded-xl overflow-hidden`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all"
              style={{ objectFit: "cover" }}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCounter = ({ stat, index }: { stat: Stat; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col lg:border-r border-[#ae904c]/20 py-10 relative group/feature",
        (index === 0 || index === 4) && "lg:border-l border-[#ae904c]/50",
        index < 4 && "lg:border-b border-[#ae904c]/50"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#ae904c]/5 to-transparent pointer-events-none" />

      <div className="mb-4 relative z-10 px-10">
        <div className="text-4xl font-bold text-[#ae904c]">
          {inView ? (
            <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
          ) : (
            "0"
          )}
        </div>
      </div>

      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#ae904c]/20 group-hover/feature:bg-[#ae904c] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {stat.label}
        </span>
        <p className="text-sm text-white/70 max-w-xs relative z-10 pt-2">
          {stat.desc}
        </p>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between pt-10 lg:pt-20 px-4 md:px-8 lg:px-16 xl:px-32 overflow-hidden">
        <div className="w-full lg:w-1/2 flex items-start justify-between pt-16 px-4 lg:pl-20 z-10">
          <div className="flex flex-col w-full">
            <div>
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-xs md:text-sm mb-6 md:mb-8">
                <Sparkles className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                Leading the Industry Since 2018
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
              <span className="whitespace-normal lg:whitespace-nowrap">
                Where Vision
              </span>
              <br />
              <span className="font-bold text-[#ae904c] whitespace-normal">
                Excellence
              </span>
              <br />
              In Innovation
            </h1>

            <div className="flex gap-3 mt-8 lg:mt-12">
              <AnimatedTooltip items={people} />
            </div>
            <p className="text-white/70 text-base lg:text-lg max-w-xl mt-8 lg:mt-12">
              We are more than just a company – we&apos;re a collective of
              visionaries, innovators, and industry leaders dedicated to
              transforming the digital landscape.
            </p>
            <p className="text-white/70 text-base lg:text-lg max-w-xl mt-6 lg:mt-8">
              We are more than just a company – we&apos;re a collective of
              visionaries, innovators, and industry leaders dedicated to
              transforming the digital landscape. With over 5 years of
              excellence, we&apos;ve helped shape the future of digital
              innovation, working with leading brands and organizations
              worldwide.
            </p>
            <div className="">
              <button className="bg-[#ae904c] text-white max-w-44 px-6 py-3 rounded-lg mt-8 lg:mt-12 flex items-center gap-2">
                Get Started Now
              </button>
            </div>
          </div>
        </div>

        <VideoGrid />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16 relative z-10 md:py-10 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <StatCounter key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Building Tomorrow Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mt-32">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#ae904c] mb-8">
          Building Tomorrow&apos;s Digital Landscape
        </h2>
        <p className="text-white/70 text-lg leading-relaxed">
          Since our inception, we&apos;ve been at the forefront of digital
          innovation, working with visionary leaders and influential figures who
          share our passion for excellence. Our journey has been marked by
          groundbreaking achievements and transformative partnerships that
          continue to shape the industry.
        </p>
      </div>

      {/* Tilted Images Row */}
      <div className="w-full mt-24 overflow-y-visible overflow-x-clip">
        <div className="flex flex-nowrap gap-6 justify-between ">
          {[
            "/about/influenfial-ppl-1.jpeg",
            "/about/influenfial-ppl-2.jpeg",
            "/about/influenfial-ppl-3.jpeg",
            "/about/influenfial-ppl-4.jpeg",
            "/about/influenfial-ppl-5.jpeg",
            "/about/influenfial-ppl-6.jpeg",
          ].map((img, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                transform: `rotate(${index % 2 === 0 ? "-5" : "5"}deg)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-2xl transform scale-105 shadow-2xl" />
              <div className="relative w-36 h-36 lg:w-64 lg:h-64 overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`Influential person ${index + 1}`}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center max-w-4xl mx-auto px-4 mt-32">
        <p className="text-white/70 text-lg leading-relaxed">
          Since our inception, we&apos;ve been at the forefront of digital
          innovation, working with visionary leaders and influential figures who
          share our passion for excellence. Our journey has been marked by
          groundbreaking achievements and transformative partnerships that
          continue to shape the industry. Since our inception, we&apos;ve been
          at the forefront of digital innovation, working with visionary leaders
          and influential figures who share our passion for excellence. Our
          journey has been marked by groundbreaking achievements and
          transformative partnerships that continue to shape the industry.
        </p>
      </div>
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16 relative z-10 md:py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={cn(
              "flex flex-col lg:border-r border-[#ae904c]/20 py-10 relative group/feature",
              (index === 0 || index === 4) && "lg:border-l border-[#ae904c]/50",
              index < 4 && "lg:border-b border-[#ae904c]/50"
            )}
          >
            {index < 4 && (
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#ae904c]/5 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#ae904c]/5 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-[#ae904c]">
              {feature.icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#ae904c]/20 group-hover/feature:bg-[#ae904c] transition-all duration-200 origin-center" />
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
                {feature.title}
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-xs relative z-10 px-10">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      {/* Past Events Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-32">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#ae904c] text-center mb-16">
          Past Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event Card 1 */}
          <div className="group bg-gradient-to-br from-[#ae904c]/10 to-black/40 rounded-2xl border border-[#ae904c]/20 overflow-hidden">
            <div className="h-[300px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: "cover" }}
              >
                <source src="/about/permissionless2022.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Permissionless 2022
                </h3>
                <span className="text-sm text-[#ae904c]">Miami, FL</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                A groundbreaking conference that brought together industry
                leaders to discuss the future of blockchain technology and
                decentralized finance.
              </p>
              <div className="flex items-center gap-2 text-[#ae904c] text-sm">
                <span>May 17-19, 2022</span>
                <span className="text-white/30">•</span>
                <span>5000+ Attendees</span>
              </div>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="group bg-gradient-to-br from-[#ae904c]/10 to-black/40 rounded-2xl border border-[#ae904c]/20 overflow-hidden">
            <div className="h-[300px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: "cover" }}
              >
                <source src="/about/mbw2022.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Miami Blockchain Week
                </h3>
                <span className="text-sm text-[#ae904c]">Miami, FL</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                An immersive week-long event showcasing the latest innovations
                in blockchain technology and their real-world applications.
              </p>
              <div className="flex items-center gap-2 text-[#ae904c] text-sm">
                <span>April 1-7, 2022</span>
                <span className="text-white/30">•</span>
                <span>10000+ Attendees</span>
              </div>
            </div>
          </div>

          {/* Event Card 3 */}
          <div className="group bg-gradient-to-br from-[#ae904c]/10 to-black/40 rounded-2xl border border-[#ae904c]/20 overflow-hidden">
            <div className="h-[300px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: "cover" }}
              >
                <source src="/about/versace1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Versace Innovation Summit
                </h3>
                <span className="text-sm text-[#ae904c]">Milan, Italy</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                A prestigious gathering of fashion and technology leaders
                exploring the intersection of luxury brands and digital
                innovation.
              </p>
              <div className="flex items-center gap-2 text-[#ae904c] text-sm">
                <span>September 15-16, 2022</span>
                <span className="text-white/30">•</span>
                <span>1000+ Attendees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Sections */}
      <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-5xl font-semibold text-[#ae904c]">
                Lorem Ipsum
              </h3>
              <div className="space-y-4">
                <p className="text-white/70 text-base lg:text-lg">
                  We believe in a collaborative approach that puts your goals
                  first. Our team works closely with you to understand your
                  unique challenges and opportunities, developing tailored
                  solutions that drive real results.
                </p>
                <p className="text-white/70 text-base lg:text-lg">
                  In today&apos;s fast-paced digital landscape, having a strong
                  presence and clear strategy is more important than ever. Our
                  solutions help you stay ahead of the curve and maintain a
                  competitive edge.
                </p>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
              <img
                src="/services/press-relations1.jpeg"
                alt="Placeholder"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-32 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <img
                src="/about/team-at-work.jpeg"
                alt="Placeholder"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl lg:text-5xl font-semibold text-[#ae904c]">
                Lorem Ipsum
              </h3>
              <div className="space-y-4">
                <p className="text-white/70 text-base lg:text-lg">
                  Our proven track record speaks for itself. We&apos;ve helped
                  numerous organizations transform their digital presence and
                  achieve measurable growth through strategic implementation and
                  innovative solutions.
                </p>
                <p className="text-white/70 text-base lg:text-lg">
                  By combining industry expertise with cutting-edge technology,
                  we ensure that every project we undertake delivers maximum
                  value and sustainable long-term results for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
