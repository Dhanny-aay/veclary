import grid from "./assets/grid.svg";
import logo from "./assets/logo.svg";
import progress from "./assets/progress.svg";
import progress1 from "./assets/progress1.svg";
import { Link } from "react-router-dom";
import strength from "./assets/strength.svg";
import down from "./assets/down.svg";
import ilus1 from "./assets/ilus1.svg";
import prog1 from "./assets/prog1.svg";
import plus from "./assets/plus.svg";
import { useState } from "react";

const TeacherSignup = () => {
  const req = [
    { name: "Characters", example: "8+" },
    { name: "Uppercase", example: "AA" },
    { name: "Lowercase", example: "aa" },
    { name: "Numbers", example: "123" },
    { name: "Symbol", example: "$#^" },
  ];

  const [personal, setPersonal] = useState(false);
  const [academic, setAcademic] = useState(true);

  return (
    <>
      <div className=" w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
        <div className=" p-6 w-full max-w-[1280px] lg:max-h-[630px] bg-[#fff] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
          <div className=" w-full lg:w-[49%] h-full flex flex-col md:px-10 relative">
            <p className=" font-Outfit text-[#0530A1] text-2xl font-medium">
              Sign up
            </p>
            <p className=" text-[#12121266] font-Outfit text-lg font-normal mt-1">
              Get Started Now
            </p>

            {personal && (
              <div className="w-full">
                <img src={progress} className=" w-full mt-3" alt="" />
                <p className=" font-Outfit font-medium text-2xl mt-6">
                  Personal Information
                </p>

                <div className=" w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
                  <label
                    htmlFor="Email"
                    className=" flex flex-col w-full font-Outfit text-sm font-medium"
                  >
                    Preferred Name or Nickname (Displayed to Students)
                    <input
                      type="email"
                      className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                    />
                  </label>

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
              </div>
            )}

            {academic && (
              <div className="w-full">
                <img src={progress1} className=" w-full mt-3" alt="" />
                <p className=" font-Outfit font-medium text-2xl mt-6">
                  Academic Information
                </p>

                <div className=" w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
                  <label
                    htmlFor="Email"
                    className=" flex flex-col w-full font-Outfit text-sm font-medium"
                  >
                    School Name
                    <select className=" border border-[#EAEBF0] h-[40px] p-2.5 text-[#000000B2] font-Outfit text-sm rounded-[15px] mt-2">
                      <option value="">Choose a School</option>
                    </select>
                  </label>

                  <div className=" w-full flex items-center  justify-between">
                    <label
                      htmlFor="Email"
                      className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                    >
                      Class Level/Year taught
                      <input
                        type="email"
                        className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                      />
                    </label>

                    <label
                      htmlFor="Email"
                      className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                    >
                      Subject Area
                      <select className=" border border-[#EAEBF0] h-[40px] p-2.5 text-[#000000B2] font-Outfit text-sm rounded-[15px] mt-2">
                        <option value="">Choose a Subject</option>
                      </select>
                    </label>
                  </div>

                  <label
                    htmlFor="Email"
                    className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
                  >
                    Verification method
                    <select className=" border border-[#EAEBF0] h-[40px] p-2.5 text-[#000000B2] font-Outfit text-sm rounded-[15px] mt-2">
                      <option value="">Choose a Verification method</option>
                    </select>
                  </label>

                  <label
                    htmlFor="Email"
                    className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
                  >
                    Verification method
                    <div className=" w-full py-6 border border-[#DAE0E6] border-dashed rounded-[10px] flex flex-col items-center justify-center mt-2">
                      <span className=" w-10 h-10 rounded-[50%] border flex justify-center items-center border-[#DAE0E6] border-dashed">
                        <img src={plus} alt="" />
                      </span>
                      <p className=" font-Outfit mt-3 text-sm text-[#272D37] font-medium">
                        Upload Image of your Verification image Here
                      </p>
                      <p className=" text-[#5F6D7E] text-xs font-medium font-Outfit mt-1">
                        <span className=" text-[#0530A1]">Browse Files </span>
                        from your Devices
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className=" mt-16 lg:mt-0 lg:absolute bottom-0 w-full left-0 lg:px-10">
              <Link to="/teachersDashboard" className=" w-full">
                <button className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[38px] text-white text-center font-Outfit text-base">
                  Request for Approval
                </button>
              </Link>
              <Link to="/teacherslogin">
                <p className=" mt-[19px] font-Outfit font-medium text-xs text-[#12121266] text-center">
                  Already have an Account?{" "}
                  <span className=" text-[#0530A1]">Login</span>
                </p>
              </Link>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${grid})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-[49%] bg-[#EBF5FF] rounded-[15px] relative hidden lg:flex flex-col justify-center px-5 py-6"
          >
            <span className=" absolute top-6 right-6 flex items-center space-x-2">
              <img
                src={logo}
                className=" w-16 h-6 md:w-10 md:h-6"
                alt="Veclary:The Best System To Enhance Your Education"
              />
              <p className=" font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
                Veclary
              </p>
            </span>

            <div
              style={{
                backgroundImage: `url(${ilus1})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full h-[250px] z-50 mt-12 rounded-[15px]"
            ></div>

            <p className=" z-50  text-xl  font-semibold mt-16 font-Outfit">
              Empower Educators and elevate learning
            </p>
            <p className=" z-50 font-Outfit mt-2 font-normal text-base">
              unleashing productivity with velcary’s management Tools
            </p>

            <img
              src={prog1}
              className=" z-50 w-[90%] absolute bottom-6 left-5"
              alt=""
            />

            <div className=" w-full  absolute h-[100%] top-0 left-0 bg-gradient-to-b from-[rgba(235,245,255,0)] rounded-[15px] to-[rgba(235,245,255,1)]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSignup;
