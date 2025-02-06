import React from "react";
import Image from "next/image";

const PARTNERS = [
  {
    id: 1,
    name: "Mad Lads",
    logo: "/partners/madlads.svg",
  },
  {
    id: 2,
    name: "Monke DAO",
    logo: "/partners/monkedao.png",
  },
  {
    id: 3,
    name: "Solana ID",
    logo: "/partners/solanaid.png",
  },
];

function Partners() {
  return (
    <div className="w-full -mt-28 md:-mt-40">
      {/* Added this container with max-width to prevent overflow */}
      <div className="max-w-[90vw] mx-auto overflow-hidden">
        {/* Carousel track */}
        <div className="relative flex overflow-hidden">
          {/* First set */}
          <div className="flex animate-scroll">
            {PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="flex-shrink-0 mx-12 relative group"
              >
                <div className="relative w-36 h-20 sm:w-48 sm:h-24 opacity-70 hover:opacity-100 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate sets for seamless loop */}
          {[1, 2, 3].map((setIndex) => (
            <div key={setIndex} className="flex animate-scroll">
              {PARTNERS.map((partner) => (
                <div
                  key={`${partner.id}-${setIndex}`}
                  className="flex-shrink-0 mx-12 relative group"
                >
                  <div className="relative w-36 h-20 sm:w-48 sm:h-24 opacity-70 hover:opacity-100 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partners;
