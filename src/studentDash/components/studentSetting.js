import arrowBlue from "./assets/arrowblue.svg";
import sound from "./assets/sound.png";
import remind from "./assets/remind.svg";
import time from "./assets/time.svg";
import streak from "./assets/streak.svg";
import board from "./assets/board.svg";
import release from "./assets/release.svg";
import star from "./assets/star.svg";
import { useContext, useState } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import load from "./assets/load.gif";
import { handleChangeCurrPassword } from "../../controllers/studentControllers/userAuthController";

const StudentSettings = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const onSuccess = (response) => {
    setLoading(false);
  };

  const onError = (error) => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { oldPassword, newPassword };
    handleChangeCurrPassword(userData, onSuccess, onError);
  };

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
          className=" cursor-pointer w-full flex flex-row p-6 items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Settings
          </p>
        </span>

        <div className=" w-full py-4 px-6 font-Outfit text-base font-semibold">
          ACCOUNT SETTINGS
        </div>

        <div className=" mt-4 w-full">
          <div className=" w-full py-4 flex flex-row items-start justify-between border-y px-6 border-[#EAEBF0] md:pr-[20%]">
            <div className="">
              <p className="font-Outfit text-base font-medium text-[#000000B2]">
                Change your Password
              </p>
            </div>
            <div className=" w-[400px] flex flex-col space-y-4">
              <label
                htmlFor=""
                className=" w-full font-Outfit text-[#344054] font-medium text-sm"
              >
                Enter Current Password
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Current Password"
                  className="w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
                />
              </label>
              <label
                htmlFor=""
                className=" w-full font-Outfit text-[#344054] font-medium text-sm"
              >
                Enter New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
                />
              </label>
              <button
                onClick={handleSubmit}
                className=" bg-[#0530A1] rounded-[30px] flex items-center justify-center px-5 py-2 text-center font-Outfit shadow text-white text-sm font-medium ml-auto "
              >
                {loading ? <img src={load} className=" w-6" alt="" /> : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className=" w-full py-4 px-6 font-Outfit text-base mt-4 font-semibold">
          NOTIFICATIONS
        </div>

        <div className=" mt-4 w-full">
          <div className=" w-full py-4 flex flex-row items-center justify-between border-y px-6 border-[#EAEBF0]">
            <span className=" flex flex-row space-x-2 items-center">
              <img src={remind} className=" h-4 w-4" alt="" />
              <p className=" text-sm font-normal text-[#000000B2] font-Outfit ">
                Daily Reminder
              </p>
            </span>
            {/* <!-- Rounded switch --> */}
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className=" w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]">
            <span className=" flex flex-row space-x-2 items-center">
              <img src={time} className=" h-3 w-3" alt="" />
              <p className=" text-sm font-normal text-[#000000B2] font-Outfit ">
                Reminder Time
              </p>
            </span>
            <p className=" font-Outfit text-xs text-[#000000B2]">12:00 PM</p>
          </div>
          <div className=" w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]">
            <span className=" flex flex-row space-x-2 items-center">
              <img src={streak} className=" h-4 w-4" alt="" />
              <p className=" text-sm font-normal text-[#000000B2] font-Outfit ">
                Streaks
              </p>
            </span>
            {/* <!-- Rounded switch --> */}
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className=" w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]">
            <span className=" flex flex-row space-x-2 items-center">
              <img src={board} className=" h-4 w-4" alt="" />
              <p className=" text-sm font-normal text-[#000000B2] font-Outfit ">
                Leaderboards
              </p>
            </span>
            {/* <!-- Rounded switch --> */}
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div className=" w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]">
            <span className=" flex flex-row space-x-2 items-center">
              <img src={star} className=" h-4 w-4" alt="" />
              <p className=" text-sm font-normal text-[#000000B2] font-Outfit ">
                Promotions & Specials
              </p>
            </span>
            {/* <!-- Rounded switch --> */}
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSettings;
