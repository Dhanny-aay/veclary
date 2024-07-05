import { useContext } from "react";
import noti from "./assets/noti.svg";
import burger from "./assets/burger.svg";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";

const AdminHeadbar = () => {
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);

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
          <img src={noti} alt="" />
          <span
            onClick={() => handleClick("Profile")}
            className=" cursor-pointer w-[40px] h-[40px] rounded-[50%] bg-[#EAEBF0]"
          ></span>
        </div>
      </div>
    </>
  );
};

export default AdminHeadbar;
