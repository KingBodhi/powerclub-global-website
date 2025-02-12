import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, MapPin } from "lucide-react";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/events";
import Link from "next/link";

interface ScrollingRowProps {
  events: Event[];
  direction: "left" | "right";
}

interface EventCardProps {
  event: Event;
  index: number;
}
interface ScrollingRowProps {
  events: Event[];
  direction: "left" | "right";
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <div
      className="flex-shrink-0 w-[260px] sm:w-[400px] lg:w-[500px] h-auto sm:h-52 mx-3 sm:mx-6 
                    relative rounded-lg sm:rounded-xl bg-gradient-to-br from-[#ae904c]/10 group-hover:from-[#ae904c]/10 to-black/40 
                    border border-[#ae904c]/30 group-hover:border-[#ae904c]/90 overflow-hidden transform-gpu hover:scale-[1.02] 
                    transition-transform duration-300"
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image section */}
        <div className="w-full h-32 sm:h-48 sm:w-48 sm:h-full relative will-change-transform">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
            loading={index < 4 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent to-black/50" />

          {/* Tags */}
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {event.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-black/50 text-white/90 rounded-full 
                                     border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 p-3 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-xl font-semibold text-[#ae904c] mb-2 sm:mb-4 line-clamp-2">
              {truncateText(event.name, 18)}
            </h3>

            <div className="space-y-1.5 sm:space-y-3">
              <div className="flex items-center text-white/70">
                <Calendar
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 mr-1.5 sm:mr-3 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-base">{event.dates}</span>
              </div>

              <div className="flex items-center text-white/70">
                <MapPin
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 mr-1.5 sm:mr-3 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-base truncate">
                  {truncateText(event.location, 20)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-row gap-2 sm:gap-4 mt-3 sm:mt-4">
            <Link
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                       rounded-md sm:rounded-lg bg-[#ae904c] text-white text-xs sm:text-base 
                       w-full sm:w-auto transition-colors duration-300 hover:bg-[#ae904c]/90"
            >
              From ${event.ticketPrice.early}{" "}
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href={`/events/${event.id}`}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                       rounded-md sm:rounded-lg border border-[#ae904c]/30 text-xs sm:text-base 
                       text-[#ae904c] w-full sm:w-auto transition-colors duration-300 
                       hover:bg-[#ae904c]/10"
            >
              Details <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollingRow: React.FC<ScrollingRowProps> = ({ events, direction }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`scroll-row-${direction}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [direction]);

  const animationClass = isVisible
    ? direction === "right"
      ? "animate-scroll-reverse"
      : "animate-scroll-slow"
    : "";

  // Duplicate events for continuous scrolling
  const duplicatedEvents = [...events, ...events, ...events];

  return (
    <div
      id={`scroll-row-${direction}`}
      className="flex overflow-hidden py-6"
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex ${animationClass} ${isPaused ? "animate-none" : ""}`}
      >
        {duplicatedEvents.map((event, idx) => (
          <EventCard key={`${event.id}-${idx}`} event={event} index={idx} />
        ))}
      </div>
    </div>
  );
};

const EventsSection: React.FC = () => {
  // Sort events by date
  const sortedEvents = [...eventsData.events].sort((a, b) => {
    const dateA = new Date(a.dates.split("–")[0]);
    const dateB = new Date(b.dates.split("–")[0]);
    return dateA.getTime() - dateB.getTime();
  });

  const mid = Math.ceil(sortedEvents.length / 2);
  const topEvents = sortedEvents.slice(0, mid);
  const bottomEvents = sortedEvents.slice(mid);

  return (
    <section className="w-full py-12 sm:py-20">
      <div className="container mx-auto px-4 mb-8 sm:mb-12">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80">
              Upcoming Events
            </span>
          </h2>
          <p className="text-white/60 text-center max-w-2xl text-sm sm:text-base">
            Join us at these upcoming blockchain and technology events
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full 
           bg-[#ae904c]/10 hover:bg-[#ae904c]/20 border border-[#ae904c]/20 
           hover:border-[#ae904c]/40 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/events";
            }}
          >
            <span className="text-[#ae904c] font-medium text-sm sm:text-base">
              View All
            </span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ae904c]" />
          </Link>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <ScrollingRow events={topEvents} direction="left" />
        <ScrollingRow events={bottomEvents} direction="right" />
      </div>
    </section>
  );
};

export default EventsSection;
