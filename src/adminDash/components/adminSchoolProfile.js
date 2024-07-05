import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import Information from "./information";
import TeacherSchoolProfile from "./teacherSchoolProfile";
import StudentSchoolProfile from "./studentSchoolProfile";

const AdminSchoolProfile = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [activeButton, setActiveButton] = useState("Information");

  const handleClick = (page) => {
    setActivePage(page);
  };

  const buttons = [
    {
      label: "Information",
      value: "Information",
      component: <Information />,
    },
    {
      label: "Teachers",
      value: "Teachers",
      component: <TeacherSchoolProfile />,
    },
    {
      label: "Students",
      value: "Students",
      component: <StudentSchoolProfile />,
    },
  ];

  const handleButtonClick = (value) => {
    setActiveButton(value);
    // Add logic for button click action here
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            School Profile
          </p>
        </span>

        <div className=" mt-8 flex items-center flex-row justify-between">
          <div className=" flex items-center space-x-4">
            <span className=" w-[160px] h-[160px] rounded-[50%] bg-[#f8f8f8] border-4 border-white shadow shadow-[#10182814]"></span>
            <span>
              <p className=" font-medium text-3xl text-[#101828] font-Outfit">
                School Name
              </p>
              <p className=" font-normal text-sm font-Outfit text-[#667085]">
                schoolemail@gmail.com
              </p>
            </span>
          </div>

          <div className=" space-x-4 flex">
            <button className=" flex items-center space-x-2 px-4 py-2 bg-[#0530A1] rounded-[8px]">
              {/* <img src={userPlus} alt="" /> */}
              <p className=" font-Outfit text-sm font-semibold text-[#fff]">
                Upload Document
              </p>
            </button>
          </div>
        </div>

        <div className=" mt-6 font-Outfit">
          <p className=" font-semibold text-2xl font-Outfit text-[#000]">
            School Details
          </p>
          <div className="w-full border-b mt-6 border-[#EAECF0] h-full">
            <div className="flex">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={`font-medium font-Outfit text-sm pb-4 px-2 transition-all ${
                    activeButton === button.value
                      ? "border-b-2 border-[#0530A1] text-[#0530A1]"
                      : ""
                  }`}
                  onClick={() => handleButtonClick(button.value)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {buttons.find((button) => button.value === activeButton).component}
        </div>
      </div>
    </>
  );
};

export default AdminSchoolProfile;
