import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";

const BookApprovalsPC = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [activeButton, setActiveButton] = useState("Pending");

  const handleClick = (page) => {
    setActivePage(page);
  };

  const buttons = [
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
      author: "Grand Rapids",
      title: "Understanding Chemistry",
      desc: "Understanding General Chemistry details the fundamentals of genera....",
    },
    {
      author: "Grand Rapids",
      title: "Understanding Chemistry",
      desc: "Understanding General Chemistry details the fundamentals of genera....",
    },
    {
      author: "Grand Rapids",
      title: "Understanding Chemistry",
      desc: "Understanding General Chemistry details the fundamentals of genera....",
    },
    {
      author: "Grand Rapids",
      title: "Understanding Chemistry",
      desc: "Understanding General Chemistry details the fundamentals of genera....",
    },
    {
      author: "Grand Rapids",
      title: "Understanding Chemistry",
      desc: "Understanding General Chemistry details the fundamentals of genera....",
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
            Book Approvals
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
              <option value="">Sort by Authors</option>
              <option value="">Sort by Publisher</option>
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
                      Author
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Book title
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Book description
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
                        {data.author}
                      </td>
                      <td className=" font-Outfit  py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.title}
                      </td>
                      <td className=" font-Outfit py-4 w-[200px] border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.desc}
                      </td>

                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        <button
                          onClick={() => handleClick("BookDetailsPC")}
                          className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]"
                        >
                          View Details
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

export default BookApprovalsPC;
