import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import lines from "./assets/lines.svg";
import blog1 from "./assets/blog1.svg";
import blog2 from "./assets/blog2.svg";
import blog3 from "./assets/blog3.svg";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";

const Blogpage = () => {
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

  const blogs = [
    {
      image: blog1,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog2,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog3,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog1,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog2,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog3,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog1,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog2,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog3,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
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
          <p className=" text-center font-Outfit font-semibold text-2xl md:text-[55px] md:leading-[82px]">
            Our Blog
          </p>
          <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 md:px-[12%]">
            The latest industry news, interviews, technologies, and resources.
          </p>

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 my-16 w-full">
            {blogs.map((item, index) => (
              <div key={index} className=" w-full">
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className=" w-full h-[285px] rounded-[8px]"
                ></div>
                <p className=" mt-4  text-[#5F6D7E] text-sm font-Outfit font-medium">
                  {item.date}
                </p>
                <p className=" font-Outfit font-semibold text-[#272D37] text-[22px] mt-2">
                  {item.title}
                </p>
                <p className=" text-[#0530A1] font-Outfit text-[15px] font-semibold mt-4">
                  Read more
                </p>
              </div>
            ))}
          </div>
        </div>
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default Blogpage;
