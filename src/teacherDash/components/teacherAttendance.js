import { useContext } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";

const TeacherAttendance = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(
    TeacherSidebarContext
  );
  const { activePage, setActivePage } = useContext(TeacherActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const students = [
    "John Doryre",
    "Jane Doe",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
  ];

  const weeks = [
    "1st Week",
    "2nd Week",
    "3rd Week",
    "4th Week",
    "5th Week",
    "6th Week",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
            Attendance
          </p>
        </span>

        <div className=" w-full px-6 mt-6">
          <div className=" border border-[#EAEBF0] rounded-[10px] w-full">
            {/* table here */}
            <div className=" overflow-x-auto px-3">
              <table className="table-auto border-collapse font-Outfit text-[#5F6D7E]">
                <thead>
                  <tr>
                    <th className="border-b border-[#EAEBF0] px-4 py-2">S/N</th>
                    <th className="border-b border-[#EAEBF0] px-8 py-2">
                      Student Name
                    </th>
                    {weeks.map((week, index) => (
                      <th
                        key={index}
                        className="border-b border-[#EAEBF0] px-4 py-2"
                      >
                        {week}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, studentIndex) => (
                    <tr key={studentIndex}>
                      <td className="border-y border-[#EAEBF0] px-4 py-2">
                        {(studentIndex + 1).toString().padStart(3, "0")}
                      </td>
                      <td className="border-y border-[#EAEBF0] text-sm text-[#272D37] font-medium px-8 py-2">
                        <div className=" flex flex-row items-center space-x-3">
                          <span className=" w-10 h-10 rounded-md bg-[#f8f8f8]"></span>
                          <p className=" text-xs">{student}</p>
                        </div>
                      </td>
                      {weeks.map((week, weekIndex) => (
                        <td
                          key={weekIndex}
                          className="border-y border-[#EAEBF0] px-4 py-2"
                        >
                          <div className=" flex flex-row">
                            {days.map((day, dayIndex) => (
                              <label
                                key={dayIndex}
                                className=" flex flex-col items-center"
                              >
                                <span className=" ml-2 text-[#929292] text-xs">
                                  {day}
                                </span>
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-5 w-5 text-blue-600"
                                />
                              </label>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className=" w-full py-3 px-3 flex justify-between items-center">
              <span className=" flex space-x-1">
                <img src={backArr} alt="" />
                <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Prev
                </p>
              </span>
              <span className=" flex items-end space-x-4">
                <p className=" font-Outfit text-sm text-[#0530A1]">1</p>
                <p className=" font-Outfit text-sm">2</p>
                <p className=" font-Outfit text-sm">...</p>
                <p className=" font-Outfit text-sm">5</p>
                <p className=" font-Outfit text-sm">6</p>
              </span>
              <span className=" flex space-x-1">
                <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Next
                </p>
                <img src={fwdArr} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherAttendance;
