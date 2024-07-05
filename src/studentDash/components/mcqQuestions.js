import { useContext, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";

const McqQuestions = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <div
        div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <span
          onClick={() => handleClick("Assignment")}
          className=" cursor-pointer w-full flex flex-row px-6 pt-6 items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Assignments
          </p>
        </span>

        <div className=" w-full relative px-6 mt-4">
          <div className=" h-3 w-full rounded-[20px] bg-[#F5F5F5]"></div>
          <button className=" p-1 bg-black rounded-[20px] font-Outfit text-[10px] font-normal text-white absolute -top-1 left-6">
            0/24
          </button>
        </div>

        <div className=" w-full px-[8%] mt-6">
          <p className=" text-center font-Outfit text-[#121212] font-medium text-2xl mt-12">
            Enter assignment instructions or questions should
            <br /> you follow
          </p>
          <div className=" mt-16 grid grid-cols-2 gap-6">
            <label htmlFor="" className=" flex flex-col w-full">
              <p className=" font-Outfit text-base font-medium text-[#272D37]">
                Option A
              </p>
              <input
                type="text"
                className=" w-full mt-2 py-3 px-5 border border-[#DAE0E6] rounded-[7px] font-Outfit text-sm"
                placeholder="Enter Option A"
              />
            </label>
            <label htmlFor="" className=" flex flex-col w-full">
              <p className=" font-Outfit text-base font-medium text-[#272D37]">
                Option B
              </p>
              <input
                type="text"
                className=" w-full mt-2 py-3 px-5 border border-[#DAE0E6] rounded-[7px] font-Outfit text-sm"
                placeholder="Enter Option B"
              />
            </label>
            <label htmlFor="" className=" flex flex-col w-full">
              <p className=" font-Outfit text-base font-medium text-[#272D37]">
                Option C
              </p>
              <input
                type="text"
                className=" w-full mt-2 py-3 px-5 border border-[#DAE0E6] rounded-[7px] font-Outfit text-sm"
                placeholder="Enter Option C"
              />
            </label>
            <label htmlFor="" className=" flex flex-col w-full">
              <p className=" font-Outfit text-base font-medium text-[#272D37]">
                Option D
              </p>
              <input
                type="text"
                className=" w-full mt-2 py-3 px-5 border border-[#DAE0E6] rounded-[7px] font-Outfit text-sm"
                placeholder="Enter Option D"
              />
            </label>
          </div>
        </div>
        <div className=" mt-8 w-full flex items-center justify-between px-6">
          <button className=" mt-16 px-12 py-4 bg-[#F5F5F5] rounded-[10px] text-center text-[#121212] font-Outfit font-medium text-base">
            Previous
          </button>
          <button className=" mt-16 px-12 py-4 bg-[#0530A1] rounded-[10px] text-center text-white font-Outfit font-medium text-base">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default McqQuestions;
