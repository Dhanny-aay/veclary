import { useContext, useState } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import ass from "./assets/ass.svg";
import test from "./assets/test.svg";
import chart from "./assets/chart.svg";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import nofeed from "./assets/nofeed.svg";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import { DatePicker } from "rsuite";
import proBadge from "./assets/Pro_Badge.svg";

const TeacherHome = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(
    TeacherSidebarContext
  );
  const { activePage, setActivePage } = useContext(TeacherActivePageContext);
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const streak = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
  ];

  const performance = [
    { name: "Assignment", percentage: "90%", stat: "Weekly Stats", img: ass },
    { name: "Test", percentage: "88%", stat: "Per Test Stats", img: test },
    {
      name: "E-Book Completion",
      percentage: "70%",
      stat: "Weekly Stats",
      img: chart,
    },
  ];

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

  return (
    <>
      {makeAnnouncement && (
        <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
          <div className=" w-full h-full flex justify-center items-center">
            <div className="ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[400px]">
              <span className=" w-full flex items-center justify-between">
                <img src={announce} alt="" />
                <img
                  onClick={() => {
                    setMakeAnnouncement(false);
                  }}
                  src={close}
                  className=" w-4"
                  alt=""
                />
              </span>
              <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                Create an announcement
              </p>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Title
                <input
                  type="text"
                  name=""
                  placeholder="Enter title of announcement"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Body
                <textarea
                  type="text"
                  name=""
                  placeholder="Enter body of announcement"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>

              <div className=" w-full grid grid-cols-2 gap-4">
                <label
                  htmlFor=""
                  className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Select time
                  <DatePicker
                    className=" z-[99999] font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]"
                    id=""
                  />
                </label>
                <label
                  htmlFor=""
                  className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Select date
                  <DatePicker
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]"
                    id=""
                  />
                </label>
              </div>
              <div className=" w-full mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setMakeAnnouncement(false);
                  }}
                  className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                >
                  Cancel
                </button>
                <button className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <div className=" w-full flex items-center justify-between">
          <div className="flex flex-row md:items-center space-x-4 md:space-x-3">
            <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
            <span className=" flex flex-col">
              <p className="font-Outfit font-medium text-xl md:text-3xl">
                Welcome back, Mr Veek!
              </p>
              <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
                Take the first steps to improve your Education.
              </p>
            </span>
          </div>
          <button
            onClick={() => {
              handleClick("Assistant");
            }}
            className=" bg-[#0530A1] py-3 px-6 flex items-center space-x-[10px] rounded-[10px]"
          >
            <img src={proBadge} alt="" />
            <p className=" font-Outfit font-medium text-base text-white">
              Activate Class Assistant
            </p>
          </button>
        </div>
        <div className=" border-y border-[#EAEBF0] py-3 mt-6 grid grid-cols-4 gap-6 md:grid-cols-7">
          {streak.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col items-center space-y-2 text-center"
            >
              <input
                type="checkbox"
                name={item.day}
                className=" rounded-[50%]"
                id={item.day}
              />
              <p className=" text-center font-Outfit text-[#A1A1A1] text-xs">
                {item.day}
              </p>
            </div>
          ))}
        </div>

        <div className=" mt-6">
          <p className=" font-Outfit text-lg font-semibold">
            Performance Analysis
          </p>
          <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performance.map((item, index) => (
              <div
                key={index}
                className=" border border-[#EAEBF0] rounded-[10px] p-4"
              >
                <p className=" font-Outfit font-medium text-[#272D37] text-base">
                  {item.name}
                </p>
                <div className=" w-full flex flex-row justify-between mt-2 items-end">
                  <div className=" w-[40%]">
                    <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                      {item.percentage}
                    </p>
                    <p className=" font-Outfit text-[#5F6D7E] text-sm mt-2 font-medium">
                      {item.stat}
                    </p>
                  </div>
                  <div className=" w-[59%]">
                    <img src={item.img} className=" w-[100%] h-full" alt="" />
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
                  Today is Wednesday, March 27th, 2024
                </p>
              </span>
              <button
                onClick={() => {
                  handleClick("Schedule");
                }}
                className=" rounded-[10px] bg-[#0530A1] px-3 py-1 text-white text-sm font-medium"
              >
                View all
              </button>
            </div>
            <div className="flex mt-3 w-full border-y border-[#9292921A]">
              <div className="w-16 border-r border-[#9292921A]">
                {timetableData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center border-b border-[#9292921A] h-10"
                  >
                    <p className="text-center text-xs text-[#929292] font-Outfit font-normal">
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
                    className={`flex ml-1 backdrop-opacity-60 items-center text-left w-full border-l-4 bg-[#0000002a] justify-center h-10`}
                  >
                    <p className="text-left w-full text-xs ml-4 text-[#000] font-Outfit font-normal">
                      {item.activity}
                    </p>
                  </div>
                ))}
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

export default TeacherHome;
