import React from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

const EventTicket = ({ name, dates, location, image }) => {
  return (
    <div className="relative flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:z-10">
      <div className="relative w-[400px] h-64">
        <Image
          src="/ticket.svg"
          alt="Ticket"
          fill
          className="rounded-lg shadow-xl"
        />
        <div className="absolute top-4 left-[0.9rem] w-[6.9rem] h-[9.5rem] overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="absolute top-3 left-[9rem] p-4">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            {name}
          </h1>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-white/80" />
            <p className="text-lg font-medium text-white/90">{dates}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-white/80" />
            <p className="text-xl font-semibold text-white/90">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
