import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, MapPin } from "lucide-react";

interface Event {
  name: string;
  dates: string;
  location: string;
  url: string;
  image: string;
}

interface ScrollingRowProps {
  events: Event[];
  direction: "left" | "right";
}

interface EventCardProps {
  event: Event;
  index: number;
}

const EVENTS = [
  {
    name: "CES 2025",
    dates: "January 7–10, 2025",
    location: "Las Vegas, Nevada",
    url: "https://www.ces.tech/",
    image: "/events/ces.png",
  },
  {
    name: "WAGMI Miami 2025",
    dates: "January 21–24, 2025",
    location: "Miami, Florida",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/wagmi.png",
  },
  {
    name: "Crypto Gathering 2025",
    dates: "January 30–February 1, 2025",
    location: "Miami Beach, Florida",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/crypto-gathering.png",
  },
  {
    name: "Digital Assets Forum",
    dates: "February 3, 2025",
    location: "London, UK",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/london.png",
  },
  {
    name: "Consensus Hong Kong",
    dates: "February 18–20, 2025",
    location: "Hong Kong, HK",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/hongkong.png",
  },
  {
    name: "Digital Assets Week - Hong Kong",
    dates: "February 27, 2025",
    location: "Kowloon, Hong Kong",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/hongkong-daw.png",
  },
  {
    name: "Crypto Expo - Europe",
    dates: "March 2–3, 2025",
    location: "Bucharest, Romania",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/bucharest.png",
  },
  {
    name: "Web3 Amsterdam",
    dates: "March 13–14, 2025",
    location: "Amsterdam, Netherlands",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/amsterdam.png",
  },
  {
    name: "Next Block Expo",
    dates: "March 19–20, 2025",
    location: "Warsaw, Poland",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/warsaw.png",
  },
  {
    name: "DC Blockchain Summit 2025",
    dates: "March 26, 2025",
    location: "Washington, DC",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/dc.png",
  },
  {
    name: "Paris Blockchain Week",
    dates: "April 8–10, 2025",
    location: "Paris, France",
    url: "https://www.blockchainweek.fr/",
    image: "/events/paris.png",
  },
  {
    name: "Canada Crypto Week",
    dates: "May 11–17, 2025",
    location: "Toronto, Canada",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/toronto.png",
  },
  {
    name: "Blockchain Futurist Conference Toronto",
    dates: "May 13, 2025",
    location: "Toronto, Canada",
    url: "https://www.blockchainfuturistconference.com/",
    image: "/events/toronto-bfc.png",
  },
  {
    name: "ETHWomen",
    dates: "May 13, 2025",
    location: "Toronto, Canada",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/ethwomen.png",
  },
  {
    name: "Consensus Toronto",
    dates: "May 14–16, 2025",
    location: "Toronto, Canada",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/toronto-consensus.png",
  },
  {
    name: "Digital Assets Week - New York",
    dates: "May 20–21, 2025",
    location: "New York, NY",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/ny-daw.png",
  },
  {
    name: "Bitcoin 2025 Conference",
    dates: "May 27–29, 2025",
    location: "Las Vegas, Nevada",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/bitcoin.png",
  },
  {
    name: "ICMA Annual General Meeting & Conference 2025",
    dates: "June 4–6, 2025",
    location: "Frankfurt, Germany",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/frankfurt.png",
  },
  {
    name: "Crypto Valley Conference",
    dates: "June 5–6, 2025",
    location: "Risch-Rotkreuz, Switzerland",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/switzerland.png",
  },
  {
    name: "Permissionless IV",
    dates: "June 24–26, 2025",
    location: "Brooklyn, New York",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/ny.png",
  },
  {
    name: "Ethereum Community Conference",
    dates: "June 30–July 3, 2025",
    location: "Cannes, France",
    url: "https://www.ethcc.io/",
    image: "/events/cannes.png",
  },
  {
    name: "Rare Evo 2025",
    dates: "August 6–10, 2025",
    location: "Las Vegas, Nevada",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/las-vegas.png",
  },
  {
    name: "CBDC Conference",
    dates: "September 9–11, 2025",
    location: "Nassau, Bahamas",
    url: "https://ninjapromo.io/best-crypto-conferences",
    image: "/events/bahamas.png",
  },
  {
    name: "Korea Blockchain Week 2025",
    dates: "September 22–27, 2025",
    location: "Seoul, Korea",
    url: "https://koreablockchainweek.com/",
    image: "/events/seoul.png",
  },
  {
    name: "Mainnet 2025 by Messari",
    dates: "September 22–24, 2025",
    location: "New York, NY",
    url: "https://mainnet.events/",
    image: "/events/ny-mainnet.png",
  },
  {
    name: "Blockchain Life 2025",
    dates: "October 28–29, 2025",
    location: "Dubai, UAE",
    url: "https://blockchain-life.com/",
    image: "/events/dubai.png",
  },
  {
    name: "Blockchain Futurist Conference Florida",
    dates: "November 5–6, 2025",
    location: "Miami, Florida",
    url: "https://ninjapromo.io/best-crypto",
    image: "/events/miami-bfc.png",
  },
];

interface Event {
  name: string;
  dates: string;
  location: string;
  url: string;
  image: string;
}

interface ScrollingRowProps {
  events: Event[];
  direction: "left" | "right";
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  // Function to truncate text with ellipsis
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
        {/* Image section - Optimized with will-change */}
        <div className="w-full h-32 sm:h-48 sm:w-48 sm:h-full relative will-change-transform">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
            loading={index < 4 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent to-black/50" />
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
            <button
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                               rounded-md sm:rounded-lg bg-[#ae904c] text-white text-xs sm:text-base w-full sm:w-auto 
                               transition-colors duration-300 hover:bg-[#d4b366]"
            >
              Register <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                               rounded-md sm:rounded-lg border border-[#ae904c]/30 text-xs sm:text-base 
                               text-[#ae904c] w-full sm:w-auto transition-colors duration-300 
                               hover:bg-[#ae904c]/10"
            >
              Details <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollingRow: React.FC<ScrollingRowProps> = ({ events, direction }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to pause animations when not in viewport
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

  return (
    <div
      id={`scroll-row-${direction}`}
      className="flex overflow-hidden py-6"
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className={`flex ${animationClass} ${isPaused ? "animate-none" : ""}`}
      >
        {events.map((event, idx) => (
          <EventCard key={`${event.name}-${idx}`} event={event} index={idx} />
        ))}
      </div>
    </div>
  );
};

const EventsSection: React.FC = () => {
  const mid = Math.ceil(EVENTS.length / 2);
  const topEvents = EVENTS.slice(0, mid);
  const bottomEvents = EVENTS.slice(mid);

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
          <button
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full 
                           bg-[#ae904c]/10 hover:bg-[#ae904c]/20 border border-[#ae904c]/20 
                           hover:border-[#ae904c]/40 transition-colors duration-300"
          >
            <span className="text-[#ae904c] font-medium text-sm sm:text-base">
              View All
            </span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ae904c]" />
          </button>
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
