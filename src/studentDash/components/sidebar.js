import logo from "./assets/logo.svg";
import homeAc from "./assets/home.svg";
import home from "./assets/hme.svg";
import lib from "./assets/lib.svg";
import libAc from "./assets/blueLib.svg";
import course from "./assets/course.svg";
import courseAc from "./assets/blueCour.svg";
import classroom from "./assets/class.svg";
import classroomAc from "./assets/blueteam.svg";
import performane from "./assets/perform.svg";
import performaneAc from "./assets/bluePerform.svg";
import avatar from "./assets/avatars.svg";
import setting from "./assets/setting.svg";
import settingAc from "./assets/blueSetting.svg";
import logout from "./assets/logout.svg";
import note from "./assets/note.svg";
import clos from "./assets/clos.svg";
import { useContext } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import proBadge from "./assets/Pro_Badgeun.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/"); // Redirect to home
  };

  const sidebar = [
    { name: "Home", img: home, activeImg: homeAc, page: "Home" },
    { name: "E-Libary", img: lib, activeImg: libAc, page: "Lib" },
    { name: "Subject", img: course, activeImg: courseAc, page: "Subject" },
    {
      name: "Classroom",
      img: classroom,
      activeImg: classroomAc,
      page: "Classroom",
    },
    {
      name: "Performance",
      img: performane,
      activeImg: performaneAc,
      page: "Performance",
    },
    {
      name: "Class assistant",
      img: proBadge,
      activeImg: proBadge,
      page: "Assistant",
    },
    {
      name: "Payments",
      img: performane,
      activeImg: performaneAc,
      page: "Payments",
    },
  ];

  const bottom = [
    { name: "Setting", img: setting, activeImg: settingAc, page: "Settings" },
    { name: "Logout", img: logout, onClick: handleLogOut },
  ];

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[999] w-[80%] md:w-[40%] lg:w-[20%] h-[100vh] bg-[#F5F5F5] ${
        sidebarVisible
          ? "lg:translate-x-0 translate-x-0"
          : "lg:translate-x-0 -translate-x-full"
      } transition-transform`}
    >
      <div className=" w-full h-full relative">
        <div className=" w-full flex justify-between border-b py-3 h-[56px] px-6 border-[#EAEBF0]">
          <span className="flex items-center space-x-2">
            <img
              src={logo}
              className=" w-10 h-6"
              alt="Veclary:The Best System To Enhance Your Education"
            />
            <p className=" font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
              Veclary
            </p>
          </span>
          <img
            src={clos}
            onClick={() => {
              setSidebarVisible(false);
            }}
            className=" lg:hidden w-5"
            alt=""
          />
        </div>

        <div className=" mt-5">
          <div className="">
            {sidebar.map((item, index) => (
              <button
                key={index}
                className="text-center py-2 px-6 flex flex-row space-x-4 items-center"
                onClick={() => handleClick(item.page)}
              >
                <img
                  src={activePage === item.page ? item.activeImg : item.img}
                  className="w-4 h-4"
                  alt=""
                />
                <p
                  className={`font-Outfit text-xs ${
                    activePage === item.page
                      ? "text-[#0530A1]"
                      : "text-[#929292]"
                  }`}
                >
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className=" w-full absolute bottom-12 lg:bottom-6">
          <div className="  px-6">
            <div className=" w-full lg:h-[200px] rounded-[10px] p-3 mt-3 bg-white">
              <p className=" font-Outfit text-sm font-semibold">Notepad</p>
              <p className=" font-Outfit text-[10px]">
                Unlock a powerful note-taking experience. Explore the notepad
                now! 
              </p>
              <img src={note} className=" w-[50%] block mx-auto" alt="" />
              <div className=" w-full mt-3 flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between items-center">
                <button
                  onClick={() => handleClick("Notepad")}
                  className=" w-full py-4 md:py-2 text-center font-Outfit text-[8px] bg-[#0530A1] rounded-[6px] text-white"
                >
                  Open Notepad
                </button>
              </div>
            </div>
          </div>

          <div className=" mt-4">
            <div className="">
              {bottom.map((item, index) => (
                <button
                  key={index}
                  className={`text-center py-2 px-6 flex flex-row space-x-4 items-center ${
                    activePage === item.page
                      ? "text-[#0530A1]"
                      : "text-[#929292]"
                  }`}
                  onClick={
                    item.onClick ? item.onClick : () => handleClick(item.page)
                  }
                >
                  <img
                    src={activePage === item.page ? item.activeImg : item.img}
                    className="w-4 h-4"
                    alt=""
                  />
                  <p
                    className={`font-Outfit text-xs ${
                      activePage === item.page
                        ? "text-[#0530A1]"
                        : "text-[#929292]"
                    }`}
                  >
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
