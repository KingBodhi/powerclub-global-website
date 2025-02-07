"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  Search,
  Users,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import eventsData from "@/data/events.json";
import Footer from "@/components/Footer";
import DarkGridBackground from "@/components/DarkGridBackground3";

interface EventCardProps {
  event: (typeof eventsData.events)[0];
}

const FeaturedEventCard = ({ event }: EventCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ae904c]/10 to-black/40 
               border border-[#ae904c]/30 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Image */}
      <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-[#ae904c] mb-3">
          {event.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-white/70">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.dates}</span>
          </div>
          <div className="flex items-center text-white/70">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-white/60 mb-6 line-clamp-2">{event.description}</p>

        <div className="mt-auto flex gap-4">
          <Link
            href={`/events/${event.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ae904c] text-white
                     hover:bg-[#ae904c]/90 transition-colors duration-300"
          >
            View Details <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ae904c]/30
                     text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
          >
            Register <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

const CompactEventCard = ({ event }: EventCardProps) => (
  <div className="group relative h-[200px] perspective-1000">
    <div className="preserve-3d transition-transform duration-500 ease-out group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
      {/* Card Shadow */}
      <div
        className="absolute inset-0 rounded-xl bg-black/30 blur-xl transform translate-y-4 scale-95 
                      transition-all duration-500 group-hover:translate-y-8 group-hover:scale-90"
      />

      {/* Card Content */}
      <div
        className="relative h-[200px] rounded-xl bg-gradient-to-br from-[#ae904c]/5 to-[#ae904c]/0 
                     backdrop-blur-sm border border-[#ae904c]/20 group-hover:border-[#ae904c]/40
                     transition-all duration-500 overflow-hidden"
      >
        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ae904c]/20 via-transparent to-[#ae904c]/20 animate-gradient-shift" />
          <div
            className="absolute -inset-px rounded-xl bg-gradient-to-r from-[#ae904c]/30 via-[#ae904c]/10 to-[#ae904c]/30 
                          blur-sm group-hover:animate-pulse"
          />
        </div>

        <div className="flex h-full">
          {/* Image Section */}
          <div className="relative w-56 flex-shrink-0">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 " /> */}

            {/* Event Tags - Moved to bottom left of image */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {event.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs bg-black/50 text-white/90 
                                         border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-sm text-white/60 mb-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#ae904c]" />
                  <span className="truncate">{event.dates}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#ae904c]" />
                  <span className="truncate">
                    {truncateText(event.location, 10)}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#ae904c] mb-2">
                {truncateText(event.name, 26)}
              </h3>
              <p className="text-white/60 text-sm line-clamp-2">
                {event.description}
              </p>
            </div>

            {/* Bottom Info & Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-white/60 text-sm">
                  <Users className="w-4 h-4 mr-2 text-[#ae904c]" />
                  {event.capacity.toLocaleString()}
                </div>
                <div className="text-[#ae904c] text-sm">
                  <span className="text-white/50">From </span>
                  <span className="font-semibold">
                    ${event.ticketPrice.early}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/events/${event.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ae904c]/10 
                             border border-[#ae904c]/30 text-[#ae904c] text-sm
                             hover:bg-[#ae904c]/20 transition-all duration-300"
                >
                  Details <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SmallEventCard = ({ event }: EventCardProps) => (
  <div
    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ae904c]/5 to-black/40 
                    border border-[#ae904c]/20 hover:border-[#ae904c]/40 transition-all duration-300"
  >
    <div className="relative h-48">
      <Image
        src={event.image}
        alt={event.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" /> */}
    </div>

    <div className="p-4">
      <h3 className="text-lg font-semibold text-[#ae904c] mb-2 line-clamp-1">
        {event.name}
      </h3>

      <div className="space-y-1 mb-3">
        <div className="flex items-center text-white/70 text-sm">
          <Calendar className="w-3 h-3 mr-1.5" />
          <span className="truncate">{event.dates}</span>
        </div>
        <div className="flex items-center text-white/70 text-sm">
          <MapPin className="w-3 h-3 mr-1.5" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      <Link
        href={`/events/${event.id}`}
        className="flex items-center justify-center gap-2 w-full px-3 py-1.5 rounded-lg 
                   bg-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] text-sm
                   hover:bg-[#ae904c]/20 transition-all duration-300"
      >
        View Details <ArrowUpRight className="w-3 h-3" />
      </Link>
    </div>
  </div>
);

const LocationFilter = ({
  selectedLocation,
  locations,
  onChange,
}: {
  selectedLocation: string;
  locations: string[];
  onChange: (location: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg 
                     bg-white/5 border border-white/10 text-white
                     hover:bg-white/10 hover:border-[#ae904c]/40 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#ae904c]" />
          <span>
            {selectedLocation === "all" ? "All Locations" : selectedLocation}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed md:absolute z-[100] w-[calc(100vw-32px)] md:w-full left-4 md:left-0 
               bottom-4 md:bottom-auto md:mt-2 py-2 rounded-lg bg-black/95 
               border border-white/10 backdrop-blur-xl md:translate-y-0"
          style={{
            maxHeight: "40vh",
            overflowY: "auto",
            transform: "translateY(0)", // Reset any transform on mobile
            top: "auto", // Reset top positioning on mobile
          }}
        >
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => {
                onChange(location);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-left transition-colors duration-300
                   ${
                     selectedLocation === location
                       ? "bg-[#ae904c]/20 text-[#ae904c]"
                       : "text-white/70 hover:bg-white/5"
                   }`}
            >
              {location === "all" ? "All Locations" : location}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const locations = [
    "all",
    ...new Set(eventsData.events.map((event) => event.location)),
  ];

  // Filter events
  const filteredEvents = eventsData.events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === "all" || event.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  // Split events for different sections
  const featuredEvents = filteredEvents.slice(0, 3);
  const compactEvents = filteredEvents.slice(3, 7);
  const remainingEvents = filteredEvents.slice(7);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="container mx-auto px-4 md:pt-12 pb-12">
        {/* Header */}
        <DarkGridBackground>
          <div className="container mx-auto px-4 pt-24 pb-12">
            <div className="max-w-6xl mx-auto text-center py-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/90 via-[#ae904c] to-[#ae904c]/90">
                  Upcoming Events
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto"
              >
                Join us at these upcoming blockchain and technology events
                around the world
              </motion.p>
            </div>

            {/* Filters */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 
                            text-white placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40"
                  />
                </div>

                <LocationFilter
                  selectedLocation={selectedLocation}
                  locations={locations}
                  onChange={setSelectedLocation}
                />
              </div>
            </div>
          </div>
        </DarkGridBackground>

        {/* Featured Events */}
        <div className="max-w-6xl mx-auto space-y-6 mb-16">
          {featuredEvents.map((event) => (
            <FeaturedEventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Compact Events Grid */}
        {compactEvents.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {compactEvents.map((event) => (
              <CompactEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Remaining Events Grid */}
        {remainingEvents.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {remainingEvents.map((event) => (
              <SmallEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">
              No events found matching your criteria
            </p>
          </div>
        )}

        {/* Results Count */}
        {filteredEvents.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <p className="text-white/60">
              Showing {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
