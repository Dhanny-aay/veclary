import { useContext } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import right from "./assets/right.svg";
import arrowBlue from "./assets/arrowblue.svg";

const CustomerComplaint = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const compaints = [
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
    { name: "Veek Designs" },
  ];

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Customer Complaint
          </p>
        </span>

        {/* complaints */}
        <div className=" mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
          <div className=" w-full lg:w-[49%] border border-[#EAEBF0] rounded-[10px] p-4">
            <div className=" w-full flex flex-row items-center justify-between">
              <p className=" font-Outfit text-ld font-medium text-[#101828]">
                Complaints
              </p>
            </div>
            <div className=" w-full mt-4 flex flex-col">
              <div className=" w-full flex justify-between py-2 px-6  bg-[#0530A1] border-b border-[#EAECF0]">
                <div className=" flex items-center space-x-4">
                  <span className=" w-12 h-12 rounded-full bg-[#fff]"></span>
                  <span className=" flex flex-col">
                    <p className=" text-[#ffff] font-medium text-sm font-Outfit">
                      Veek Designs
                    </p>
                    <p className=" font-Outfit text-[#fff] text-sm font-normal">
                      Message
                    </p>
                  </span>
                </div>
                <img src={right} alt="" />
              </div>
              {compaints.map((item, index) => (
                <div
                  key={index}
                  className=" w-full flex justify-between py-2 px-6 border-b border-[#EAECF0]"
                >
                  <div className=" flex items-center space-x-4">
                    <span className=" w-12 h-12 rounded-full bg-[#0530A1]"></span>
                    <span className=" flex flex-col">
                      <p className=" text-[#101828] font-medium text-sm font-Outfit">
                        {item.name}
                      </p>
                      <p className=" font-Outfit text-[#667085] text-sm font-normal">
                        Message
                      </p>
                    </span>
                  </div>
                  <img src={right} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[49%] border border-[#EAEBF0] rounded-[10px] p-4"></div>
        </div>
      </div>
    </>
  );
};

export default CustomerComplaint;
