import grid from "./assets/grid.svg";
import logo from "./assets/logo.svg";
import ilus from "./assets/ilus.svg";
import prog from "./assets/prog.svg";
import { Link } from "react-router-dom";

const TeacherLogin = () => {
  return (
    <>
      <div className="  w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
        <div className=" p-6 w-full max-w-[1280px] lg:max-h-[630px] bg-[#fff] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
          <div className=" w-full lg:w-[49%] h-full flex flex-col px-0 md:px-10 py-10 relative">
            <p className=" font-Outfit text-[#0530A1] text-3xl font-medium">
              Login
            </p>
            <p className=" text-[#12121266] font-Outfit text-xl font-normal mt-2">
              Get Started Now
            </p>

            <div className=" w-full mt-12">
              <label
                htmlFor="Email"
                className=" flex flex-col w-full font-Outfit font-medium"
              >
                Email Address
                <input
                  type="email"
                  className=" border border-[#EAEBF0] h-[45px] p-2.5 font-Outfit text-sm rounded-[15px] mt-3"
                />
              </label>

              <label
                htmlFor="Email"
                className=" flex flex-col w-full font-Outfit font-medium mt-6"
              >
                Password
                <input
                  type="email"
                  className=" border border-[#EAEBF0] h-[45px] p-2.5 font-Outfit text-sm rounded-[15px] mt-3"
                />
              </label>
            </div>

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

            <div className=" lg:absolute mt-16 lg:mt-0 bottom-0 w-full left-0 lg:px-10">
              <button className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[48px] text-white text-center font-Outfit text-base">
                Login
              </button>
              <Link to="/teachersSignup">
                <p className=" mt-[19px] font-Outfit font-medium text-sm text-[#12121266] text-center">
                  Dont have an Account?{" "}
                  <span className=" text-[#0530A1]">Register</span>
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
            className=" w-[49%] bg-[#EBF5FF] rounded-[15px] relative lg:flex flex-col hidden justify-center px-5 py-6"
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
                backgroundImage: `url(${ilus})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full h-[250px] z-50 mt-12 rounded-[15px]"
            ></div>

            <p className=" z-50  text-xl  font-semibold mt-16 font-Outfit">
              Access high-quality e-books, articles, and more.
            </p>
            <p className=" z-50 font-Outfit mt-2 font-normal text-base">
              Explore diverse resources and spark your learning passion.
            </p>

            <img
              src={prog}
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

export default TeacherLogin;
