import { useContext, useEffect, useState } from "react";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import pie from "./assets/pie.svg";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import nofeed from "./assets/nofeed.svg";
import AddAnnouncement from "./addAnnouncement";
import Skeleton from "react-loading-skeleton";
import ChooseSubs from "./subjectSubComps/chooseSubsModal";
import SelectSubs from "./subjectSubComps/selectSubjects";
import AddSubject from "./subjectSubComps/addSubject";
import { handleGetSchoolAnnouncements } from "../../controllers/schoolControllers/annoucementController";
import { handleGetSchoolSubjects } from "../../controllers/schoolControllers/subjectController";
import {
  handleGetSchoolSessions,
  handleGetSchoolSessionEvents,
} from "../../controllers/schoolControllers/sessionController";

const ManageHome = ({ dashboard, loading }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [annouceID, setAnnounceID] = useState("");
  const [chooseSub, setChooseSub] = useState(true);
  const [selectSub, setSelectSub] = useState(false);
  const [addSubject, setAddSubject] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [triggerAnnouce, setTriggerAnnouce] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const analysis = [
    {
      name: "Active Students",
      percentage: "90%",
      stat: "Weekly Stats",
      img: pie,
    },
    {
      name: "Teachers Engagement",
      percentage: "88%",
      stat: "Weekly Stats",
      img: pie,
    },
  ];

  const triggerFetch = () => {
    setTrigger(!trigger);
  };
  const triggerFetchAnnounce = () => {
    setTriggerAnnouce(!triggerAnnouce);
  };

  const fetchAnnouncements = async () => {
    setLoadingAnnouncements(true);
    try {
      const data = await handleGetSchoolAnnouncements();
      if (data) {
        setAnnouncements(data);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [triggerAnnouce]);

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const data = await handleGetSchoolSubjects();
      if (data) {
        setSubjects(data[0]?.subjects || []);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    setLoadingEvents(true);
    try {
      const sessions = await handleGetSchoolSessions();
      let currentSessionId = null;

      if (Array.isArray(sessions) && sessions.length > 0) {
        const active = sessions.find(
          (s) => s.status === "Ongoing" || s.status === "CURRENT",
        );
        currentSessionId = active ? active._id : sessions[0]._id;
      }

      if (currentSessionId) {
        const eventsData = await handleGetSchoolSessionEvents(currentSessionId);

        if (Array.isArray(eventsData)) {
          // Filter out past events
          const now = new Date();
          // Reset time part of now for date comparison if needed, but simple comparison is fine
          now.setHours(0, 0, 0, 0);

          const futureEvents = eventsData.filter((event) => {
            const endDate = new Date(event.endDate);
            return endDate >= now; // Show if not yet ended
          });

          // Sort by start date
          futureEvents.sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate),
          );

          // Map colors
          const eventTypeColors = {
            term: "#2F52FF",
            "mid-term break": "#FFDA0B",
            exam: "#BD4917",
            event: "#006531",
          };

          const mappedEvents = futureEvents.map((event) => {
            const sDate = new Date(event.startDate);
            // Format date: "Mar 27"
            const dateStr = sDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            // If event has valid time (not 00:00), maybe append it?
            // Sample data shows T00:00:00, so assuming Date only mostly.

            return {
              color: eventTypeColors[event.type] || "#006531",
              time: dateStr,
              activity: event.name,
              status: event.status,
            };
          });

          setUpcomingEvents(mappedEvents);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchUpcomingEvents();
  }, [trigger]);

  // Current Date Formatter
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {makeAnnouncement && (
        <AddAnnouncement
          setMakeAnnouncement={setMakeAnnouncement}
          triggerFetchAnnounce={triggerFetchAnnounce}
        />
      )}

      {!loadingSubjects && subjects.length === 0 && chooseSub && (
        <ChooseSubs setChooseSub={setChooseSub} setSelectSub={setSelectSub} />
      )}

      {selectSub && (
        <SelectSubs
          setSelectSub={setSelectSub}
          setAddSubject={setAddSubject}
          triggerFetch={triggerFetch}
        />
      )}
      {addSubject && (
        <AddSubject setAddSubject={setAddSubject} triggerFetch={triggerFetch} />
      )}

      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <div className="flex flex-row md:items-center space-x-4 md:space-x-3">
          <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
          <span className=" flex flex-col">
            {loading ? (
              <Skeleton height={30} />
            ) : (
              dashboard && (
                <p className="font-Outfit font-medium text-xl md:text-3xl">
                  Welcome back,{" "}
                  <span className=" capitalize">
                    {dashboard.school.schoolName}!
                  </span>
                </p>
              )
            )}
            <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
              Take the first steps to improve your Education.
            </p>
          </span>
        </div>

        <div className=" mt-6">
          <p className=" font-Outfit text-lg font-semibold">
            Performance Analysis
          </p>
          <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysis.map((item, index) => (
              <div
                key={index}
                className=" border border-[#EAEBF0] rounded-[10px] p-4"
              >
                <div className=" w-full flex flex-row justify-between mt-2 items-center">
                  <div className=" w-[48%]">
                    <p className=" font-Outfit font-medium text-[#272D37] text-base">
                      {item.name}
                    </p>
                    <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                      {item.percentage}
                    </p>
                    <p className=" font-Outfit text-[#5F6D7E] text-sm mt-2 font-medium">
                      {item.stat}
                    </p>
                  </div>
                  <div className=" w-[48%] h-full flex items-start space-x-6">
                    <img src={item.img} className=" h-full w-[40%]" alt="" />
                    <div className=" ">
                      <span className=" flex flex-row items-center space-x-1">
                        <button className=" w-2 h-2 rounded-[50%] bg-[#0530A1]"></button>
                        <p className=" font-Outfit text-sm text-[#667085]">
                          Active
                        </p>
                      </span>
                      <span className=" flex flex-row items-center space-x-1">
                        <button className=" w-2 h-2 rounded-[50%] bg-[#E5EAFF]"></button>
                        <p className=" font-Outfit text-sm text-[#667085]">
                          UnActive
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
          <div className=" w-full lg:w-[29%] border border-[#EAEBF0] rounded-[10px] p-4 relative">
            <p className=" font-Outfit text-lg font-semibold">Announcements</p>
            <div className=" flex flex-col items-center">
              <img src={nonoti} className=" mt-7" alt="" />
              <p className=" font-Outfit text-center font-medium mt-3 text-base">
                No Announcements
              </p>
              <p className=" font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                When you have an announcement you’ll see them here
              </p>
              <div className=" w-full px-4 lg:absolute bottom-4">
                <button
                  onClick={() => {
                    setMakeAnnouncement(true);
                  }}
                  className=" w-full  mt-8 lg:mt-0 py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
                >
                  <img src={add} alt="" />
                  <p className=" font-Outfit text-sm text-white font-medium">
                    Make an Announcement
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className=" w-full lg:w-[39%] border border-[#EAEBF0] rounded-[10px] p-4">
            <div className=" flex flex-row justify-between items-start">
              <span className="">
                <p className=" font-Outfit text-lg font-semibold">
                  Upcoming Schedule
                </p>
                <p className=" font-Outfit text-[#000000B2] text-xs font-normal">
                  Today is {currentDate}
                </p>
              </span>
              <button
                onClick={() => {
                  handleClick("Home"); // Keeping consistent with user code view
                }}
                className=" rounded-[10px] bg-[#0530A1] px-3 py-1 text-white text-sm font-medium"
              >
                View all
              </button>
            </div>

            <div className="flex mt-3 w-full border-y border-[#9292921A] max-h-[300px] overflow-y-auto">
              <div className="w-16 border-r border-[#9292921A]">
                {loadingEvents ? (
                  <div className="h-10 flex items-center justify-center">
                    ...
                  </div>
                ) : upcomingEvents.length > 0 ? (
                  upcomingEvents.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center border-b border-[#9292921A] h-14"
                    >
                      <p className="text-center text-xs text-[#929292] font-Outfit font-normal">
                        {item.time}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="h-20 flex items-center justify-center"></div>
                )}
              </div>
              <div className="flex-1 w-full min-w-0">
                {loadingEvents ? (
                  <div className="h-10 flex items-center justify-center text-xs text-gray-400">
                    Loading events...
                  </div>
                ) : upcomingEvents.length > 0 ? (
                  upcomingEvents.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: item.color
                          ? `${item.color}2a`
                          : "transparent",
                        borderLeftColor: item.color
                          ? `${item.color}`
                          : "transparent",
                      }}
                      className={`flex ml-1 items-center text-left w-full border-l-4 justify-center h-14 border-b border-[#f0f0f0]`}
                    >
                      <p className="text-left flex-1 min-w-0 text-xs ml-4 text-[#000] font-Outfit font-medium capitalize truncate pr-2">
                        {item.activity}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="h-20 flex items-center justify-center text-sm text-gray-500 font-Outfit">
                    No upcoming events.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" w-full lg:w-[29%] border border-[#EAEBF0] rounded-[10px] p-4">
            <p className=" font-Outfit text-lg font-semibold">
              Students Feedbacks
            </p>
            <div className=" flex flex-col items-center">
              <img src={nofeed} className=" mt-7" alt="" />
              <p className=" font-Outfit text-center font-medium mt-3 text-base">
                No Feedbacks
              </p>
              <p className=" font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                When you have a feedback you’ll see them here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageHome;
