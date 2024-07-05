import { useContext, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import cards from "./assets/Cards.svg";
import line from "./assets/Line 48.svg";
import translate from "./assets/translate.svg";
import checkCirc from "./assets/check-circle.svg";

const McqView = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);

  const handleClick = (page) => {
    setActivePage(page);
  };
  return (
    <>
      <div
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

        <div className=" w-full px-6 mt-16 flex justify-center items-center flex-col text-center">
          <p className=" text-[#929292] font-Outfit font-medium text-2xl">
            Assignments
          </p>
          <p className=" font-bold font-Outfit text-6xl text-[#121212]">
            English
          </p>
          <span className=" flex items-center space-x-2 mt-3">
            <img src={cards} alt="" />
            <p className=" font-Outfit text-[#929292] text-xl font-normal">
              25 Questions
            </p>
          </span>
          <span className=" flex items-center space-x-3 mt-6">
            <img src={line} alt="" />
            <p className=" font-Outfit text-2xl font-medium text-[#929292]">
              Before you start
            </p>
            <img src={line} alt="" />
          </span>
          <div className=" mt-6 space-x-16 flex items-start">
            <span className=" flex items-start space-x-3 w-[285px]">
              <img src={translate} alt="" />
              <p className=" font-Outfit text-[#929292] font-normal text-base -mt-1">
                Disable any automatic translators
              </p>
            </span>
            <span className=" flex items-start space-x-3 w-[285px]">
              <img src={checkCirc} alt="" />
              <p className=" font-Outfit text-[#929292] font-normal text-base text-left -mt-1">
                All work submitted must be your own
              </p>
            </span>
          </div>
          <button
            onClick={() => handleClick("McqQuestions")}
            className=" mt-16 px-12 py-4 bg-[#0530A1] rounded-[10px] text-center text-white font-Outfit font-medium text-base"
          >
            Start Now
          </button>
        </div>
      </div>
    </>
  );
};

export default McqView;
