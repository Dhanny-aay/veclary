import { useState } from "react";
import LandingPage from "./ContentManagerComponents/Landingpage";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashMiniHeader from "../AdminDashMiniHeader";

const ContentManager = () => {
  const [activeButton, setActiveButton] = useState("Landingpage");
  const { user } = useAuth();

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
      <AdminDashMiniHeader
        name={user?.name}
        bodyText={"Stay on top of Veclary with real-time data and insights."}
      />

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
