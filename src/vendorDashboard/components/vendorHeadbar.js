import { useContext } from "react";
import flame from "./assets/flame.svg";
import noti from "./assets/noti.svg";
import burger from "./assets/burger.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";

const VendorHeadbar = ({ profile }) => {
  const { activePage, setActivePage } = useContext(VendorActivePageContext);
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className=" w-full lg:w-[80%] fixed top-0 lg:left-[20%] h-[56px] px-8 py-3 z-[99] border-b bg-[#fff] border-[#EAEBF0] flex flex-row justify-between items-center ">
        <div>
          <img
            src={burger}
            className=" w-6 z-[9999] lg:hidden"
            alt=""
            onClick={toggleSidebar}
          />
        </div>
        <div className=" flex items-center space-x-6">
          <span className=" flex items-center space-x-2">
            <img src={flame} alt="" />
            <p className=" font-Outfit text-base font-medium">4</p>
          </span>
          <img src={noti} alt="" />
          <span
            style={{
              backgroundImage:
                profile && profile[0]?.avatar?.url
                  ? `url(${profile[0].avatar.url})`
                  : "none",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor:
                profile && profile[0]?.avatar?.url ? "transparent" : "#EAEBF0", // Set color only if the image doesn't exist
            }}
            onClick={() => handleClick("Profile")}
            className=" cursor-pointer w-[40px] h-[40px] rounded-[50%] bg-[#EAEBF0]"
          ></span>
        </div>
      </div>
    </>
  );
};

export default VendorHeadbar;
