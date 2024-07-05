import logo from "./assets/blueLogo.svg";
import ig from "./assets/ig.svg";
import tt from "./assets/tt.svg";
import lin from "./assets/in.svg";
import appl from "./assets/appl.svg";
import goog from "./assets/goog.svg";

const Footer = () => {
  return (
    <>
      <div className=" p-4 md:px-6 md:pb-6">
        <div className=" bg-[#0530A1] rounded-[20px] py-7 md:py-11 px-7 md:px-14">
          <div className=" w-full flex flex-col lg:flex-row justify-between border-b space-y-8 lg:space-y-0 border-[#EAEBF033] pb-4 md:pb-32">
            <div className=" flex flex-col">
              <span className=" flex flex-row space-x-1">
                <img src={logo} alt="" />
                <p className=" font-Outfit text-[25px] text-white font-semibold">
                  Veclary
                </p>
              </span>
              <p className=" md:w-[240px] text-[#A5ACBA] mt-4 font-Outfit text-base font-normal">
                Education Made Smarter, Simpler, and Accessible.
              </p>
              <span className=" flex flex-row items-center space-x-3  mt-4">
                <img src={appl} alt="" />
                <img src={goog} alt="" />
              </span>
            </div>
            <div className=" flex flex-col">
              <p className=" font-Outfit text-[#f9f9f9] font-semibold">
                Products
              </p>
              <p className=" mt-6 text-[#A5ACBA] font-medium font-Outfit">
                E-library
              </p>
              <p className="mt-3 text-[#A5ACBA] font-medium font-Outfit">
                School Management System
              </p>
            </div>
            <div className=" flex flex-col">
              <p className=" font-Outfit text-[#f9f9f9] font-semibold">
                Company
              </p>
              <p className=" mt-6 text-[#A5ACBA] font-medium font-Outfit">
                About Us
              </p>
              <p className="mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Careers
              </p>
              <p className="mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Contact Us
              </p>
              <p className="mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Privacy Policy
              </p>
              <p className="mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Terms of Service
              </p>
            </div>
            <div className=" flex flex-col">
              <p className=" font-Outfit text-[#f9f9f9] font-semibold">
                Learn More
              </p>
              <p className=" mt-6 text-[#A5ACBA] font-medium font-Outfit">
                Blog
              </p>
              <p className="mt-3 text-[#A5ACBA] font-medium font-Outfit">
                FAQs
              </p>
            </div>
            <div className=" flex flex-col">
              <p className=" font-Outfit text-[#f9f9f9] font-semibold">
                General
              </p>
              <p className=" mt-6 text-[#A5ACBA] font-medium font-Outfit">
                Home
              </p>
              <p className=" mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Products
              </p>
              <p className=" mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Company
              </p>
              <p className=" mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Career
              </p>
              <p className="mt-3 text-[#A5ACBA] font-medium font-Outfit">
                Blog
              </p>
            </div>
          </div>
          <div className=" pt-8 flex flex-col-reverse md:flex-row justify-between items-center">
            <p className=" font-Outfit text-white text-base mt-6 md:mt-0 font-normal">
              © 2024 Veclary. All rights reserved.
            </p>
            <span className=" flex items-center justify-center space-x-6">
              <img src={ig} alt="" />
              <img src={lin} alt="" />
              <img src={tt} alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
