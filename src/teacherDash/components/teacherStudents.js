import { useContext } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";

const TeacherStudents = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(
    TeacherSidebarContext
  );
  const { activePage, setActivePage } = useContext(TeacherActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const testData = [
    {
      regNo: "SCI-20-0102",
      name: "Grand Rapids",
      dob: "20/02/1990",
      rate1: "70%",
      rate2: "80%",
    },
    {
      regNo: "SCI-20-0103",
      name: "Bell Gardens",
      dob: "20/02/1990",
      rate1: "70%",
      rate2: "80%",
    },
    {
      regNo: "SCI-20-0104",
      name: "Broomfield",
      dob: "20/02/1990",
      rate1: "70%",
      rate2: "80%",
    },
    {
      regNo: "SCI-20-0105",
      name: "Springfield",
      dob: "20/02/1990",
      rate1: "70%",
      rate2: "80%",
    },
    {
      regNo: "SCI-20-0106",
      name: "Kalamazoo",
      dob: "20/02/1990",
      rate1: "70%",
      rate2: "80%",
    },
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
            Students
          </p>
        </span>

        <div className=" w-full items-start flex flex-col md:flex-row px-6 mt-6 justify-between">
          <span className=" flex items-start space-x-6">
            <label
              htmlFor="Class Teacher"
              className=" font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Test
              <input
                type="text"
                value={"Biology"}
                className=" mt-2 text-[#272D37] text-sm w-[120px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              />
            </label>
            <label
              htmlFor="Class Teacher"
              className=" font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Choose exam subject
              <input
                type="text"
                value={"Biology"}
                className=" mt-2 text-[#272D37] text-sm w-[120px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              />
            </label>
          </span>

          <span className=" flex items-start mt-8 md:mt-0 space-x-6">
            <button className=" text-center  text-sm font-Outfit font-medium text-black bg-[#F8F8F8] py-2 px-3 md:px-6 rounded-[10px]">
              Compute Result
            </button>
            <button
              onClick={() => {
                handleClick("Attendance");
              }}
              className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Mark Attendance
            </button>
          </span>
        </div>

        <div className=" mt-6 px-6">
          <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className=" w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Student Names
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Registration Number
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date of Birth
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Academic Rating
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Attendance Rating
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {testData.map((data, index) => (
                    <tr key={index}>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                        0{index + 1}
                      </td>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.name}
                      </td>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.regNo}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.dob}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.rate1}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.rate2}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        <img src={edit} alt="" />
                      </td>
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

export default TeacherStudents;
