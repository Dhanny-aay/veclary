import arrowBlue from "./assets/arrowblue.svg";
import nonoti from "./assets/nonoti.svg";
import nofeed from "./assets/nofeed.svg";
import send from "./assets/send.svg";
import noreso from "./assets/noreso.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import { useContext } from "react";

const StudentClassroom = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  // Generate array of days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Generate array of time slots
  const timeSlots = [];
  for (let i = 8; i <= 16; i += 2) {
    timeSlots.push(`${i}:00 - ${i + 2}:00`);
  }

  // Sample subjects
  const subjects = [
    "Biology",
    "Physics",
    "Chemistry",
    "Mathematics",
    "History",
  ];

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="  absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer w-full flex flex-row p-6 items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Classroom
          </p>
        </span>

        <div className=" w-full items-start flex px-6 justify-between">
          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
          >
            Class Teacher
            <input
              type="text"
              value={"Mr Veek"}
              className=" mt-2 text-[#272D37] text-sm w-[120px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            />
          </label>
          <button
            onClick={() => handleClick("Assignment")}
            className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
          >
            Assignments
          </button>
        </div>

        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-8">
          <div className=" w-full p-4 border border-[#EAEBF0] rounded-[10px]">
            <p className=" font-Outfit text-lg font-semibold">
              Class Announcements
            </p>
            <div className=" w-full flex flex-col items-center justify-center">
              <img src={nonoti} className=" w-[20%] mt-4" alt="" />
              <p className=" font-Outfit text-center text-base font-semibold mt-2">
                No Announcement
              </p>
              <p className=" font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
                When you have an announcement you’ll see them here
              </p>
            </div>
          </div>
          <div className=" p-4 border border-[#EAEBF0] rounded-[10px]">
            <p className="font-Outfit text-lg font-semibold">Feedback</p>
            <div className="w-full flex flex-col items-center justify-center">
              <img src={nofeed} className=" w-[20%] mt-4" alt="" />
              <p className=" font-Outfit text-center text-base font-semibold mt-2">
                No Sent Feedback
              </p>
              <p className=" font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
                When you send a feedback to your teacher you’ll see them here
                with answers
              </p>
              <span className=" w-full flex items-center justify-between mt-2 rounded-[15px] bg-[#F5F5F5]">
                <input
                  type="text"
                  className=" w-full bg-transparent p-2.5 font-Outfit text-sm font-normal text-[#00000080]"
                  placeholder="Send a feedback......"
                  name=""
                  id=""
                />
                <img src={send} alt="" />
              </span>
            </div>
          </div>
          <div className=" w-full p-4 border border-[#EAEBF0] rounded-[10px]">
            <p className=" font-Outfit text-lg font-semibold">
              Class Resources
            </p>
            <div className=" w-full flex flex-col items-center h-full justify-center">
              <img src={noreso} className=" w-[20%] mt-4" alt="" />
              <p className=" font-Outfit text-center text-base font-semibold mt-2">
                No Available Resource
              </p>
              <p className=" font-normal text-xs font-Outfit text-[#9E9E9E] text-center md:w-[190px] mt-2">
                When you have any resource you’ll see them here
              </p>
            </div>
          </div>

          <div className="w-full border border-[#EAEBF0] rounded-[10px] overflow-x-scroll">
            <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full">
              <thead>
                <tr>
                  <th className=" bg-[#BADAFE]"></th> {/* Empty corner cell */}
                  {daysOfWeek.map((day, index) => (
                    <th
                      key={index}
                      className="border-b px-4 py-2 border-x bg-[#BADAFE] border-[#EAEBF0] font-medium text-xs font-Outfit text-center"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, index) => (
                  <tr key={index}>
                    <td className="border-y border-r border-[#EAEBF0] p-3 text-xs bg-[#BADAFE] font-medium font-Outfit text-center">
                      {timeSlot}
                    </td>
                    {daysOfWeek.map((day, dayIndex) => (
                      <td
                        key={`${index}-${dayIndex}`}
                        className="border border-[#EAEBF0] px-2 text-xs font-normal font-Outfit text-center"
                      >
                        {subjects[Math.floor(Math.random() * subjects.length)]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentClassroom;
