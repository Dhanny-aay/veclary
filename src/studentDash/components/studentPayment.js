import { useContext, useState } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import StudentFeesDue from "./studentFeesDue";
import StudentGenerateFee from "./studentGenerateFee";
import StudentFeesPaid from "./studentFeesPaid";

const StudentPayment = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [activeButton, setActiveButton] = useState("FeesDue");

  const buttons = [
    {
      label: "Fees Due",
      value: "FeesDue",
      component: <StudentFeesDue />,
    },
    {
      label: "Generate Fee",
      value: "GenerateFee",
      component: <StudentGenerateFee />,
    },
    {
      label: "Fees Paid",
      value: "FeesPaid",
      component: <StudentFeesPaid />,
    },
    {
      label: "Student Ledger",
      value: "StudentLedger",
      //   component: <FeesReminder />,
    },
  ];

  const handleClick = (page) => {
    setActivePage(page);
  };

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
        className=" absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer w-full flex flex-row p-6 items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit mb-2 text-xl font-semibold ml-3">
            Payment
          </p>
        </span>

        <div className="px-6 mt-6 font-Outfit">
          <div className="w-full border-b border-[#E4E7EC] h-full">
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

export default StudentPayment;
