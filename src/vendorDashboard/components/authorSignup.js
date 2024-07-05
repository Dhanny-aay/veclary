import strength from "./assets/strength.svg";
import down from "./assets/down.svg";
import { Link } from "react-router-dom";
import progress from "./assets/progress.svg";
import progress1 from "./assets/progress1.svg";
import { useState } from "react";

const AuthorSignup = () => {
  const req = [
    { name: "Characters", example: "8+" },
    { name: "Uppercase", example: "AA" },
    { name: "Lowercase", example: "aa" },
    { name: "Numbers", example: "123" },
    { name: "Symbol", example: "$#^" },
  ];

  const [companyInfo, setCompanyInfo] = useState(false);
  const [addInfo, setAddInfo] = useState(true);

  const proceed = () => {
    setCompanyInfo(true);
    setAddInfo(false);
  };

  return (
    <>
      {companyInfo && (
        <div className=" w-full">
          <img src={progress1} className=" w-full mt-3" alt="" />
          <p className=" font-Outfit font-medium text-2xl mt-6">
            Account Information
          </p>

          <div className=" w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
            <label
              htmlFor="Email"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Email Address
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Password
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <img src={strength} className=" w-full mt-5" alt="" />

            <p className=" font-Outfit text-base font-medium text-[#000000B2] mt-4">
              Password Strength Requirement
            </p>
            <div className=" flex flex-row justify-between items-center mt-4 w-full">
              {req.map((item, index) => (
                <span
                  key={index}
                  className=" flex flex-col text-center items-center"
                >
                  <p className=" font-Outfit text-lg font-medium text-[#01A85D]">
                    {item.example}
                  </p>
                  <p className=" font-Outfit text-sm text-[#12121266] font-medium">
                    {item.name}
                  </p>
                </span>
              ))}
            </div>
            <span className=" flex flex-row items-center space-x-3 mt-6">
              <p className=" font-Outfit text-base font-medium">
                Referral Code (optional)
              </p>
              <img src={down} alt="" />
            </span>
          </div>

          <div className=" mt-16 lg:mt-0 lg:absolute bottom-0 w-full left-0 lg:px-10">
            <Link to="/vendorDashboard">
              <button className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[38px] text-white text-center font-Outfit text-base">
                Proceed
              </button>
            </Link>
            <Link to="/vendorlogin">
              <p className=" mt-[19px] font-Outfit font-medium text-xs text-[#12121266] text-center">
                Already have an Account?{" "}
                <span className=" text-[#0530A1]">Login</span>
              </p>
            </Link>
          </div>
        </div>
      )}

      {addInfo && (
        <div className=" w-full">
          <img src={progress} className=" w-full mt-3" alt="" />
          <p className=" font-Outfit font-medium text-2xl mt-6">
            Personal Information
          </p>

          <div className=" w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
            <label
              htmlFor="Email"
              className=" flex flex-col w-full font-Outfit text-sm font-medium"
            >
              Full Name
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Are you affiliated with any publishing house or an independent
              author?
              <select
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              >
                <option value="">Choose an option</option>
              </select>
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Publisher‘s Name (Optional)
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <div className=" w-full flex justify-between items-end">
              <label
                htmlFor="Email"
                className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
              >
                Contact Information
                <input
                  type="email"
                  placeholder="Enter Phone Number"
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                />
              </label>

              <label
                htmlFor="Email"
                className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
              >
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
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
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Account Number
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-full mb-12 font-Outfit text-sm font-medium mt-4"
            >
              Account Name
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>
          </div>

          <div className=" mt-16 lg:mt-0 lg:absolute bottom-0 w-full left-0 lg:px-10">
            <button
              onClick={proceed}
              className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[38px] text-white text-center font-Outfit text-base"
            >
              Proceed
            </button>
            <Link to="/vendorlogin">
              <p className=" mt-[19px] font-Outfit font-medium text-xs text-[#12121266] text-center">
                Already have an Account?{" "}
                <span className=" text-[#0530A1]">Login</span>
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorSignup;
