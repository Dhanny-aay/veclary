import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import add from "./assets/add.svg";
import chart from "./assets/chart.svg";
import nonoti from "./assets/nonoti.svg";
import chart1 from "./assets/chart1.svg";
import chart2 from "./assets/chart2.svg";

const JuniorFinLead = () => {
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const performance = [
    {
      name: "Revenue",
      percentage: "$390",
      stat: "Daily Stats",
      img: chart,
    },
    {
      name: "Income",
      percentage: "$680",
      stat: "Daily Stats",
      img: chart1,
    },
    {
      name: "Paid",
      percentage: "$680",
      stat: "Daily Stats",
      img: chart2,
    },
  ];

  const transactions = [
    {
      name: "Latoya Langosh",
      date: "April 15 2024",
      price: "$135,450",
      status: "Done",
    },
    {
      name: "Abel Mohr",
      date: "April 15 2024",
      price: "$135,450",
      status: "Failed",
    },
    {
      name: "Shari Stamm",
      date: "April 15 2024",
      price: "$135,450",
      status: "Done",
    },
    {
      name: "Earl Johnson",
      date: "April 15 2024",
      price: "$135,450",
      status: "Failed",
    },
  ];

  const statusStyles = {
    Done: "text-[#2D8A39] bg-[#F0FAF0]",
    Failed: "text-[#E2341D] bg-[#FFF2F0]",
    default: "text-gray-600 bg-gray-100", // Default style for other statuses
  };

  const getStatusClass = (status) => {
    return statusStyles[status] || statusStyles.default;
  };

  return (
    <>
      <div className="flex border-b border-[#EAEBF0] pb-6 flex-row md:items-center space-x-4 md:space-x-3">
        <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
        <span className=" flex flex-col">
          <p className="font-Outfit font-medium text-xl text-black md:text-3xl">
            Welcome back, Junior Finance Lead!
          </p>
          <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
            Stay on top of Veclary with real-time data and insights.
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
          <p className=" font-Outfit text-lg font-semibold text-[#272D37]">
            Announcements
          </p>
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
          <p className=" font-Outfit font-semibold text-lg text-[#272D37]">
            Recent Transactions
          </p>

          <div className=" mt-2 grid grid-cols-1 w-full border-b border-[#EAEBF0] ">
            {transactions.map((item, index) => (
              <div
                key={index}
                className=" flex items-center justify-between w-full py-3"
              >
                <span className=" flex flex-col">
                  <p className=" font-Outfit font-medium text-[#272D37] text-[15px]">
                    {item.name}
                  </p>
                  <p className=" font-Outfit text-[#5F6D7E] text-sm font-medium">
                    {item.date}
                  </p>
                </span>

                <span className=" flex flex-row items-center space-x-3">
                  <p className=" font-Outfit text-[#000000] font-semibold text-base">
                    {item.price}
                  </p>
                  <p
                    className={`-mt-0 font-Outfit font-medium text-[13px] px-2 py-[2px] ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </p>
                </span>
              </div>
            ))}
          </div>

          <button className=" w-full  mt-8 lg:mt-6 py-3 flex justify-center items-center bg-[#0530A1] rounded-[10px]">
            <p className=" font-Outfit text-sm text-white font-medium">
              View All
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default JuniorFinLead;
