import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";

const SchoolApprovalsPC = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [activeButton, setActiveButton] = useState("Pending");

  const handleClick = (page) => {
    setActivePage(page);
  };

  const buttons = [
    {
      label: "Pending Registrations",
      value: "PendingRegistration",
    },
    {
      label: "Pending Approvals",
      value: "Pending",
    },
    {
      label: "Completed Approvals",
      value: "Completed",
    },
  ];

  const handleButtonClick = (value) => {
    setActiveButton(value);
    // Add logic for button click action here
  };

  const schData = [
    {
      regNo: "SCI-20-0102",
      school: "Federal Girls College",
      status: "Pending",
      noOfDoc: "20",
    },
    {
      regNo: "SCI-20-0103",
      school: "Federal Girls College",
      status: "completed",
      noOfDoc: "20",
    },
    {
      regNo: "SCI-20-0104",
      school: "Federal Girls College",
      status: "Pending",
      noOfDoc: "20",
    },
    {
      regNo: "SCI-20-0105",
      school: "Federal Girls College",
      status: "completed",
      noOfDoc: "25",
    },
    {
      regNo: "SCI-20-0106",
      school: "Federal Girls College",
      status: "Pending",
      noOfDoc: "25",
    },
  ];

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            School Approvals
          </p>
        </span>

        <div className="w-full border-b mt-6 border-[#EAECF0] h-full">
          <div className="flex">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`font-medium font-Outfit text-sm pb-4 px-2 transition-all ${
                  activeButton === button.value
                    ? "border-b-2 border-[#0530A1] text-[#0530A1]"
                    : ""
                }`}
                onClick={() => handleButtonClick(button.value)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <span className="flex items-start mt-6">
          <label
            htmlFor="Class Teacher"
            className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
          >
            Filter
            <select className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
              <option value="">Sort by School</option>
            </select>
          </label>
        </span>

        <div className=" mt-6">
          <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className=" w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      School Names
                    </th>
                    <th className="border-b  invisible font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Number of Students
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Registration Number
                    </th>

                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Number of Uploaded Documents
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schData.map((data, index) => (
                    <tr key={index}>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                        0{index + 1}
                      </td>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.school}
                      </td>
                      <td className=" font-Outfit invisible py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.school}
                      </td>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.regNo}
                      </td>

                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.noOfDoc}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        <button
                          onClick={() => handleClick("SchoolProfilePC")}
                          className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]"
                        >
                          View Documents
                        </button>
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

export default SchoolApprovalsPC;
