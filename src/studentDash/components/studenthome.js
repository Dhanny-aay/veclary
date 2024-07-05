import book from "./assets/book.svg";
import close from "./assets/close.svg";
import pbar from "./assets/pbar.svg";
import mts from "./assets/mts.svg";
import bio from "./assets/bio.svg";
import chem from "./assets/chem.svg";
import nonoti from "./assets/nonoti.svg";
import avatars from "./assets/avatars.svg";
import plus from "./assets/plus.svg";
import file from "./assets/file.svg";
import download from "./assets/download.svg";
import { useContext } from "react";
import { SidebarContext } from "../contexts/ActivePageContext";

const StudentHome = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);

  const streak = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
  ];

  const subjects = [
    {
      name: "Mathematics",
      cta: "Continues from Chapter 5 ",
      progress: pbar,
      img: mts,
    },
    {
      name: "Biology",
      cta: "Continues from Chapter 5 ",
      progress: pbar,
      img: bio,
    },
    {
      name: "Chemistry",
      cta: "Continues from Chapter 5 ",
      progress: pbar,
      img: chem,
    },
  ];

  const resource = [
    { name: "Veclary Resources", size: "80.69 mb" },
    { name: "Veclary Updates", size: "320.69 mb" },
    { name: "Veclary Guides", size: "100.69 mb" },
    { name: "Veclary Guides", size: "100.69 mb" },
  ];

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <div className="flex flex-row md:items-center space-x-4 md:space-x-3">
          <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
          <span className=" flex flex-col">
            <p className="font-Outfit font-medium text-xl md:text-3xl">
              Welcome back, Veek!
            </p>
            <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
              Take the first steps to improve your Education.
            </p>
          </span>
        </div>
        <div className=" border-y border-[#EAEBF0] py-3 mt-6 grid grid-cols-4 gap-6 md:grid-cols-7">
          {streak.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col items-center space-y-2 text-center"
            >
              <input
                type="checkbox"
                name={item.day}
                className=" rounded-[50%]"
                id={item.day}
              />
              <p className=" text-center font-Outfit text-[#A1A1A1] text-xs">
                {item.day}
              </p>
            </div>
          ))}
        </div>
        <div className=" w-full py-4 flex justify-between items-center px-6 bg-[#F8F8F8] rounded-[20px] mt-6 relative">
          <img src={close} className=" absolute top-4 right-5" alt="" />
          <span className="">
            <p className=" font-Outfit text-base font-medium">
              Start your learning streak
            </p>
            <p className=" font-Outfit text-[#000000B2] text-xs font-normal">
              Complete any lesson, assessment or challenge to start a streak.
            </p>
            <button className=" bg-[#0530A1] px-2 py-1 rounded-[5px] shadow font-medium text-xs font-Outfit text-center text-white mt-3">
              Get started
            </button>
          </span>
          <img src={book} className=" w-[70px]" alt="" />
        </div>

        <div className=" mt-6 w-full">
          <p className=" font-Outfit text-xl font-semibold">My Subjects</p>
          <div className=" w-full mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {subjects.map((item, index) => (
              <div
                key={index}
                className=" w-full bg-[#F8F8F8] rounded-[10px] flex flex-row justify-between items-center p-3"
              >
                <div className=" w-[65%]">
                  <p className=" font-Outfit text-base font-semibold">
                    {item.name}
                  </p>
                  <p className=" font-Outfit text-[8px] font-normal text-[#000000B2]">
                    {item.cta}
                  </p>
                  <span className=" flex flex-row space-x-1">
                    <img src={item.progress} alt="" />
                    <p className=" font-Outfit text-[8px] text-[#272D37] font-medium">
                      50%
                    </p>
                  </span>
                </div>
                <div className=" w-[25%] bg-[#C9E4FC] flex items-center justify-center rounded-[6px] h-full">
                  <img src={item.img} className=" w-10 h-10" alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" w-full mt-6 flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0">
          <div className="  w-full lg:w-[38%] rounded-[10px] lg:h-[320px] p-6 bg-[#F8F8F8]">
            <p className=" font-Outfit text-xl font-semibold">
              Popular Resources
            </p>
            <div className=" flex flex-col space-y-3 mt-4">
              {resource.map((item, index) => (
                <div
                  key={index}
                  className=" w-full bg-white rounded-[10px] p-3 flex flex-row items-center justify-between"
                >
                  <div className=" flex flex-row space-x-3">
                    <img src={file} alt="" />
                    <div className="">
                      <p className=" font-Outfit font-medium text-[#272D37] text-xs">
                        {item.name}
                      </p>
                      <p className=" font-Outfit text-[8px] text-[#5F6D7E]">
                        {item.size}
                      </p>
                    </div>
                  </div>
                  <img src={download} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="  w-full lg:w-[30%] rounded-[10px] flex flex-col justify-center items-center lg:h-[320px] p-6 bg-[#F8F8F8]">
            <p className=" font-Outfit text-xl text-center font-semibold">
              Class Announcements
            </p>
            <img src={nonoti} className=" mt-7" alt="" />
            <p className=" font-Outfit text-center font-medium mt-3 text-base">
              No Announcements
            </p>
            <p className=" font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
              When you have an announcement you’ll see them here
            </p>
          </div>

          <div className="  w-full md:w-[30%] rounded-[10px] lg:block flex flex-col justify-center items-center lg:h-[320px] p-6 bg-[#F8F8F8]">
            <p className=" font-Outfit text-xl font-semibold">
              Join your class
            </p>
            <p className=" text-[64px] font-semibold">SS2</p>
            <div className=" w-full space-x-6 lg:space-x-0 justify-center lg:justify-between flex items-center mt-6">
              <img src={avatars} alt="" />
              <span className=" w-[42px] h-[42px] rounded-[50%] border-dashed flex justify-center items-center border border-[#DAE0E6]">
                <img src={plus} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
