import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DateRenderCalendar = ({ terms }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const allEvents = terms.flatMap((term) => [
      { date: new Date(term.startDate), label: `${term.name} - Start Date` },
      {
        date: new Date(term.midTermStartDate),
        label: `${term.name} - Mid Term Start`,
      },
      {
        date: new Date(term.midTermEndDate),
        label: `${term.name} - Mid Term End`,
      },
      {
        date: new Date(term.examStartDate),
        label: `${term.name} - Exam Start`,
      },
      { date: new Date(term.examEndDate), label: `${term.name} - Exam End` },
      { date: new Date(term.endDate), label: `${term.name} - End Date` },
    ]);

    setEvents(allEvents);
  }, [terms]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find(
        (event) => date.toDateString() === event.date.toDateString()
      );
      if (event) {
        return <div title={event.label} className="highlighted-date"></div>;
      }
    }
    return null;
  };

  return (
    <div className="calendar-container font-Outfit">
      <Calendar
        tileContent={tileContent}
        className="custom-calendar border font-Outfit rounded-lg"
        calendarType="gregory"
      />
    </div>
  );
};

export default DateRenderCalendar;
