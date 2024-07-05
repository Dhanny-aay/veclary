import add from "./assets/add.svg";
import chart from "./assets/chart.svg";
import nonoti from "./assets/nonoti.svg";
import chart1 from "./assets/chart1.svg";
import chart2 from "./assets/chart2.svg";
import pload from "./assets/pload.svg";
import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";

const SalesOfficer = () => {
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const performance = [
    {
      name: "E-Book Completion",
      percentage: "90%",
      stat: "Weekly Stats",
      img: chart,
    },
    {
      name: "Total Book Sold",
      percentage: "70",
      stat: "All Stats",
      img: chart1,
    },
    {
      name: "Total Book Sold",
      percentage: "70%",
      stat: "Weekly Growth",
      img: chart2,
    },
  ];

  return (
    <>
      <div className="flex border-b border-[#EAEBF0] pb-6 flex-row md:items-center space-x-4 md:space-x-3">
        <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
        <span className=" flex flex-col">
          <p className="font-Outfit font-medium text-xl text-black md:text-3xl">
            Welcome back, Sale Officer!
          </p>
          <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
            Take the first steps to Get a clear view of customer interactions.
          </p>
        </span>
      </div>

      <div className=" mt-6">
        <p className=" font-Outfit text-lg font-semibold">Analysis</p>
        <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {performance.map((item, index) => (
            <div
              key={index}
              className=" border border-[#EAEBF0] rounded-[10px] p-4"
            >
              <p className=" font-Outfit font-medium text-[#272D37] text-base">
                {item.name}
              </p>
              <div className=" w-full flex flex-row justify-between mt-2 items-end">
                <div className=" w-[40%]">
                  <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                    {item.percentage}
                  </p>
                  <p className=" font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                    {item.stat}
                  </p>
                </div>
                <div className=" w-[59%]">
                  <img src={item.img} className=" w-[100%] h-full" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* row 2 */}
      <div className=" mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
        <div className=" w-full lg:w-[34%] border border-[#EAEBF0] rounded-[10px] p-4 relative">
          <p className=" font-Outfit text-lg font-semibold">Announcements</p>
          <div className=" flex flex-col items-center">
            <img src={nonoti} className=" mt-7" alt="" />
            <p className=" font-Outfit text-center font-medium mt-3 text-base">
              No Announcements
            </p>
            <p className=" font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
              When you have an announcement you’ll see them here
            </p>
            <div className=" w-full px-4 lg:absolute bottom-4">
              <button
                onClick={() => {
                  setMakeAnnouncement(true);
                }}
                className=" w-full  mt-8 lg:mt-0 py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
              >
                <img src={add} alt="" />
                <p className=" font-Outfit text-sm text-white font-medium">
                  Make an Announcement
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className=" w-full lg:w-[64%] border border-[#EAEBF0] rounded-[10px] p-4">
          <div className=" w-full flex flex-row items-center justify-between">
            <p className=" font-Outfit text-xl font-semibold text-black">
              Onboarding Document
            </p>
            <button
              onClick={() => handleClick("onboardedCustomers")}
              className=" px-3 py-2 text-center text-sm font-Outfit text-white font-normal bg-[#0530A1] rounded-[7px]"
            >
              View all
            </button>
          </div>
          <div className=" w-full mt-6">
            <div className=" flex flex-row justify-between items-center">
              <label
                htmlFor=""
                className=" w-[49%] flex flex-col text-[#272d37] font-Outfit text-sm font-medium"
              >
                School Name
                <input
                  type="text"
                  className=" w-full h-[40px] p-2.5 border border-[#DAE0E6] rounded-[5px] mt-2"
                  name=""
                  id=""
                />
              </label>
              <label
                htmlFor=""
                className=" w-[49%] flex flex-col text-[#272d37] font-Outfit text-sm font-medium"
              >
                School Id
                <input
                  type="text"
                  className=" w-full h-[40px] p-2.5 border border-[#DAE0E6] rounded-[5px] mt-2"
                  name=""
                  id=""
                />
              </label>
            </div>
            <div className=" mt-6 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-3">
              <img src={pload} alt="" />
              <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                <span className=" font-semibold text-[#0530A1] mr-1">
                  Click to upload
                </span>
                or drag and drop
              </p>
              <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                 PDF, EPUB, or MOBI. (max. 200mb)
              </p>
            </div>
            <button className=" w-full  mt-6  py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]">
              <p className=" font-Outfit text-sm text-white font-medium">
                Upload
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesOfficer;
