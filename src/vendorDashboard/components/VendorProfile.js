import { useContext } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import edit from "./assets/edit.svg";
import userPlus from "./assets/user-plus.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
  VendorUserType,
} from "../contexts/VendorActivePageContext";

const VendorProfile = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);
  const { userType, setUserType } = useContext(VendorUserType);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
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
            Profile
          </p>
        </span>

        <div className=" mt-8 flex items-center flex-row px-6 justify-between">
          <div className=" flex items-center space-x-4">
            <span className=" w-[160px] h-[160px] rounded-[50%] bg-[#f8f8f8] border-4 border-white shadow shadow-[#10182814]"></span>
            <span>
              <p className=" font-medium text-3xl text-[#101828] font-Outfit">
                Veek Design
              </p>
              <p className=" font-normal text-sm font-Outfit text-[#667085]">
                Veekdesign@gmail.com
              </p>
            </span>
          </div>

          <div className=" space-x-4 flex">
            <button className=" flex items-center space-x-2 px-4 py-2 border border-[#D0D5DD] rounded-[8px]">
              <img src={edit} alt="" />
              <p className=" font-Outfit text-sm font-semibold text-[#344054]">
                Edit Profile
              </p>
            </button>
            <button className=" flex items-center space-x-2 px-4 py-2 bg-[#0530A1] rounded-[8px]">
              <img src={userPlus} alt="" />
              <p className=" font-Outfit text-sm font-semibold text-[#fff]">
                Share
              </p>
            </button>
          </div>
        </div>

        <div className=" w-full mt-6 px-6">
          <p className=" font-medium text-lg font-Outfit text-[#101828]">
            Personal info
          </p>
          <p className=" font-Outfit text-sm font-normal pb-3 border-b border-[#EAECF0] w-full text-[#667085]">
            Update your photo and personal details here.
          </p>

          <div className=" w-full flex mt-3 justify-between items-end">
            <label
              htmlFor="Email"
              className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
            >
              First name
              <input
                type="email"
                placeholder=""
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
              />
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
            >
              Last name
              <input
                type="email"
                placeholder=""
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full flex justify-between items-end">
            <label
              htmlFor="Email"
              className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
            >
              Phone Number
              <input
                type="email"
                placeholder="Enter Phone Number"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
              />
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
            >
              Email
              <input
                type="email"
                placeholder="Enter Email Address"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
              />
            </label>
          </div>

          {userType !== "Author" && (
            <div>
              <label
                htmlFor="Email"
                className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
              >
                Address
                <input
                  type="email"
                  placeholder="Enter Address"
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
                />
              </label>

              <div className=" w-full flex justify-between items-end">
                <label
                  htmlFor="Email"
                  className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                >
                  Account Name
                  <input
                    type="email"
                    placeholder="Enter Account Name"
                    className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
                  />
                </label>

                <label
                  htmlFor="Email"
                  className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                >
                  Account Number
                  <input
                    type="email"
                    placeholder="Enter Account Number"
                    className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
                  />
                </label>
              </div>

              <label
                htmlFor="Email"
                className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
              >
                Bank Name
                <input
                  type="email"
                  placeholder="Enter Bank Name"
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
