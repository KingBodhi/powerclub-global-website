import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-25T00:00:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full pt-28 overflow-hidden z-0">
      {/* Background Image with Fade to Black */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/featured-event/bg.avif)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-cyan-900/30 to-purple-900/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Content Container */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-white p-4 md:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src="/featured-event/astronauts.png"
          alt="Astronauts"
          className="absolute -bottom-10 md:-bottom-20 right-0 w-[20rem] md:w-[35rem] lg:w-[50rem] z-0"
          variants={floatAnimation}
          animate="animate"
        />

        {/* Event Title */}
        <motion.div className="mb-8 w-full md:w-auto" variants={itemVariants}>
          <img
            src="/featured-event/supermoon-heading.avif"
            alt="Supermoon Event"
            className="max-w-[280px] md:max-w-md mx-auto"
          />
        </motion.div>

        {/* Event Details */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 text-cyan-200 bg-black/50 p-4 rounded-lg text-sm md:text-base w-full md:w-auto"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 justify-center">
            <Calendar className="w-5 h-5" />
            <span>March 25, 2025</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <MapPin className="w-5 h-5" />
            <span>ETHDenver, Colorado</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Clock className="w-5 h-5" />
            <span>18:00 MST</span>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          className="grid grid-cols-4 gap-2 md:gap-8 text-center relative"
          variants={itemVariants}
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-5xl font-bold bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 min-w-16 md:min-w-24">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-2 text-cyan-200 font-medium uppercase tracking-wider text-xs md:text-base">
                  {item.label}
                </div>
              </div>
              {index < 3 && (
                <>
                  <div
                    className="absolute text-cyan-200 text-2xl md:text-5xl font-bold"
                    style={{
                      left: `${(index + 1) * 25 - 2}%`,
                      top: "50%",
                      transform: "translate(-50%, -100%)",
                    }}
                  ></div>
                </>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="https://lu.ma/supermoonethdenver"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          className="mt-12 px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full
                     text-white font-semibold uppercase tracking-wider text-sm md:text-base
                     hover:from-purple-500 hover:to-cyan-500 transition-colors
                     shadow-lg shadow-purple-900/50 z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Your Spot
        </motion.a>
      </motion.div>
    </div>
  );
};

export default CountdownBanner;
