import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import right from "./assets/right.svg";
import { useState } from "react";

const AdminSelect = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const basic = [
    { name: "Customer Relation Officer" },
    { name: "Sales Officer" },
    { name: "Title Manager" },
  ];
  const Management = [
    { name: "Partnership & Compliance Officer" },
    { name: "Chief Financial Officer" },
    { name: "Remuneration Manager" },
  ];
  const Supervisor = [
    { name: "Account Manager" },
    { name: "Junior P & C Officer" },
    { name: "Junior Finance Lead" },
    { name: "Conflict Resolution Officer" },
  ];

  const levels = [
    { name: "Basic Level", details: basic },
    { name: "Supervisor Level", details: Supervisor },
    { name: "Management Level", details: Management },
  ];

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const handleBackClick = () => {
    setSelectedLevel(null);
  };
  return (
    <>
      <div className="flex w-full h-full flex-col items-center justify-center p-16">
        <span className="flex items-center space-x-2">
          <img
            src={logo}
            className="w-16 h-6 md:w-10 md:h-6"
            alt="Veclary:The Best System To Enhance Your Education"
          />
          <p className="font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
            Veclary
          </p>
        </span>
        <p className="text-center font-Outfit mt-8 text-[#0530A1] font-semibold text-3xl">
          Signup
        </p>
        <p className="text-center text-[#12121266] mt-2 text-xl font-Outfit font-normal">
          Get Started Now
        </p>
        <div className="mt-16 w-[500px] flex flex-col space-y-4">
          {selectedLevel === null &&
            levels.map((item, index) => (
              <div
                key={index}
                className="w-full border border-[#EAEBF0] rounded-[15px] p-4 flex flex-row justify-between cursor-pointer"
                onClick={() => handleLevelClick(item)}
              >
                <p className="font-Outfit text-xl font-medium text-black">
                  {item.name}
                </p>
                <img src={right} alt="" />
              </div>
            ))}

          {selectedLevel && (
            <div className="w-full">
              <div className="w-full border border-[#EAEBF0] rounded-[15px] p-4 flex flex-row justify-between">
                <p className="font-Outfit text-xl font-medium text-black">
                  {selectedLevel.name}
                </p>
                <img src={right} className="rotate-[90deg]" alt="" />
              </div>
              <div className="w-full">
                {selectedLevel.details.map((item, index) => (
                  <Link to="/adminlogin">
                    <div
                      key={index}
                      className="w-full border mt-3 border-[#EAEBF0] rounded-[15px] p-4 "
                    >
                      <p className="font-Outfit text-base font-normal text-black">
                        {item.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                className="w-full bg-[#f5f5f5] rounded-[10px] flex items-center justify-center h-[48px] text-[#121212] text-center mt-16 font-Outfit text-base"
                onClick={handleBackClick}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSelect;
