import { useContext, useEffect, useState } from "react";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import {
  handleGetSchoolSessionEvents,
  handleGetSessionByID,
} from "../../controllers/schoolControllers/sessionController";
import arrowBlue from "./assets/arrowblue.svg";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import DateRenderCalendar from "./calendarSubComps/dateRenderCalendar";
// import Timeline from "./calendarSubComps/timeline";
import ListView from "./calendarSubComps/listView";
import AddEvents from "./calendarSubComps/addevent";

const ManageViewCalendar = () => {
  const { setSidebarVisible } = useContext(ManageSidebarContext);
  const { setActivePage } = useContext(ManageActivePageContext);
  const sessionID = localStorage.getItem("veclary_sessionID");
  const [session, setSession] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [addEvent, setAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  // Fetch session by ID and set the session data
  const fetchSessionByID = async () => {
    try {
      const data = await handleGetSessionByID(sessionID);
      if (data) {
        setSession(data);
        setTerms(data.terms);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionByID();
  }, [sessionID]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const data = await handleGetSchoolSessionEvents(sessionID);
      if (data) {
        setEvents(data);
      } else {
        // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [trigger]);

  console.log(events);
  return (
    <>
      {addEvent && (
        <AddEvents setAddEvent={setAddEvent} triggerFetch={triggerFetch} />
      )}
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        {/* Show loading skeleton if still loading */}
        {loading ? (
          <div className=" px-6 mt-6 w-full">
            <GenericLoadingSkeleton
              count={10}
              width="100%"
              height={30}
              className="mt-[6px]"
            />
          </div>
        ) : (
          <div className="px-6 w-full">
            <div className=" flex items-center w-full justify-between">
              <div
                onClick={() => handleClick("Calendar")}
                className=" cursor-pointer mt-6 flex flex-row items-center"
              >
                <img src={arrowBlue} alt="" />
                <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
                  Back
                </p>
                {session && (
                  <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
                    {session.session.name} Session
                  </p>
                )}
              </div>

              <div className=" flex items-center justify-center space-x-3 mt-6 ">
                <button
                  onClick={() => {
                    setAddEvent(true);
                  }}
                  className=" py-3 px-6 bg-[#F1F1F1] rounded-[10px] font-Outfit font-medium text-sm text-[#000]"
                >
                  Add New Event
                </button>
                <button className=" py-3 px-6 bg-[#0530A1] rounded-[10px] font-Outfit font-medium text-sm text-[#fff]">
                  Pause Session
                </button>
              </div>
            </div>

            <div className="mt-6  flex flex-row items-start justify-between">
              <div className=" w-[62%] p-6  border border-[#EAEBF0] rounded-[10px]">
                <span className=" border px-4 py-3 rounded-[5px]">
                  <select
                    name=""
                    className=" w-[230px] bg-white font-Outfit font-normal text-[15px] text-[#272D37]"
                    id=""
                  >
                    <option value="Calendar View">Calendar View</option>
                  </select>
                </span>

                <ListView terms={terms} />
              </div>
              <div className=" w-[35%]">
                <DateRenderCalendar
                  terms={terms}
                  className="w-full h-[300px]"
                />

                <div className=" border border-[#EAEBF0] py-5 px-6 mt-6 rounded-lg">
                  <p className=" font-Outfit font-semibold text-base text-black">
                    Upcoming Events
                  </p>

                  <div className=" mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageViewCalendar;
