import { useContext, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import upload from "./assets/upload.svg";
import file from "./assets/file.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import uplo from "./assets/uplo.svg";
import cross from "./assets/cross.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";
import x from "./assets/x.svg";
import x1 from "./assets/x (1).svg";
import x2 from "./assets/x (2).svg";
import pload from "./assets/pload.svg";

const VendorBooks = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const categories = [
    { name: "Veclary Resources", size: "80.69 mb", tag: " Non Academic Books" },
    { name: "Veclary Updates", size: "320.69 mb", tag: " Non Academic Books" },
    { name: "Basic Science Jss 2", size: "100.69 mb", tag: "Academic Books" },
    { name: "Basic Science Jss 2", size: "100.69 mb", tag: "Academic Books" },
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
  const [uploadBook, setUploadBook] = useState(false);
  const [schedule, setSchedule] = useState(false);

  return (
    <>
      {/* upload book component */}
      {uploadBook && (
        <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999]  fixed top-0 md:pb-[120px] -left-[20%] flex justify-center items-center">
          <div className="ml-[20%] h-[90%]  mt-[100px] bg-[#FFFFFF] p-6 rounded-[15px]  w-full md:w-[500px]">
            <div className=" w-full h-full bg-[#fff] overflow-auto rounded-[15px]">
              <span className=" w-full flex items-center justify-between">
                <img src={uplo} alt="" />
                <img
                  onClick={() => {
                    setUploadBook(false);
                  }}
                  src={cross}
                  className=" w-4"
                  alt=""
                />
              </span>
              <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                Upload a Book
              </p>
              <div className=" w-full flex flex-row justify-between items-center">
                <label
                  htmlFor=""
                  className=" w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Title
                  <input
                    type="text"
                    name=""
                    placeholder="Enter title of Book"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>
                <label
                  htmlFor=""
                  className=" w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Book ISBN
                  <input
                    type="text"
                    name=""
                    placeholder="Enter book ISN"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>
              </div>

              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Book Description
                <textarea
                  type="text"
                  name=""
                  placeholder="Enter book Description"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>

              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Add book label
                <input
                  type="text"
                  name=""
                  placeholder="Search for Label"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>

              <span className=" flex flex-row items-center space-x-3 mt-6">
                <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#026AA2] bg-[#f0f9ff]">
                  <p className="">Sci-Fi</p>
                  <img src={x} alt="" />
                </button>
                <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#3538CD] bg-[#EEF4FF]">
                  <p className="">Novel</p>
                  <img src={x1} alt="" />
                </button>
                <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#C11574] bg-[#FDF2FA]">
                  <p className="">Read Alone</p>
                  <img src={x2} alt="" />
                </button>
              </span>

              <div className=" mt-6 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-3">
                <img src={pload} alt="" />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#2F52FF] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>

              {schedule && (
                <div className=" w-full flex flex-row justify-between items-center">
                  <label
                    htmlFor=""
                    className=" w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Select time
                    <input
                      type="text"
                      name=""
                      placeholder=""
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>
                  <label
                    htmlFor=""
                    className=" w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Select date
                    <input
                      type="text"
                      name=""
                      placeholder=""
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>
                </div>
              )}

              {schedule === false && (
                <div className=" w-full mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setSchedule(true);
                    }}
                    className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Schedule Publish
                  </button>
                  <button
                    onClick={() => {
                      setUploadBook(false);
                    }}
                    className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#2F52FF] font-semibold text-base"
                  >
                    Publish Now
                  </button>
                </div>
              )}

              {schedule && (
                <div className=" w-full mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setUploadBook(false);
                    }}
                    className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Cancel
                  </button>
                  <button className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#2F52FF] font-semibold text-base">
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Books(main) Component */}
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#2F52FF] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            My Books
          </p>
        </span>

        <div className=" px-6 mt-6">
          <button
            onClick={() => {
              setUploadBook(true);
            }}
            className=" px-6 py-3 flex items-center space-x-3 rounded-[10px] bg-[#2F52FF]"
          >
            <img src={upload} alt="" />
            <p className=" font-Outfit text-sm font-medium text-white">
              Upload a book
            </p>
          </button>

          <div className="flex w-full flex-row items-center justify-start mt-8 overflow-auto border-b pb- border-[#EAEBF0]">
            <button
              className={`font-normal font-Outfit text-sm pb-3 text-[#00000080] md:w-auto transition-all ${
                activeButton === "all"
                  ? "border-b-[3px] border-[#2F52FF] text-[#2F52FF]"
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
                    ? "border-b-[3px] border-[#2F52FF] text-[#2F52FF]"
                    : ""
                }`}
                onClick={() => handleButtonClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className=" w-full mt-6 ">
            <div className=" w-full border border-[#EAEBF0] rounded-[10px]">
              <div className=" flex flex-col space-y-3 w-full h-full p-4">
                {filteredCategories.map((item, index) => (
                  <div
                    key={index}
                    className=" w-full py-3 border-b border-[#EAEBF0] flex flex-row items-center justify-between"
                  >
                    <div className=" flex flex-row space-x-3">
                      <img src={file} alt="" />
                      <div className="">
                        <p className=" font-Outfit font-medium text-[#272D37] text-xs">
                          {item.name}
                        </p>
                        <p className=" font-Outfit text-[8px] text-[#5F6D7E]">
                          {item.size}
                        </p>
                      </div>
                    </div>
                    <span className=" flex space-x-3">
                      <img src={edit} className=" w-4" alt="" />
                      <img src={trash} className=" w-4" alt="" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorBooks;
