import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";
import lines from "./assets/lines.svg";
import addImg from "./assets/Add button.svg";

const Application = () => {
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
          <p className=" text-center font-Outfit font-semibold text-2xl md:text-[55px] text-[#101828] md:leading-[82px]">
            Senior Accountant
          </p>

          <div className=" flex items-center flex-row space-x-8 mt-6">
            <p className=" text-[#676767] font-Outfit font-medium text-xl">
              Lagos, Nigeria
            </p>
            <p className=" text-[#676767] font-Outfit font-medium text-xl -mt-0">
              Posted: 10/11/2023
            </p>
          </div>
          <p className=" mt-16 text-center text-[32px] text-[#121212] font-normal font-Outfit">
            Basic Info
          </p>
          <div className=" mt-8 md:px-[15%] w-full">
            <div className=" flex flex-row  w-full justify-between">
              {/* Phone number  */}
              <label htmlFor="" className=" flex  flex-col w-[48%]">
                <p className=" font-Outfit font-medium text-[#344054] text-sm">
                  Surname
                </p>
                <div className=" w-full mt-[6px] flex">
                  <select
                    name=""
                    className=" h-12 w-[20%] rounded-l-[8px] border-y border-l bg-[#F5F5F4] border-[#D0D5DD] pl-4 text-[#1E1E1E33] font-Outfit text-base font-normal"
                    id=""
                  >
                    <option value="">Mr</option>
                  </select>
                  <input
                    type="text"
                    className=" w-[80%] h-12 rounded-r-[8px] py-3 px-4 border-y border-r bg-[#F5F5F4] border-[#D0D5DD] font-normal text-base font-Outfit text-[#667085]"
                    placeholder="Enter surname"
                  />
                </div>
              </label>
              {/* First name  */}
              <label htmlFor="" className=" flex flex-col w-[48%]">
                <p className=" font-Outfit font-medium text-[#344054] text-sm">
                  First Name
                </p>
                <input
                  type="text"
                  className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
                  placeholder="Enter First name"
                />
              </label>
            </div>
            {/*Country of residence  */}
            <label htmlFor="" className=" flex flex-col w-full mt-6">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Country of residence
              </p>
              <input
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
                placeholder="Enter email address"
              />
            </label>
            {/*State  */}
            <label htmlFor="" className=" flex flex-col w-full mt-6">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                State
              </p>
              <input
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
                placeholder="State"
              />
            </label>
            {/*Email  */}
            <label htmlFor="" className=" flex flex-col w-full mt-6">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Email
              </p>
              <input
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
                placeholder="Email"
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
                  className=" h-12 w-[10%] rounded-l-[8px] border-y border-l border-[#D0D5DD] bg-[#F5F5F4] pl-4 text-[#101828] font-Outfit text-base font-normal"
                  id=""
                >
                  <option value="">US</option>
                </select>
                <input
                  type="text"
                  className=" w-[90%] h-12 rounded-r-[8px] py-3 px-4 border-y border-r border-[#D0D5DD] bg-[#F5F5F4] font-normal text-base font-Outfit text-[#667085]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </label>
            {/*LinkedIn   */}
            <label htmlFor="" className=" flex flex-col w-full mt-6">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                LinkedIn
              </p>
              <input
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
                placeholder="LinkedIn "
              />
            </label>

            <div className=" flex md:flex-row flex-col  w-full justify-between mt-6">
              {/* Highest education  */}
              <label htmlFor="" className=" flex  flex-col w-full  md:w-[48%]">
                <p className=" font-Outfit font-medium text-[#344054] text-sm">
                  Highest education
                </p>
                <select
                  name=""
                  className="  w-full h-12 mt-[6px] rounded-[8px] py-3 px-4 border bg-[#F5F5F4] border-[#D0D5DD] font-normal text-base font-Outfit text-[#667085]"
                  id=""
                >
                  <option value="">Choose level of education</option>
                </select>
              </label>
              {/* Year of completion of Highest education  */}
              <label
                htmlFor=""
                className=" flex flex-col w-full mt-6 md:mt-0 md:w-[48%]"
              >
                <p className=" font-Outfit font-medium text-[#344054] text-sm">
                  Year of completion of Highest education
                </p>
                <input
                  type="text"
                  className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
                  placeholder="Enter Year"
                />
              </label>
            </div>

            {/*Years of experience   */}
            <label htmlFor="" className=" flex flex-col w-full mt-6">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Years of experience
              </p>
              <input
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
                placeholder="Years of experience "
              />
            </label>

            {/*Area of specialization   */}
            <label htmlFor="" className=" flex flex-col w-full mt-6">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Area of specialization
              </p>
              <select
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
              >
                <option value="">Choose Area of specialization</option>
              </select>
            </label>

            {/*Preferred job location   */}
            <label htmlFor="" className=" flex flex-col w-full mt-6">
              <p className=" font-Outfit font-medium text-[#344054] text-sm">
                Preferred job location
              </p>
              <select
                type="text"
                className=" w-full h-12 rounded-[8px] py-3 px-4 border border-[#D0D5DD] mt-[6px] font-normal bg-[#F5F5F4] text-base font-Outfit text-[#1E1E1E33]"
              >
                <option value="">Choose Preferred job location</option>
              </select>
            </label>

            <div className="  mt-6 w-full border border-[#DAE0E6] rounded-[10px] h-[164px] bg-[#F5F5F4] flex flex-col items-center justify-center">
              <img src={addImg} alt="" />
              <p className=" text-center text-[#5F6D7E] font-Outfit font-normal text-base">
                Upload your resume or drag and drop it here
                <br /> Only .doc, .docx, .pdf, .odt, .rtf
                <br /> (Optional)
              </p>
            </div>
            <button className=" mt-6 w-full text-center bg-[#0530A1] h-[48px] rounded-[8px] font-Outfit font-semibold text-white text-base">
              Submit Application
            </button>
          </div>
        </div>
      </div>
      <Banner />
      <Footer />
    </>
  );
};

export default Application;
