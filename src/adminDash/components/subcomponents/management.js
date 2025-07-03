import pie from "./assets/pie.svg";
import right from "./assets/right.svg";
import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import AddPersonnel from "../addPersonnel";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashMiniHeader from "../AdminDashMiniHeader";
import AnnouncementSection from "../AnnouncementSection";
import SnackbarUtils from "../../../utils/snackbarUtils";
import RecentTransactions from "../RecentTransactions";

const Management = () => {
  const [addPerson, setAddPerson] = useState(false);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { user } = useAuth();

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleSubmitAnnouncement = (announcement) => {
    // submit announcement logic
    SnackbarUtils.success("Announcement Submitted");
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
        <AdminDashMiniHeader
          name={user?.name}
          bodyText={
            "Take the first steps to Get a clear view of customer interactions."
          }
        />

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
        <AnnouncementSection submitAnnouncement={handleSubmitAnnouncement} />

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

        <RecentTransactions handleClick={() => handleClick("Transaction")} />
      </div>
    </>
  );
};

export default Management;
