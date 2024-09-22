import arrowBlue from "./assets/arrowblue.svg";
import edit from "./assets/edit.svg";
import league from "./assets/league.svg";
import grap from "./assets/grap.svg";
import flame from "./assets/flsm.svg";
import { useContext } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StudentProfile = ({ profile, loading }) => {
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
        className="  absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Profile
          </p>
        </span>

        <div className=" w-full flex flex-col items-center justify-center mt-16">
          <span
            style={{
              backgroundImage:
                profile && profile?.user?.avatar?.url
                  ? `url(${profile.user.avatar.url})`
                  : "none",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor:
                profile && profile?.user?.avatar?.url
                  ? "transparent"
                  : "#EAEBF0", // Set color only if the image doesn't exist
            }}
            className=" w-[120px] h-[120px] rounded-[50%] bg-[#f8f8f8]"
          ></span>

          {loading ? (
            <Skeleton height={20} />
          ) : (
            profile && (
              <p className=" font-Outfit w-full text-center text-xl font-medium text-[#272D37] mt-2 capitalize">
                {profile.user.name}
              </p>
            )
          )}

          <button
            onClick={() => handleClick("EditProfile")}
            className=" mt-3 px-2 py-1 rounded-[5px] border border-[#D9D9D9] shadow-sm flex flex-row items-center space-x-1"
          >
            <img src={edit} alt="" />
            <p className=" font-Outfit text-sm font-medium">Edit Profile</p>
          </button>
        </div>

        <div className=" w-full mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className=" w-full p-6 bg-[#f8f8f8] flex flex-col items-center rounded-[15px]">
            <p className=" w-full text-left font-Outfit font-semibold text-xl">
              Leaderboard
            </p>
            <p className=" w-full text-left mt-1 text-[#121212B2] font-Outfit text-xs">
              Complete a lesson to join this week’s leaderboard
            </p>
            <img src={league} className=" mt-5 w-[50%]" alt="" />
          </div>

          <div className=" w-full p-6 bg-[#f8f8f8] rounded-[15px]  flex flex-col items-center justify-center">
            <span className=" w-[110px] h-[110px] border-[3px] rounded-[50%] border-[#EAEBF0] flex justify-center items-center">
              <img src={flame} className=" w-[40%] z-20" alt="" />
            </span>
            <p className=" font-Outfit font-semibold text-[48px] -mt-[32px] px-2 bg-[#f8f8f8]">
              2
            </p>
            <p className=" font-Outfit text-lg font-semibold -mt-3">
              Week Streak
            </p>
            <p className=" font-Outfit text-sm text-[#121212B2]">
              You are doing really great
            </p>
          </div>

          <div className=" w-full p-6 bg-[#f8f8f8] flex flex-col items-center rounded-[15px]">
            <p className=" w-full text-left font-Outfit font-semibold text-xl">
              Skill Graph
            </p>
            <img src={grap} className=" mt-5" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
