import pie from "./assets/pie.svg";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import right from "./assets/right.svg";
import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import AddPersonnel from "../addPersonnel";

const Management = () => {
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);
  const [addPerson, setAddPerson] = useState(false);
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

  const team = [
    {
      name: "Latoya Langosh",
      tile: "Customer Support ",
      price: "$135,450",
      status: "Online",
    },
    {
      name: "Abel Mohr",
      tile: "Account Manager",
      price: "$135,450",
      status: "Offline",
    },
    {
      name: "Shari Stamm",
      tile: "Title Manager",
      price: "$135,450",
      status: "Online",
    },
    {
      name: "Earl Johnson",
      tile: "Customer Support ",
      price: "$135,450",
      status: "Offline",
    },
  ];

  const transactions = [
    {
      name: "Latoya Langosh",
      date: "Customer Support ",
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

  const statusStylesTeam = {
    Online: "text-[#437EF7] bg-[#F5FAFF]",
    Offline: "text-[#272D37] bg-[#F7F7F8]",
  };

  const getStatusClassTeam = (status) => {
    return statusStylesTeam[status];
  };

  return (
    <>
      {addPerson && <AddPersonnel setAddPerson={setAddPerson} />}
      <div className="border-b border-[#EAEBF0] pb-6 w-full flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 justify-between">
        <div className=" w-full flex-row md:items-center space-x-4 md:space-x-3">
          <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
          <span className=" flex flex-col">
            <p className="font-Outfit font-medium text-xl text-black md:text-3xl">
              Welcome back, Management!
            </p>
            <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
              Take the first steps to Get a clear view of customer interactions.
            </p>
          </span>
        </div>

        <button
          onClick={() => {
            setAddPerson(true);
          }}
          className=" w-[220px]  py-3 bg-[#0530A1] rounded-[10px] font-Outfit font-medium text-white text-base"
        >
          Add New personnel
        </button>
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

      {/* row 2 */}
      <div className=" mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-3 w-full">
        <div className=" w-full border border-[#EAEBF0] rounded-[10px] p-4 relative">
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

        <div className=" w-full border border-[#EAEBF0] rounded-[10px] p-4">
          <p className=" font-Outfit font-semibold text-lg text-[#272D37]">
            Veclary Team
          </p>

          <div className=" mt-2 grid grid-cols-1 w-full border-b border-[#EAEBF0] ">
            {team.map((item, index) => (
              <div
                key={index}
                className=" flex items-center justify-between w-full py-3"
              >
                <span className=" flex flex-col">
                  <p className=" font-Outfit font-medium text-[#272D37] text-[15px]">
                    {item.name}
                  </p>
                  <p className=" font-Outfit text-[#5F6D7E] text-sm font-medium">
                    {item.tile}
                  </p>
                </span>

                <span className=" flex flex-row items-center space-x-2">
                  <p
                    className={`-mt-0 font-Outfit font-medium w-[57px] rounded-[5px] text-[13px] text-center py-[2px] ${getStatusClassTeam(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </p>
                  <img src={right} alt="" />
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

        <div className=" w-full border border-[#EAEBF0] rounded-[10px] p-4">
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
                    className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px] px-2 py-[2px] ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </p>
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleClick("Transaction")}
            className=" w-full  mt-8 lg:mt-6 py-3 flex justify-center items-center bg-[#0530A1] rounded-[10px]"
          >
            <p className=" font-Outfit text-sm text-white font-medium">
              View All
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Management;
