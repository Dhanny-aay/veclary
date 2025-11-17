import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomCalendar = ({ terms = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredEvents, setHoveredEvents] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const calendarRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

  const eventTypes = {
    start: { label: "Term Start", icon: "🚀", priority: 1 },
    midTermStart: { label: "Midterm Start", icon: "📝", priority: 2 },
    midTermEnd: { label: "Midterm End", icon: "✅", priority: 3 },
    examStart: { label: "Exam Start", icon: "📚", priority: 4 },
    examEnd: { label: "Exam End", icon: "🎯", priority: 5 },
    end: { label: "Term End", icon: "🏁", priority: 6 },
  };

  useEffect(() => {
    const allEvents = terms.flatMap((term) => [
      {
        date: new Date(term.startDate),
        label: `${term.name} - Start`,
        type: "start",
        term: term.name,
      },
      {
        date: new Date(term.midTermStartDate),
        label: `${term.name} - Midterm Start`,
        type: "midTermStart",
        term: term.name,
      },
      {
        date: new Date(term.midTermEndDate),
        label: `${term.name} - Midterm End`,
        type: "midTermEnd",
        term: term.name,
      },
      {
        date: new Date(term.examStartDate),
        label: `${term.name} - Exam Start`,
        type: "examStart",
        term: term.name,
      },
      {
        date: new Date(term.examEndDate),
        label: `${term.name} - Exam End`,
        type: "examEnd",
        term: term.name,
      },
      {
        date: new Date(term.endDate),
        label: `${term.name} - End`,
        type: "end",
        term: term.name,
      },
    ]);

    setEvents(allEvents);
  }, [terms]);

  const getEventsForDate = (date) => {
    return events.filter(
      (event) => date.toDateString() === event.date.toDateString()
    );
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startingDayOfWeek = firstDay.getDay();
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const days = [];

    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthDays - i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      days.push({ date: currentDay, isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const handleMouseEnter = (date, event) => {
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      setTooltipPosition({
        x: rect.left + rect.width / 2 - calendarRect.left,
        y: rect.top - calendarRect.top,
      });

      setHoveredDate(date);
      setHoveredEvents(dateEvents);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
    setHoveredEvents([]);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div ref={calendarRef} className="relative font-Outfit">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full max-w-md mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>

          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekdays.map((day) => (
              <div
                key={day}
                className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const hasEvents = dayEvents.length > 0;

              return (
                <div
                  key={index}
                  onMouseEnter={(e) => handleMouseEnter(day.date, e)}
                  onMouseLeave={handleMouseLeave}
                  className={`
                    relative h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center text-xs sm:text-sm cursor-pointer transition-all duration-200
                    ${
                      day.isCurrentMonth
                        ? hasEvents
                          ? "text-white rounded-full font-medium"
                          : "text-gray-900 hover:bg-gray-100 rounded-full"
                        : "text-gray-400"
                    }
                    ${
                      isToday(day.date) && !hasEvents
                        ? "bg-gray-100 rounded-full"
                        : ""
                    }
                  `}
                  style={
                    hasEvents && day.isCurrentMonth
                      ? { backgroundColor: "#0530A1" }
                      : {}
                  }
                  onMouseOver={
                    hasEvents
                      ? (e) =>
                          (e.currentTarget.style.backgroundColor = "#041f7a")
                      : undefined
                  }
                  onMouseOut={
                    hasEvents
                      ? (e) =>
                          (e.currentTarget.style.backgroundColor = "#0530A1")
                      : undefined
                  }
                >
                  {day.date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {hoveredDate && hoveredEvents.length > 0 && (
        <div
          className="absolute z-50 bg-white border border-gray-200 rounded-lg  p-3 sm:p-4 w-56 sm:w-64"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 10}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="text-xs sm:text-sm font-semibold text-gray-800 mb-2">
            {hoveredDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="space-y-2">
            {hoveredEvents
              .sort(
                (a, b) =>
                  eventTypes[a.type].priority - eventTypes[b.type].priority
              )
              .map((event, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <span className="text-sm sm:text-base">
                    {eventTypes[event.type].icon}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {event.term}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {eventTypes[event.type].label}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
