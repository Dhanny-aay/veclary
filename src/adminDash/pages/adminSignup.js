import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";

const AdminSignup = () => {
  return (
    <>
      <div className=" flex w-full h-full flex-col items-center justify-center p-16">
        <span className="  flex items-center space-x-2">
          <img
            src={logo}
            className=" w-16 h-6 md:w-10 md:h-6"
            alt="Veclary:The Best System To Enhance Your Education"
          />
          <p className=" font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
            Veclary
          </p>
        </span>
        <p className="text-center font-Outfit mt-8 text-[#0530A1] font-semibold text-3xl">
          Signup
        </p>
        <p className=" text-center text-[#12121266] mt-2 text-xl font-Outfit font-normal">
          Get Started Now
        </p>
        <div className=" mt-16 w-[500px] flex flex-col">
          <label
            htmlFor=""
            className=" flex flex-col w-full text-base font-Outfit text-black font-medium"
          >
            Email Address
            <input
              type="text"
              className=" mt-3 w-full h-[55px] border border-[#EAEBF0] p-2.5 rounded-[15px]"
              name=""
              id=""
            />
          </label>
          <label
            htmlFor=""
            className=" flex flex-col w-full mt-6 text-base font-Outfit text-black font-medium"
          >
            Password
            <input
              type="text"
              className=" mt-3 w-full h-[55px] border border-[#EAEBF0] p-2.5 rounded-[15px]"
              name=""
              id=""
            />
          </label>
          <div className=" w-full flex justify-between mt-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className={`form-checkbox h-3 w-3 text-blue-600`}
              />
              <span className="ml-2 text-sm text-[#000] font-Outfit font-medium">
                Remember me
              </span>
            </label>
            <p className=" text-[#0530A1] text-sm font-medium font-Outfit">
              Forgot Password
            </p>
          </div>
          <div className=" mt-16 ">
            <button className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[48px] text-white text-center font-Outfit text-base">
              Login
            </button>
            <Link to="/">
              <p className=" mt-[19px] font-Outfit font-medium text-sm text-[#12121266] text-center">
                Dont have an Account?{" "}
                <span className=" text-[#0530A1]">Register</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
