import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import { useContext } from "react";
import arrowBlue from "./assets/arrowblue.svg";

const ManageTimetable = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);

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
        className=" absolute lg:left-[20%] px-6 top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Timetable
          </p>
        </span>

        <div className=" w-full md:items-end flex flex-wrap md:flex-row mt-6 justify-between">
          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Timetable
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">Subject Timetable</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Class
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">Jss1</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Session
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">2023/2024</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Term
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">1st Term</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <span className=" flex mt-6 md:mt-0 items-start">
            <button className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]">
              Edit Timetable
            </button>
          </span>
        </div>

        <div className="w-full mt-8 border border-[#EAEBF0] rounded-[10px] overflow-x-scroll">
          <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
            <thead>
              <tr>
                <th className=" bg-[#BADAFE]"></th> {/* Empty corner cell */}
                {daysOfWeek.map((day, index) => (
                  <th
                    key={index}
                    className="border-b px-4 py-2 md:py-6 bg-[#BADAFE] text-black border-[#EAEBF0] font-semibold text-xs font-Outfit text-center"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, index) => (
                <tr key={index}>
                  <td className="border-y border-r border-[#EAEBF0] p-3 md:p-6 text-xs text-black bg-[#BADAFE] font-semibold font-Outfit text-center">
                    {timeSlot}
                  </td>
                  {daysOfWeek.map((day, dayIndex) => (
                    <td
                      key={`${index}-${dayIndex}`}
                      className="border-y border-[#EAEBF0] px-2 text-xs font-normal font-Outfit text-center"
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
    </>
  );
};

export default ManageTimetable;
