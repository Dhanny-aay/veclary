import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import vector from "./assets/Vector.svg";
import search from "./assets/search-normal.svg";
import { useState, useEffect } from "react";
import lines from "./assets/lines.svg";
import img1 from "./assets/img1.svg";
import img2 from "./assets/img2.svg";
import img3 from "./assets/img3.svg";
import img4 from "./assets/img4.svg";
import img5 from "./assets/img5.svg";
import img6 from "./assets/img6.svg";
import img7 from "./assets/img7.svg";

const Libary = () => {
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

  const categories = [
    {
      img: img1,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Science",
    },
    {
      img: img2,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Science",
    },
    {
      img: img3,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Science",
    },
    {
      img: img4,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Art",
    },
    {
      img: img5,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Art",
    },
    {
      img: img6,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Economics",
    },
    {
      img: img7,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Economics",
    },
    {
      img: img1,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Economics",
    },
    {
      img: img2,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Literature",
    },
    {
      img: img3,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Literature",
    },
    {
      img: img4,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "History",
    },
    {
      img: img5,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "History",
    },
    {
      img: img6,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "History",
    },
    {
      img: img7,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "History",
    },
  ];

  //states
  const [activeButton, setActiveButton] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  // Function to handle button click
  const handleButtonClick = (tag) => {
    setActiveButton(tag);
    if (tag === "all") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) => category.tag === tag);
      setFilteredCategories(filtered);
    }
  };

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
            Our Vast E-library
          </p>
          <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 md:px-[12%]">
            Seamlessly connect educators, students, and parents, while nurturing
            collaboration and individual exploration through our powerful
            education suite.
          </p>
          <div className=" w-full md:w-[500px] lg:w-[500px] h-[54px] border-[3px] border-[#F1F1F1] rounded-[10px] relative flex items-center justify-between mt-12 bg-white pr-[6px]">
            <img src={search} className=" absolute left-5" alt="" />
            <input
              type="text"
              placeholder="Search for Books"
              className=" placeholder:text-[#000000CC] pl-12 font-Outfit h-[54px] w-full border-y-[3px] border-[#F1F1F1]"
            />
            <button className=" px-8 py-[8px] rounded-[5px] bg-[#0530A1] font-Outfit text-center font-semibold text-base text-white">
              Search
            </button>
          </div>

          {/* Toggle options */}
          <div className="flex w-full flex-row items-center justify-start md:justify-center mt-8 overflow-auto">
            <button
              className={`font-normal font-Outfit text-base md:text-xl md:w-auto transition-all ${
                activeButton === "all" ? "border-b-2 border-[#000]" : ""
              }`}
              onClick={() => handleButtonClick("all")}
            >
              All categories
            </button>
            {/* Display unique categories */}
            {Array.from(
              new Set(categories.map((category) => category.tag))
            ).map((tag, index) => (
              <button
                key={index}
                className={`font-normal font-Outfit text-base md:text-xl px-5 transition-all ${
                  activeButton === tag ? "border-b-2 border-[#000]" : ""
                }`}
                onClick={() => handleButtonClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className=" w-full mt-8 grid grid-cols-4 lg:grid-cols-7 gap-[3%] mb-32 md:mb-0">
            {filteredCategories.map((item, index) => (
              <div key={index} className=" w-full mt-4">
                <div
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className=" w-full h-[200px] rounded-md bg-[#f1f1f1]"
                ></div>
                <p className=" font-Outfit mt-3 text-sm md:text-base font-normal leading-5">
                  {item.name}
                </p>
                <button className=" w-full bg-[#0530A1] rounded-[8px] h-8 mt-[6px] text-white font-medium text-xs font-Outfit">
                  Buy Now
                </button>
                <button className=" w-full bg-[#F5F5F4] rounded-[8px] h-8 mt-1 text-black font-medium text-xs font-Outfit">
                  Buy Now
                </button>
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

export default Libary;
