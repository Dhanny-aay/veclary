import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Timeline = ({ terms }) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const allEvents = terms.flatMap((term) => [
      {
        date: new Date(term.startDate),
        label: `${term.name} - Start Date`,
      },
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
      {
        date: new Date(term.examEndDate),
        label: `${term.name} - Exam End`,
      },
      { date: new Date(term.endDate), label: `${term.name} - End Date` },
    ]);

    setEvents(allEvents);
  }, [terms]);

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 500 }}
        views={["month"]}
      />
    </>
  );
};

export default Timeline;
