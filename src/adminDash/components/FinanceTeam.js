import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";

import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";

const FinanceTeam = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const schData = [
    {
      addy: "SCI-20-0102",
      name: "Grand Rapids",
      mail: "veekdesign@gmail.com",
      doe: "20/02/1990",
    },
    {
      addy: "SCI-20-0103",
      name: "Grand Rapids",
      mail: "veekdesign@gmail.com",
      doe: "20/02/1990",
    },
    {
      addy: "SCI-20-0104",
      name: "Grand Rapids",
      mail: "veekdesign@gmail.com",
      doe: "20/02/1990",
    },
    {
      addy: "SCI-20-0105",
      name: "Grand Rapids",
      mail: "veekdesign@gmail.com",
      doe: "20/02/1990",
    },
    {
      addy: "SCI-20-0106",
      name: "Grand Rapids",
      mail: "veekdesign@gmail.com",
      doe: "20/02/1990",
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
          className="cursor-pointer mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Finance Team
          </p>
        </span>

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
                      Address
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Email
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date of Employment
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
                        {data.addy}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.mail}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.doe}
                      </td>

                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex space-x-3">
                        <button className=" py-2 px-3 rounded-[10px] bg-[#FFC317] text-[#FFFFFF] font-Outfit font-medium text-xs">
                          Suspend
                        </button>
                        <button className=" py-2 px-3 rounded-[10px] bg-[#E23D5A] text-[#FFFFFF] font-Outfit font-medium text-xs">
                          Fire
                        </button>
                        <button className=" py-2 px-3 rounded-[10px] bg-[#0530A1] text-[#FFFFFF] font-Outfit font-medium text-xs">
                          View Profile
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

export default FinanceTeam;
