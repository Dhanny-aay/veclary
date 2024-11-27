import { useEffect, useState } from "react";
import LoadingTable from "../../../utils/loadingTable";

const ListView = ({ terms }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Helper function to determine the status of an event
  function getStatus(eventDate) {
    const now = new Date();
    const event = new Date(eventDate);

    if (event < now) {
      return "ended";
    } else if (event.toDateString() === now.toDateString()) {
      return "ongoing";
    } else {
      return "upcoming";
    }
  }

  useEffect(() => {
    const allEvents = terms.flatMap((term) => [
      {
        name: term.name,
        date: term.startDate,
        label: `Start Date`,
        eventType: "start", // Adding an event type for categorization
        status: getStatus(term.startDate),
      },
      {
        name: term.name,
        date: term.midTermStartDate,
        label: `Mid Term Start`,
        eventType: "midTermStart",
        status: getStatus(term.midTermStartDate),
      },
      {
        name: term.name,
        date: term.midTermEndDate,
        label: `Mid Term End`,
        eventType: "midTermEnd",
        status: getStatus(term.midTermEndDate),
      },
      {
        name: term.name,
        date: term.examStartDate,
        label: `Exam Start`,
        eventType: "examStart",
        status: getStatus(term.examStartDate),
      },
      {
        name: term.name,
        date: term.examEndDate,
        label: `Exam End`,
        eventType: "examEnd",
        status: getStatus(term.examEndDate),
      },
      {
        name: term.name,
        date: term.endDate,
        label: `End Date`,
        eventType: "end",
        status: getStatus(term.endDate),
      },
    ]);
    setEvents(allEvents);
    setLoading(false);
  }, [terms]);

  console.log(events);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-[#17BD8D1A] text-[#17BD8D]";
      case "CURRENT":
        return "bg-[#17BD8D1A] text-[#17BD8D]";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "ended":
        return "bg-[#FF4E3E1A] text-[#FF4E3E]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  // Get the items to display for the current page
  const paginatedEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle pagination navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };

    // Get the day and determine the appropriate suffix
    const day = date.getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    // Format the date
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(/\d+/, day + daySuffix);

    return formattedDate;
  };

  return (
    <>
      <div className=" w-full mt-6 border border-[#EAEBF0] px-3 rounded-[10px]">
        <div className=" w-full overflow-x-auto">
          <table className="min-w-full px-3 ">
            <thead>
              <tr className="">
                <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                  S/N
                </th>
                <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                  Date
                </th>
                <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                  Term
                </th>
                <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                  Event
                </th>
                <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                  Status
                </th>

                <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Show loading spinner while fetching data
                <tr>
                  <td colSpan="6">
                    <LoadingTable rows={6} columns={6} />
                  </td>
                </tr>
              ) : paginatedEvents.length === 0 ? (
                // Show "No events found" message

                <tr className=" w-full">
                  <td
                    colSpan="6"
                    className="px-4 py-3 text-center font-Outfit text-[#667085] text-sm w-full"
                  >
                    There are no events yet.
                  </td>
                </tr>
              ) : (
                paginatedEvents.map((item, index) => (
                  <tr key={item._id} className="text-center">
                    <td className="px-4 py-2 border-b font-Outfit text-sm text-[#5F6D7E] font-normal text-center">
                      0{index + 1}
                    </td>
                    <td className="px-4 py-2 border-b text-[#272D37] font-normal text-sm font-Outfit">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-4 py-2 capitalize border-b text-[#272D37] font-normal text-sm font-Outfit">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 border-b text-[#272D37] font-normal text-sm font-Outfit">
                      {item.label}
                    </td>
                    <td
                      className={`px-4 py-2 border-b font-normal text-sm font-Outfit `}
                    >
                      <button
                        className={`rounded-[20px] capitalize py-2 px-[10px] ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </button>
                    </td>

                    <td className="px-4 py-2 border-b text-[#272D37] font-normal text-sm font-Outfit">
                      <p
                        // onClick={() => handleClick("viewCalendar", item._id)}
                        className="text-[#0530A1] cursor-pointer"
                      >
                        View
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between py-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#0530A1] rounded-[10px] text-xs font-Outfit text-white"
          >
            Previous
          </button>
          <span className="text-sm font-Outfit text-[#5F6D7E]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#0530A1] rounded-[10px] text-xs font-Outfit text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ListView;
