import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";

const PublisherFee = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const schData = [
    {
      id: "SCI-20-0102",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Pending",
    },
    {
      id: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Pending",
    },
    {
      id: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Pending",
    },
    {
      id: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Done",
    },
    {
      id: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Done",
    },
  ];

  const statusStyles = {
    Done: "text-[#2D8A39] bg-[#F0FAF0]",
    Pending: "text-[#E2341D] bg-[#FFF2F0]",
    default: "text-gray-600 bg-gray-100", // Default style for other statuses
  };

  const getStatusClass = (status) => {
    return statusStyles[status] || statusStyles.default;
  };

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
          className="cursor-pointer mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Publisher/Author’s Fee
          </p>
        </span>

        <label
          htmlFor="Class Teacher"
          className="font-Outfit flex flex-col text-[#272D37] mt-6 text-xs font-medium"
        >
          Filter
          <select className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
            <option value="">Sort by Paid</option>
          </select>
        </label>

        <div className="mt-6">
          <div className="border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Name
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Transaction ID
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Amount
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Status
                    </th>

                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {schData.map((data, index) => (
                    <tr key={index}>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                        0{index + 1}
                      </td>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.name}
                      </td>

                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.id}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.amount}
                      </td>
                      <td
                        className={`font-Outfit text-sm text-[#5F6D7E] py-4 border-t  border-[#EAEBF0] text-center`}
                      >
                        <p
                          className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px]  w-[67px] mx-auto py-[2px] ${getStatusClass(
                            data.status
                          )}`}
                        >
                          {data.status}
                        </p>
                      </td>

                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex ">
                        <button className=" py-2 px-3 rounded-[10px] bg-[#0530A1] text-[#FFFFFF] font-Outfit font-medium text-xs">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full py-3 px-3 flex justify-between items-center">
              <span className="flex space-x-1">
                <img src={backArr} alt="Previous" />
                <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Prev
                </p>
              </span>
              <span className="flex items-end space-x-4">
                <p className="font-Outfit text-sm text-[#0530A1]">1</p>
                <p className="font-Outfit text-sm">2</p>
                <p className="font-Outfit text-sm">...</p>
                <p className="font-Outfit text-sm">5</p>
                <p className="font-Outfit text-sm">6</p>
              </span>
              <span className="flex space-x-1">
                <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Next
                </p>
                <img src={fwdArr} alt="Next" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublisherFee;
