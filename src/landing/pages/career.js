import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";
import lines from "./assets/lines.svg";
import arrowUpRight from "./assets/arrow-up-right.svg";
import pin from "./assets/map-pin.svg";
import clock from "./assets/clock.svg";

const Career = () => {
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

  const careerArray = [
    { name: "Product Designer", type: "Design" },
    { name: "Engineering Manager", type: "Software Development" },
    { name: "Customer Success Manager", type: "Customer Success" },
    { name: "Account Executive", type: "Sales" },
    { name: "SEO Marketing Manager", type: "Marketing" },
  ];

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
            Career
          </p>
          <p className=" font-Outfit text-center text-sm md:text-xl text-[#101828] font-normal mt-3 md:px-[12%]">
            Veclary is growing fast, and we are always looking for passionate,
            dynamic, and talented individuals to join our distributed team all
            around the world.
          </p>
          <div className=" w-full mt-12">
            <p className=" text-[#101828] font-semibold text-2xl md:text-[32px] font-Outfit">
              All Open Roles
            </p>
            <div className=" mt-8 w-full grid grid-cols-1 gap-6">
              {careerArray.map((item, index) => (
                <div
                  key={index}
                  className=" border border-[#E4E7EC] p-6 bg-white rounded-[16px]"
                >
                  <div className=" w-full flex items-center justify-between">
                    <p className=" text-xs md:text-base text-[#0530A1] font-Outfit font-semibold">
                      {item.type}
                    </p>
                    <button className=" flex items-center space-x-2">
                      <p className=" text-xs md:text-base text-[#0530A1] font-Outfit font-semibold">
                        View job
                      </p>
                      <img src={arrowUpRight} alt="" />
                    </button>
                  </div>
                  <p className=" mt-1 text-[#101828] font-Outfit text-lg md:text-2xl font-semibold">
                    {item.name}
                  </p>
                  <div className=" mt-4 space-x-6 flex items-center">
                    <div className=" flex space-x-2 items-center">
                      <img src={pin} alt="" />
                      <p className=" font-Outfit font-medium text-xs md:text-base text-[#475467]">
                        Remote
                      </p>
                    </div>
                    <div className=" flex space-x-2 items-center">
                      <img src={clock} alt="" />
                      <p className=" font-Outfit font-medium text-xs md:text-base text-[#475467]">
                        Full-Time
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default Career;
