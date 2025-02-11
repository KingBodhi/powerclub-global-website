import React, { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: (Date | null)[] = [];

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateInHoverRange = (date: Date) => {
    if (!hoverDate || !startDate || endDate) return false;
    return (
      (date >= startDate && date <= hoverDate) ||
      (date <= startDate && date >= hoverDate)
    );
  };

  const handleDateClick = (date: Date) => {
    if (selecting === "start" || (startDate && date < startDate)) {
      onDateChange(date, null);
      setSelecting("end");
    } else {
      onDateChange(startDate, date);
      setSelecting("start");
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg 
                   bg-white/5 border border-white/10 text-white
                   hover:bg-white/10 hover:border-[#ae904c]/40 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#ae904c]" />
          <span>
            {startDate || endDate ? (
              <>
                {formatDate(startDate)} - {formatDate(endDate)}
              </>
            ) : (
              "Select dates"
            )}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 rounded-lg bg-black/95 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-white/10 rounded"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-white font-medium">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-white/10 rounded"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm text-white/60 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="h-8" />;
              }

              const isSelected =
                (startDate && date.getTime() === startDate.getTime()) ||
                (endDate && date.getTime() === endDate.getTime());
              const isInRange = isDateInRange(date) || isDateInHoverRange(date);

              return (
                <button
                  key={date.getTime()}
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-sm
                    transition-colors duration-200
                    ${isSelected ? "bg-[#ae904c] text-white" : ""}
                    ${
                      isInRange && !isSelected
                        ? "bg-[#ae904c]/20 text-white"
                        : ""
                    }
                    ${
                      !isSelected && !isInRange
                        ? "text-white hover:bg-white/10"
                        : ""
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                onDateChange(null, null);
                setSelecting("start");
              }}
              className="px-3 py-1 rounded text-sm text-white/60 hover:text-white"
            >
              Clear
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded bg-[#ae904c] text-white text-sm hover:bg-[#ae904c]/90"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
