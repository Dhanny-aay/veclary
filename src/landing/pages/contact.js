import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";
import lines from "./assets/lines.svg";
import Faq from "../components/faq";
import contactText from "./assets/contactText.svg";
import contactMessage from "./assets/contactMessage.svg";
import pinMarker from "./assets/pinMark.svg";
import contactCall from "./assets/contactCall.svg";

const Contactus = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
    };

    // Initial check on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div
        style={
          isMobile
            ? {
                backgroundImage: `url(${vector})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {}
        }
      >
        <Navbar />
        <div
          style={
            isMobile
              ? {}
              : {
                  backgroundImage: `url(${lines})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
          }
          className="w-full flex flex-col items-center justify-center py-8 px-4 font-Outfit md:py-16 md:px-20 text-black"
        >
          <p className=" text-center font-Outfit font-semibold text-2xl md:text-[55px] md:leading-[82px]">
            Get In Touch With Us
          </p>
          <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 md:px-[12%]">
            Our Friendly team would love to hear from you.
          </p>
          <div className=" mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6">
            {/* grid 1 */}
            <div className=" w-full bg-[#0530A1] rounded-[10px] p-6">
              <img src={contactText} alt="" />
              <p className=" mt-16 font-Outfit text-white font-semibold text-xl">
                Chat to sales
              </p>
              <p className=" mt-2 text-[#FFFFFFB2] font-Outfit text-base font-normal">
                Speak to our friendly team.
              </p>
              <p className=" mt-5 font-semibold font-Outfit text-base text-white">
                sale@veclary.com
              </p>
            </div>
            {/* grid 2 */}
            <div className=" w-full bg-[#5BC7E1] rounded-[10px] p-6">
              <img src={contactMessage} alt="" />
              <p className=" mt-16 font-Outfit text-white font-semibold text-xl">
                Chat to support
              </p>
              <p className=" mt-2 text-[#FFFFFFB2] font-Outfit text-base font-normal">
                We’re here to help.
              </p>
              <p className=" mt-5 font-semibold font-Outfit text-base text-white">
                support@veclary.com
              </p>
            </div>
            {/* grid 3 */}
            <div className=" w-full bg-[#C901A1] rounded-[10px] p-6">
              <img src={pinMarker} alt="" />
              <p className=" mt-16 font-Outfit text-white font-semibold text-xl">
                Visit us
              </p>
              <p className=" mt-2 text-[#FFFFFFB2] font-Outfit text-base font-normal">
                Visit our office HQ.
              </p>
              <p className=" mt-5 font-semibold font-Outfit text-base text-white">
                100 Smith Street
                <br />
                Collingwood VIC 3066 AU
              </p>
            </div>
            {/* grid 4 */}
            <div className=" w-full bg-[#F98810] rounded-[10px] p-6">
              <img src={contactCall} alt="" />
              <p className=" mt-16 font-Outfit text-white font-semibold text-xl">
                Call us
              </p>
              <p className=" mt-2 text-[#FFFFFFB2] font-Outfit text-base font-normal">
                Mon-Fri from 8am to 5pm.
              </p>
              <p className=" mt-5 font-semibold font-Outfit text-base text-white">
                +234 (810) 000-0000
              </p>
            </div>
          </div>

          <div className=" mt-12 w-full">
            <div className=" flex flex-row  w-full justify-between">
              {/* first name  */}
              <label htmlFor="" className=" flex flex-col w-[48%]">
                <p className=" font-Outfit font-medium text-[#344054] text-sm">
                  First Name
                </p>
                <input
                  type="text"
                  className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal text-base font-Outfit text-[#667085]"
                  placeholder="First name"
                />
              </label>
              {/* Last name  */}
              <label htmlFor="" className=" flex flex-col w-[48%]">
                <p className=" font-Outfit font-medium text-[#344054] text-sm">
                  Last Name
                </p>
                <input
                  type="text"
                  className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal text-base font-Outfit text-[#667085]"
                  placeholder="Last name"
                />
              </label>
            </div>
            {/* Email  */}
            <label htmlFor="" className=" flex mt-6 flex-col w-full">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Email
              </p>
              <input
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal text-base font-Outfit text-[#667085]"
                placeholder="you@company.com"
              />
            </label>
            {/* Phone number  */}
            <label htmlFor="" className=" flex mt-6 flex-col w-full">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Phone number
              </p>
              <div className=" w-full mt-[6px] flex">
                <select
                  name=""
                  className=" h-12 w-[7%] rounded-l-[8px] border-y border-l border-[#D0D5DD] pl-4 text-[#101828] font-Outfit text-base font-normal"
                  id=""
                >
                  <option value="">US</option>
                </select>
                <input
                  type="text"
                  className=" w-[93%] h-12 rounded-r-[8px] py-3 px-4 border-y border-r border-[#D0D5DD] font-normal text-base font-Outfit text-[#667085]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </label>
            {/* Message  */}
            <label htmlFor="" className=" flex mt-6 flex-col w-full">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Message
              </p>
              <textarea
                type="text"
                className=" w-full rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal text-base font-Outfit text-[#667085]"
                placeholder=""
              ></textarea>
            </label>
            <span className=" flex flex-row space-x-3 items-center mt-6">
              <input
                type="checkbox"
                name=""
                className=" w-5 h-5 border-[#D0D5DD]"
                id=""
              />
              <p className=" font-Outfit text-[#475467] text-base font-normal">
                You agree to our friendly{" "}
                <span className=" underline text-[#475467]">
                  privacy policy
                </span>
                .
              </p>
            </span>
            <button className=" mt-6 w-full text-center bg-[#0530A1] h-[48px] rounded-[8px] font-Outfit font-semibold text-white text-base">
              Send message
            </button>
          </div>
        </div>
        <Faq />
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default Contactus;
