import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { ArrowUpRight, Phone, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { services } from "@/data/services";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "CTO",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "CO-Founder",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "CFO",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
];

interface ServiceCardProps {
  title: string;
  image: string;
  description: string;
  id: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  image,
  description,
  id,
}) => (
  <Link href={`/services/${id}`}>
    <div className="relative group rounded-2xl overflow-hidden min-w-48 h-48 flex-1 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-lg font-medium flex items-center gap-2">
          {title}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </p>
        <p className="text-sm text-white/80 mt-1 max-w-[200px] hidden group-hover:flex transition-opacity">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

interface PageProps {
  params: Promise<{
    serviceId: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ServicePage({ params }: PageProps) {
  // Await both params and searchParams
  const resolvedParams = await params;
  // const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const service = services.find((s) => s.id === resolvedParams.serviceId);

  if (!service) {
    notFound();
  }

  const currentIndex = services.findIndex((s) => s.id === service.id);
  const relatedServices = Array.from({ length: 3 }, (_, i) => {
    const nextIndex = (currentIndex + i + 1) % services.length;
    return services[nextIndex];
  });
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-between pt-10 lg:pt-20 px-4 md:px-8 lg:px-16 xl:px-32 overflow-hidden">
        {/* Left side content */}
        <div className="w-full lg:w-1/2 flex items-start justify-between pt-16 lg:pt-20 px-4 lg:pl-20 z-10">
          <div className="flex flex-col w-full">
            <div>
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-xs md:text-sm mb-6 md:mb-8">
                <Sparkles className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                No. 1 in the world
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
              <span className="whitespace-normal lg:whitespace-nowrap">
                {service.prefix}
              </span>
              <br />
              <span className="font-bold text-[#ae904c] whitespace-normal">
                {service.title}
              </span>
              <br />
              {service.suffix}
            </h1>

            <div className="flex gap-3 mt-8 lg:mt-12">
              <AnimatedTooltip items={people} />
            </div>

            <p className="text-white/70 text-base lg:text-lg max-w-xl mt-8 lg:mt-12">
              {service.longDescription}
            </p>

            <button className="bg-[#ae904c] text-white max-w-40 px-6 py-3 rounded-lg mt-8 lg:mt-12 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Book a call
            </button>

            <h2 className="text-4xl lg:text-5xl font-semibold text-[#ae904c] mt-16 lg:mt-28">
              Other Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 lg:gap-5 my-8 lg:my-12">
              {relatedServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  image={`/services/${service.id}-cover.webp`}
                  description={service.description}
                />
              ))}
              <Link
                href="/services"
                className="lg:col-span-1 lg:flex-1 min-w-48"
              >
                <div className="h-48 rounded-2xl border border-[#ae904c] flex items-center justify-between p-4 group cursor-pointer hover:bg-[#ae904c]/10 transition-colors">
                  <p className="text-white text-lg font-medium group-hover:text-[#ae904c] transition-colors flex items-center gap-2 self-end">
                    See all
                    <ArrowUpRight className="w-4 h-4" />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right side images */}
        <div className="w-full lg:w-[30%] flex justify-end z-0 mt-8 lg:mt-0 overflow-hidden">
          <div className="flex flex-col gap-5 w-full lg:max-w-lg">
            <div className="h-48 lg:h-1/3">
              <img
                src={`/services/${service.id}3.jpeg`}
                className="w-full h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
            </div>
            <div className="flex gap-5 h-32 lg:h-1/4">
              <img
                src={`/services/${service.id}2.jpeg`}
                className="w-1/2 h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
              <img
                src={`/services/${service.id}1.jpeg`}
                className="w-1/2 h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
            </div>
            <div className="h-48 lg:h-1/3">
              <img
                src={`/services/${service.id}4.jpeg`}
                className="w-full h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
            </div>
          </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </main>
  );
}
