import pie from "./assets/pie.svg";
import right from "./assets/right.svg";
import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashMiniHeader from "../AdminDashMiniHeader";
import AnnouncementSection from "../AnnouncementSection";
import SnackbarUtils from "../../../utils/snackbarUtils";
import { AnnouncementService } from "../../../services/adminService";

const CustomerSupport = () => {
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { user } = useAuth();

  const handleSubmitAnnouncement = async (announcement) => {
    try {
      await AnnouncementService.createAnnouncement(announcement);
      SnackbarUtils.success("Announcement Submitted");
    } catch (error) {
      SnackbarUtils.error(error.message || "Failed to submit announcement");
    }
  };

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

  const compaints = [
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
  ];

  return (
    <>
      <AdminDashMiniHeader
        name={user?.name}
        bodyText={
          "Take the first steps to Get a clear view of customer interactions."
        }
      />

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
      <div className=" mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
        <AnnouncementSection submitAnnouncement={handleSubmitAnnouncement} />

        <div className=" w-full lg:w-[64%] border border-[#EAEBF0] rounded-[10px] p-4">
          <div className=" w-full flex flex-row items-center justify-between">
            <p className=" font-Outfit text-xl font-semibold text-black">
              Complaints
            </p>
            <button
              onClick={() => handleClick("customerComplaint")}
              className=" px-3 py-2 text-center text-sm font-Outfit text-white font-normal bg-[#0530A1] rounded-[7px]"
            >
              View all
            </button>
          </div>
          <div className=" w-full mt-4 flex flex-col">
            {compaints.map((item, index) => (
              <div
                key={index}
                className=" w-full flex justify-between py-2 border-b border-[#EAECF0]"
              >
                <div className=" flex items-center space-x-4">
                  <span className=" w-12 h-12 rounded-full bg-[#0530A1]"></span>
                  <span className=" flex flex-col">
                    <p className=" text-[#101828] font-medium text-sm font-Outfit">
                      {item.name}
                    </p>
                    <p className=" font-Outfit text-[#667085] text-sm font-normal">
                      Message
                    </p>
                  </span>
                </div>
                <img src={right} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSupport;
