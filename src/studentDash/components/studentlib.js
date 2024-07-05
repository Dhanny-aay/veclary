import arrowBlue from "./assets/arrowblue.svg";
import pbar from "./assets/pbar.svg";
import bookimg from "./assets/bookimg.svg";
import { useContext, useState } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";

const StudentLib = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);

  const mybooks = [
    {
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      img: bookimg,
      progress: "50%",
    },
    {
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      img: bookimg,
      progress: "50%",
    },
    {
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      img: bookimg,
      progress: "50%",
    },
  ];

  const categories = [
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Science",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Science",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Science",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Art",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Art",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Economics",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Economics",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Economics",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Literature",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Literature",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "History",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "History",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "History",
    },
    {
      img: bookimg,
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

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            E-Library
          </p>
        </span>

        <div className=" mt-6 w-full bg-[#F8F8F8] rounded-[10px] p-6">
          <p className=" font-Outfit text-xl font-semibold">My Books</p>

          <div className=" grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 mt-4">
            {mybooks.map((item, index) => (
              <div key={index} className=" flex flex-col w-full">
                <span
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className=" w-full h-[150px] bg-[#fff]"
                ></span>
                <p className=" mt-3 font-Outfit text-xs font-normal">
                  {item.name}
                </p>
                <p className=" font-Outfit text-[10px] text-[#000000CC]">
                  {item.date}
                </p>
                <span className=" flex items-center justify-between mt-2">
                  <img src={pbar} className=" w-[80%]" alt="" />
                  <p className=" font-Outfit text-[8px] font-normal">
                    {item.progress}
                  </p>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className=" mt-6 w-full bg-[#F8F8F8] rounded-[10px] p-6">
          <p className=" font-Outfit text-xl font-semibold">Explore Books</p>
          <div className="flex w-full flex-row items-center justify-start mt-8 overflow-auto border-b pb-3 border-[#EAEBF0]">
            <button
              className={`font-normal font-Outfit text-sm pb-3 text-[#00000080] md:w-auto transition-all ${
                activeButton === "all"
                  ? "border-b-[3px] border-[#0530A1] text-[#0530A1]"
                  : ""
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
                className={`font-normal font-Outfit pb-3 text-sm text-[#00000080] px-5 transition-all ${
                  activeButton === tag
                    ? "border-b-[3px] border-[#0530A1] text-[#0530A1]"
                    : ""
                }`}
                onClick={() => handleButtonClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className=" grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 mt-4">
            {filteredCategories.map((item, index) => (
              <div key={index} className=" flex flex-col w-full">
                <span
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className=" w-full h-[150px] bg-[#fff]"
                ></span>
                <p className=" mt-3 font-Outfit text-xs font-normal">
                  {item.name}
                </p>
                <p className=" font-Outfit text-[10px] text-[#000000CC]">
                  {item.date}
                </p>
                <span className=" flex items-center justify-between mt-2">
                  <img src={pbar} className=" w-[80%]" alt="" />
                  <p className=" font-Outfit text-[8px] font-normal">
                    {item.progress}
                  </p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLib;
