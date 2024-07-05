import { useContext } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";

const TeacherSchedule = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(
    TeacherSidebarContext
  );
  const { activePage, setActivePage } = useContext(TeacherActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const timetableData = [
    { color: "#006531", time: "08:00", activity: "Morning Exercise" },
    { color: "#006531", time: "09:00", activity: "Morning Exercise" },
    { color: "", time: "10:00", activity: "" },
    { color: "#1C6DF6", time: "11:00", activity: "Science Class" },
    { color: "#1C6DF6", time: "12:00", activity: "Science Class" },
    { color: "#E84343", time: "13:00", activity: "History Class" },
    { color: "#E84343", time: "14:00", activity: "History Class" },
    // Add more activities as needed
  ];

  const upcoming = [
    {
      color: "#006531",
      time: "08:00AM - 10:00AM",
      activity: "Morning Exercise",
    },
    { color: "#1C6DF6", time: "11:00AM - 1:00PM", activity: "Science Class" },
    { color: "#cde34f", time: "11:00AM - 12:00PM", activity: "Assembly" },
    { color: "#E84343", time: "2:00PM - 3:00PM", activity: "History Class" },
    // Add more activities as needed
  ];

  return (
    <>
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
            Schedule
          </p>
        </span>

        <div className=" mt-6 w-full flex flex-col  px-6 lg:flex-row items-start justify-between">
          <div className=" w-full lg:w-[65%] p-6 border border-[#EAEBF0] rounded-[10px]">
            <div className=" w-full items-start flex flex-col md:flex-row  justify-between">
              <span className=" flex flex-col">
                <p className=" font-Outfit text-xl font-semibold text-[#000000]">
                  Upcoming Schedule
                </p>
                <p className=" font-Outfit text-xs font-normal text-[#000000B2]">
                  Manage your upcoming classes in just one page
                </p>
              </span>
              <button className=" text-center mt-6 md:mt-0 text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]">
                Add new Schedule
              </button>
            </div>
            <div className=" flex mt-3 w-full border-y border-[#9292921A]">
              <div className="w-16 border-r border-[#9292921A]">
                {timetableData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center h-16 border-b border-[#9292921A]"
                  >
                    <p className="text-center text-xs py-6 text-[#929292] font-Outfit font-normal">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex-1 w-full">
                {timetableData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: item.color
                        ? `${item.color}2a`
                        : "transparent",
                      borderColor: item.color ? `${item.color}` : "transparent",
                    }}
                    className={`flex ml-1 backdrop-opacity-60 items-center text-left w-full border-l-4 bg-[#0000002a] h-16 justify-center`}
                  >
                    <p className="text-left w-full text-xs ml-4 text-[#000] font-Outfit font-normal">
                      {item.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" w-full lg:w-[34%] md:mt-6 lg:mt-0 md:space-x-6 lg:space-x-0 lg:space-y-4 flex flex-col md:flex-row lg:flex-col">
            <div className=" w-full p-6 border border-[#EAEBF0] rounded-[10px]"></div>
            <div className=" w-full p-6 border border-[#EAEBF0] rounded-[10px]">
              <p className=" font-semibold text-base font-Outfit text-black">
                Upcoming Events
              </p>
              <div className=" space-y-3 lg:mt-3">
                {upcoming.map((item, index) => (
                  <div
                    key={index}
                    className=" w-full pl-1 py-2 bg-[#F8F8F8] rounded-[8px]"
                  >
                    <div
                      style={{ borderColor: item.color }}
                      className=" border-l-4"
                    >
                      <p className=" font-Outfit text-[8px] ml-2 font-normal text-black">
                        Event
                      </p>
                      <p className=" ml-2 font-medium mt-1 text-xs font-Outfit text-black">
                        {item.activity}
                      </p>
                      <p className=" ml-2 font-medium mt-1 text-[10px] font-Outfit text-black">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSchedule;
