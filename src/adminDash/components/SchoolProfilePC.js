import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import file from "./assets/file.svg";
import arrowBlue from "./assets/arrowblue.svg";
import vido from "./assets/videoPlayer.svg";

const SchoolProfilePC = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const Uploaded = [
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
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
            School Profile
          </p>
        </span>

        <div className=" mt-8 flex items-start md:items-center md:flex-row flex-col space-y-3 md:space-y-0 justify-between">
          <div className=" flex items-center space-x-4">
            <span className=" w-[160px] h-[160px] rounded-[50%] bg-[#f8f8f8] border-4 border-white shadow shadow-[#10182814]"></span>
            <span>
              <p className=" font-medium text-3xl text-[#101828] font-Outfit">
                School Name
              </p>
              <p className=" font-normal text-sm font-Outfit text-[#667085]">
                schoolemail@gmail.com
              </p>
            </span>
          </div>

          <div className=" space-x-4 flex">
            <button className=" flex items-center space-x-2 px-4 py-2 bg-[#01813F] rounded-[8px]">
              <p className=" font-Outfit text-sm font-semibold text-[#fff]">
                Approve
              </p>
            </button>
            <button className=" flex items-center space-x-2 px-4 py-2 bg-[#E84343] rounded-[8px]">
              <p className=" font-Outfit text-sm font-semibold text-[#fff]">
                Deny
              </p>
            </button>
          </div>
        </div>

        <p className=" font-Outfit font-semibold text-xl text-black mt-6">
          School Documents
        </p>
        <div className=" w-full mt-2 border border-[#EAEBF0] rounded-[10px] px-4">
          {Uploaded.map((item, index) => (
            <div
              key={index}
              className=" py-3 flex flex-row justify-between items-center border-b border-[#EAEBF0]"
            >
              <div className=" flex space-x-4">
                <img src={file} alt="" />
                <span className=" flex flex-col">
                  <p className=" text-[#272D37] font-Outfit text-sm font-medium">
                    {item.name}
                  </p>
                  <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                    {item.size}
                  </p>
                </span>
              </div>
              <button className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]">
                View Document
              </button>
            </div>
          ))}
        </div>

        <div className=" w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" w-full">
            <p className=" text-black font-semibold font-Outfit text-base">
              Proof of Location
            </p>
            <div className=" mt-4 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col ">
              <img src={vido} alt="" />
            </div>
          </div>

          <div className=" w-full">
            <p className=" text-black font-semibold font-Outfit text-base">
              Report
            </p>
            <textarea
              name=""
              className=" w-full border border-[#DAE0E6] rounded-[6px] mt-4 h-[120px] px-4 py-3 font-Outfit text-[#919BA7] text-[15px] font-normal"
              placeholder="Enter report"
              value={
                " Report Report Report Report Report v Report Report Report v Report Report Report Report v Report  Report Report Report"
              }
              id=""
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolProfilePC;
