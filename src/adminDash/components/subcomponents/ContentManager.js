import { useState } from "react";
import LandingPage from "./ContentManagerComponents/Landingpage";

const ContentManager = () => {
  const [activeButton, setActiveButton] = useState("Landingpage");

  const buttons = [
    {
      label: "Landing page",
      value: "Landingpage",
      component: <LandingPage />,
    },
    {
      label: "About us",
      value: "Aboutus",
      component: "",
    },
    {
      label: "Terms and conditions",
      value: "Termsandconditions",
      component: "",
    },
    {
      label: "Career",
      value: "Career",
      component: "",
    },
    {
      label: "Blogs",
      value: "Blogs",
      component: "",
    },
  ];

  const handleButtonClick = (value) => {
    setActiveButton(value);
    // Add logic for button click action here
  };
  return (
    <>
      <div className="flex border-b border-[#EAEBF0] pb-6 flex-row md:items-center space-x-4 md:space-x-3">
        <span className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
        <span className=" flex flex-col">
          <p className="font-Outfit font-medium text-xl text-black md:text-3xl">
            Welcome back,Content Manager!
          </p>
          <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
            Stay on top of Veclary with real-time data and insights.
          </p>
        </span>
      </div>

      <div className=" mt-6 font-Outfit">
        <div className="w-full border-b border-[#EAECF0] h-full">
          <div className="flex">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`font-normal font-Outfit text-sm pb-4 px-2 transition-all ${
                  activeButton === button.value
                    ? "border-b-2 border-[#0530A1] text-[#0530A1]"
                    : " text-[#929292]"
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
    </>
  );
};

export default ContentManager;
