import pie from "./assets/pie.svg";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import pload from "./assets/pload.svg";
import right from "./assets/right.svg";
import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import x from "./assets/x.svg";
import x1 from "./assets/x (1).svg";
import x2 from "./assets/x (2).svg";

const TitleOfficer = () => {
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const analysis = [
    {
      name: "Active Students",
      percentage: "3000",
      stat: "Weekly Stats",
      img: pie,
    },
    {
      name: "Active Teachers",
      percentage: "200",
      stat: "Weekly Stats",
      img: pie,
    },
    {
      name: "Active School mgmt",
      percentage: "88%",
      stat: "Weekly Stats",
      img: pie,
    },
  ];

  return (
    <>
      <div className="flex border-b border-[#EAEBF0] pb-6 flex-row md:items-center space-x-4 md:space-x-3">
        <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
        <span className=" flex flex-col">
          <p className="font-Outfit font-medium text-xl text-black md:text-3xl">
            Welcome back, Title Officer!
          </p>
          <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
            Take the first steps to Get a clear view of customer interactions.
          </p>
        </span>
      </div>

      <div className=" mt-6">
        <p className=" font-Outfit text-lg font-semibold">Analysis</p>
        <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.map((item, index) => (
            <div
              key={index}
              className=" border border-[#EAEBF0] rounded-[10px] p-4"
            >
              <div className=" w-full flex flex-row justify-between mt-2 items-start">
                <div className=" w-[48%]">
                  <p className=" font-Outfit md:h-[48px] font-medium text-[#272D37] text-base">
                    {item.name}
                  </p>
                  <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                    {item.percentage}
                  </p>
                  <p className=" font-Outfit text-[#5F6D7E] text-sm mt-2 font-medium">
                    {item.stat}
                  </p>
                </div>
                <div className=" w-[48%] h-full flex items-start space-x-6">
                  <img src={item.img} className=" h-full w-[40%]" alt="" />
                  <div className=" ">
                    <span className=" flex flex-row items-center space-x-1">
                      <button className=" w-2 h-2 rounded-[50%] bg-[#0530A1]"></button>
                      <p className=" font-Outfit text-sm text-[#667085]">
                        Active
                      </p>
                    </span>
                    <span className=" flex flex-row items-center space-x-1">
                      <button className=" w-2 h-2 rounded-[50%] bg-[#E5EAFF]"></button>
                      <p className=" font-Outfit text-sm text-[#667085]">
                        UnActive
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-6 p-6 border border-[#EAEBF0] rounded-[15px]">
        <p className=" font-Outfit text-xl text-black font-semibold">
          Book Upload
        </p>
        <div className=" w-full mt-6 flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-start">
          <div className=" w-full md:w-[64%] flex flex-col">
            <div className=" flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
              <label
                htmlFor=""
                className=" w-full md:w-[49%] flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
              >
                Book Title
                <input
                  type="text"
                  className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
                />
              </label>
              <label
                htmlFor=""
                className=" w-full md:w-[49%] flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
              >
                Book ISBN
                <input
                  type="text"
                  className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
                />
              </label>
            </div>
            <label
              htmlFor=""
              className=" w-full mt-3 flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
            >
              Book Description
              <input
                type="text"
                className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
              />
            </label>
            <label
              htmlFor=""
              className=" w-full mt-3 flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
            >
              Add book label
              <input
                type="text"
                className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
              />
            </label>

            <span className=" flex flex-row items-center space-x-3 mt-3">
              <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#026AA2] bg-[#f0f9ff]">
                <p className="">Sci-Fi</p>
                <img src={x} alt="" />
              </button>
              <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#3538CD] bg-[#EEF4FF]">
                <p className="">Novel</p>
                <img src={x1} alt="" />
              </button>
              <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#C11574] bg-[#FDF2FA]">
                <p className="">Read Alone</p>
                <img src={x2} alt="" />
              </button>
            </span>
          </div>
          <div className=" w-full md:w-[34%] flex flex-col">
            <label
              htmlFor=""
              className=" w-full flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
            >
              Publisher/author’s name
              <input
                type="text"
                className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
              />
            </label>
            <div className=" mt-3 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
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
          </div>
        </div>
        <button className=" w-full  mt-6  py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]">
          <p className=" font-Outfit text-sm text-white font-medium">Upload</p>
        </button>
      </div>
    </>
  );
};

export default TitleOfficer;
