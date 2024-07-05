import { useContext, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import recent from "./assets/recent.svg";
import casette from "./assets/CassetteTape.svg";
import stop from "./assets/Stop.svg";
import pause from "./assets/Pause.svg";
import save from "./assets/save.svg";
import ux from "./assets/UX_Writing.png";
import txt from "./assets/Text_Documet.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";

const StudentAssistant = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const { activePage, setActivePage } = useContext(ActivePageContext);

  const [downloadContainer, setDownloadContainer] = useState(false);

  const toggleDownloadContainer = () => {
    setDownloadContainer(!downloadContainer);
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  // Sample data for the tabs
  const recentNotes = [
    {
      name: "Rebecca",
      date: "May 12, 2024 | 12:00 PM",
      subject: "Chemistry",
      duration: "02:00",
    },
    {
      name: "Rebecca",
      date: "May 12, 2024 | 12:00 PM",
      subject: "Chemistry",
      duration: "02:00",
    },
    {
      name: "Rebecca",
      date: "May 12, 2024 | 12:00 PM",
      subject: "Chemistry",
      duration: "02:00",
    },
    {
      name: "Rebecca",
      date: "May 12, 2024 | 12:00 PM",
      subject: "Chemistry",
      duration: "02:00",
    },
    {
      name: "David",
      date: "May 12, 2024 | 12:00 PM",
      subject: "Chemistry",
      duration: "02:00",
    },
  ];
  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Class Assistant
          </p>
        </span>

        <div className=" w-full border-t border-[#EAEBF0] mt-6  flex flex-row">
          <div className=" w-[30%] h-svh border-r border-[#EAEBF0] overflow-y-auto pb-6">
            <div className="py-6 px-4 w-full">
              <span className=" flex items-center space-x-3">
                <img src={recent} alt="" />
                <p className=" font-Outfit font-semibold text-xl text-[#272D37]">
                  Recent
                </p>
              </span>
              <p className=" font-Outfit text-xs font-normal text-[#000000B2] mt-3">
                Each recording will be automatically deleted from Veclary after
                72hrs, you can download the recording and transcription to your
                device within that time.
              </p>
            </div>
            <div className=" grid grid-cols-1 w-full mt-3 gap-3">
              <div className=" p-4 bg-[#F5F5F5] space-y-[6px]">
                <p className=" text-[#272D37] font-Outfit font-semibold text-base">
                  Biology
                </p>
                <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                  Mr. Hilda
                </p>
                <span className=" w-full flex items-center justify-between">
                  <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                    May 12, 2024 | 12:00 PM
                  </p>
                  <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                    03:00
                  </p>
                </span>
              </div>
              {recentNotes.map((item, index) => (
                <div
                  key={index}
                  className=" p-4 border-b border-[#EAEBF0] space-y-[6px]"
                >
                  <p className=" text-[#272D37] font-Outfit font-semibold text-base">
                    {item.subject}
                  </p>
                  <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                    Mr. {item.name}
                  </p>
                  <span className=" w-full flex items-center justify-between">
                    <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                      {item.date}
                    </p>
                    <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                      {item.duration}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className=" w-[70%] h-full ">
            <div className=" w-full border-b p-6 border-[#EAEBF0] flex items-center justify-between">
              <p className=" font-Outfit font-medium text-xl text-[#272D37]">
                Chemistry
              </p>
              <p className=" font-Outfit font-medium text-base text-[#5F6D7E]">
                Mr. Hilda
              </p>
            </div>
            <div className=" w-full p-6">
              <div className=" border border-[#EAEBF0] rounded-[20px] p-6 h-[300px]">
                <p className=" font-Outfit font-medium text-xl text-[#000]">
                  Topic
                </p>
                <p className=" mt-2 font-Outfit font-medium text-sm text-[#000000B2]">
                  Chemical Equation
                </p>
                <p className=" font-Outfit font-medium mt-6 text-xl text-[#000]">
                  Transcribed Note
                </p>
                <p className=" mt-2 font-Outfit font-normal text-base text-[#000000B2]">
                  [Speaker Name]: Today, we'll be diving into [Topic of the
                  session]. We'll cover [brief mention of key points to be
                  discussed]. Stay focused and take notes – you can always
                  revisit this transcript later!" (Replace bracketed information
                  with specifics)
                </p>
              </div>

              <div className=" flex items-center w-full justify-center space-x-3 mt-8">
                <button className=" py-4 px-8 bg-[#F5F5F5] rounded-[50px] flex items-center space-x-3">
                  <img src={casette} alt="" />
                  <p className=" font-Outfit font-semibold text-xl text-black">
                    00:00:00
                  </p>
                </button>
                <button className=" py-4 px-8 bg-[#EA4335] rounded-[50px] ">
                  <img src={stop} alt="" />
                </button>
                <button className=" py-4 px-8 bg-[#F5F5F5] rounded-[50px] ">
                  <img src={pause} alt="" />
                </button>
                <button
                  onClick={toggleDownloadContainer}
                  className=" py-4 px-8 bg-[#F5F5F5] rounded-[50px] relative "
                >
                  <img src={save} alt="" />
                  {downloadContainer && (
                    <span className=" absolute w-[250px] py-3 border border-[#EAEBF0] rounded-[10px] right-0 -top-28 bg-white space-y-2 flex flex-col">
                      <button className=" w-full py-2 px-3 flex items-center space-x-[10px]">
                        <img src={ux} alt="" />
                        <p className=" text-black text-sm font-Outfit font-normal">
                          Download Audio
                        </p>
                      </button>
                      <button className=" w-full py-2 px-3 flex items-center space-x-[10px]">
                        <img src={txt} alt="" />
                        <p className=" text-black text-sm font-Outfit font-normal">
                          Download Transcribed Note
                        </p>
                      </button>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAssistant;
