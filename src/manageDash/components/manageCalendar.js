import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import { useContext, useEffect, useState } from "react";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import AddSession from "./addSession";
import { handleGetSchoolSessions } from "../../controllers/schoolControllers/sessionController";
import LoadingTable from "../../utils/loadingTable";

const ManageCalendar = ({ dashboard }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);
  const [addSession, setAddSession] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noSessions, setNoSessions] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  const fetchSessions = async () => {
    setLoading(true); // Start loading when fetching Sessions
    try {
      const data = await handleGetSchoolSessions();
      if (Array.isArray(data) && data.length === 0) {
        setNoSessions(true); // Set noSessions to true if no Sessions found
        setSessions([]); // Clear the Sessions array
      } else {
        setSessions(data); // Set the Sessions if data is available
        setNoSessions(false); // Reset noSessions if Sessions are found
      }
    } catch (error) {
      setNoSessions(true); // Set noSessions to true in case of error
    } finally {
      setLoading(false); // Stop loading when fetch is complete
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [trigger]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-[#17BD8D1A] text-[#17BD8D]";
      case "CURRENT":
        return "bg-[#17BD8D1A] text-[#17BD8D]";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Ended":
        return "bg-[#FF4E3E1A] text-[#FF4E3E]";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
      {addSession && (
        <AddSession
          triggerFetch={triggerFetch}
          setAddSession={setAddSession}
          dashboard={dashboard}
        />
      )}
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            School Calendar
          </p>
        </span>

        <div className=" w-full items-end flex flex-row px-6 mt-6 justify-between">
          <span className=""></span>

          <span className=" flex items-start">
            <button
              onClick={() => {
                setAddSession(true);
              }}
              className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Schedule New Session
            </button>
          </span>
        </div>

        <div className=" mt-6 px-6">
          <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className=" w-full overflow-x-auto">
              <table className="min-w-full px-3 ">
                <thead>
                  <tr className="">
                    <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                      S/N
                    </th>
                    <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                      Session
                    </th>
                    <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                      Status
                    </th>
                    <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                      Start Date
                    </th>
                    <th className="px-4 py-2 font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] border-b">
                      End Date
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
                  ) : noSessions ? (
                    // Show "No sessions found" message

                    <tr className=" w-full">
                      <td
                        colSpan="6"
                        className="px-4 py-3 text-center font-Outfit text-[#667085] text-sm w-full"
                      >
                        There are no sessions yet.
                      </td>
                    </tr>
                  ) : (
                    sessions.map((item, index) => (
                      <tr key={item._id} className="text-center">
                        <td className="px-4 py-2 border-b font-Outfit text-sm text-[#5F6D7E] font-medium text-center">
                          0{index + 1}
                        </td>
                        <td className="px-4 py-2 border-b text-[#272D37] font-medium text-sm font-Outfit">
                          {item.name}
                        </td>
                        <td
                          className={`px-4 py-2 border-b font-medium text-sm font-Outfit `}
                        >
                          <button
                            className={`rounded-[20px] capitalize py-2 px-[10px] ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td className="px-4 py-2 border-b text-[#272D37] font-medium text-sm font-Outfit">
                          {formatDate(item.startDate)}
                        </td>
                        <td className="px-4 py-2 border-b text-[#272D37] font-medium text-sm font-Outfit">
                          {formatDate(item.endDate)}
                        </td>
                        <td className="px-4 py-2 border-b text-[#272D37] font-medium text-sm font-Outfit">
                          <p href="#" className="text-[#0530A1] cursor-pointer">
                            View
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCalendar;
