import React, { useState } from "react";
import { Edit, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const UpcomingEvents = ({
  events = [],
  loadingEvents = false,
  onEditEvent,
  onDeleteEvent,
  onAddEvent,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const eventTypeColors = {
    term: "bg-[#2F52FF]",
    "mid-term break": "bg-[#FFDA0B]",
    exam: "bg-[#BD4917]",
    event: "bg-[#006531",
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const startFormatted = start.toLocaleDateString("en-GB", formatOptions);
    const endFormatted = end.toLocaleDateString("en-GB", formatOptions);

    return `${startFormatted} - ${endFormatted}`;
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter((event) => new Date(event.startDate) >= now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  const upcomingEvents = getUpcomingEvents();
  const totalPages = Math.ceil(upcomingEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = upcomingEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loadingEvents) {
    return (
      <div className="border border-[#EAEBF0] py-5 px-6 mt-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="font-Outfit font-semibold text-base text-black">
            Upcoming Events
          </p>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-1 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[#EAEBF0] py-5 px-4 sm:px-6 mt-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="font-Outfit font-semibold text-base text-black">
          Upcoming Events
        </p>
        {/* <button
          onClick={onAddEvent}
          className="text-[#0530A1] font-Outfit text-sm font-medium hover:text-[#041f7a] transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Event</span>
          <span className="sm:hidden">Add</span>
        </button> */}
      </div>

      {paginatedEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="font-Outfit">No upcoming events</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedEvents.map((event, index) => (
              <div
                key={startIndex + index}
                className="flex items-start space-x-4 group"
              >
                <div
                  className={`w-1 h-16 rounded-full ${
                    eventTypeColors[event.type] || "bg-gray-500"
                  }`}
                ></div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-Outfit text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {event.type === "mid-term break"
                          ? "MID-TERM BREAK"
                          : event.type === "exam"
                          ? "EXAM"
                          : event.type === "term"
                          ? "TERM"
                          : "EVENT"}
                      </p>
                      <h3 className="font-Outfit font-semibold text-sm sm:text-base text-gray-900 truncate">
                        {event.name}
                      </h3>
                      {event.subtitle && (
                        <p className="font-Outfit text-sm text-gray-600 mt-1">
                          {event.subtitle}
                        </p>
                      )}
                      <p className="font-Outfit text-xs sm:text-sm text-gray-500 mt-1">
                        {formatDateRange(event.startDate, event.endDate)}
                      </p>
                    </div>

                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                      <button
                        onClick={() => onEditEvent && onEditEvent(event)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteEvent && onDeleteEvent(event)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500 font-Outfit">
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, upcomingEvents.length)} of{" "}
                {upcomingEvents.length} events
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 text-sm font-Outfit rounded transition-colors ${
                          currentPage === page
                            ? "bg-[#0530A1] text-white"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
