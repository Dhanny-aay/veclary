import { useContext, useEffect, useState } from "react";
import userPlus from "./assets/user-plus.svg";
import arrowBlue from "./assets/arrowblue.svg";
import heart from "./assets/heart.svg";
import bookimg from "./assets/bookimg.svg";
import {
  CurrAuthorIDContext,
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";
import { handleGetPublisherAuthorById } from "../../controllers/publisherController/authorController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VendorAuthorProfile = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);
  const { currAuthorID } = useContext(CurrAuthorIDContext);
  const [loading, setLoading] = useState(true);
  const [authorDetails, setAuthorDetails] = useState([]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const fetchAuthorByID = async () => {
      try {
        const data = await handleGetPublisherAuthorById(currAuthorID);
        if (data) {
          const recievedItems = data;
          setAuthorDetails(recievedItems);
        } else {
          // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorByID();
  }, []);

  console.log(authorDetails);

  const categories = [
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Novels",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Novels",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Novels",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Novels",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Text Books",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Text Books",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Text Books",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Novels",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Novels",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Novels",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Others",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Others",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Others",
    },
    {
      img: bookimg,
      name: "Chalice of the Gods",
      date: "February 24, 2023",
      tag: "Others",
    },
  ];

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

  //states
  const [activeButton, setActiveButton] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Authors")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Author's Profile
          </p>
        </span>

        <div className=" mt-8 flex items-center flex-row px-6 justify-between">
          <div className=" flex items-center space-x-4">
            <span className=" w-[160px] h-[160px] rounded-[50%] bg-[#f8f8f8] border-4 border-white shadow shadow-[#10182814]"></span>
            <span>
              {loading ? (
                <Skeleton width={200} height={30} />
              ) : (
                authorDetails &&
                authorDetails.user && (
                  <p className="font-medium text-3xl text-[#101828] font-Outfit capitalize">
                    {authorDetails.user.name}
                  </p>
                )
              )}

              {loading ? (
                <Skeleton width={300} height={15} />
              ) : (
                authorDetails &&
                authorDetails.user && (
                  <p className="font-normal text-sm font-Outfit text-[#667085]">
                    {authorDetails.user.email}
                  </p>
                )
              )}

              {/* <span className=" mt-3 flex space-x-3">
                <button className=" py-1 px-2 rounded-[15px] bg-[#17BD8D1A] text-[#17BD8D] font-Outfit text-xs font-normal">
                  Novels
                </button>
                <button className=" py-1 px-2 rounded-[15px] bg-[#17BD8D1A] text-[#17BD8D] font-Outfit text-xs font-normal">
                  Text-Books
                </button>
              </span> */}
            </span>
          </div>

          <div className=" space-x-4 flex">
            <button className=" flex items-center space-x-2 px-4 py-2 border border-[#D0D5DD] rounded-[8px]">
              <img src={heart} alt="" />
              <p className=" font-Outfit text-sm font-semibold text-[#344054]">
                Favorite
              </p>
            </button>
            <button className=" flex items-center space-x-2 px-4 py-2 bg-[#0530A1] rounded-[8px]">
              <img src={userPlus} alt="" />
              <p className=" font-Outfit text-sm font-semibold text-[#fff]">
                Share
              </p>
            </button>
          </div>
        </div>

        <div className=" mt-6 px-6">
          <p className=" font-Outfit font-semibold text-xl text-[#101828]">
            Explore Books by Author
          </p>
          <div className="flex w-full flex-row items-center justify-start mt-8 overflow-auto border-b pb- border-[#EAEBF0]">
            <button
              className={`font-normal font-Outfit text-sm pb-3 text-[#00000080] md:w-auto transition-all ${
                activeButton === "all"
                  ? "border-b-[3px] border-[#0530A1] text-[#0530A1]"
                  : ""
              }`}
              onClick={() => handleButtonClick("all")}
            >
              All Books
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorAuthorProfile;
