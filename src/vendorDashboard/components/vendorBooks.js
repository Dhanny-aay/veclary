import { useContext, useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import upload from "./assets/upload.svg";
import file from "./assets/file.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";

import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";

import AddBook from "./addBook";
import { handleGetPublisherBooks } from "../../controllers/publisherController/booksContoller";
import LoadingTable from "../../utils/loadingTable";
import { handleGetAuthorBooks } from "../../controllers/authorController/generalContoller";

const VendorBooks = ({ role }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noBooks, setNoBooks] = useState(false);

  const fetchBooks = async () => {
    setLoading(true); // Start loading when fetching books
    try {
      let data;

      // Check role and fetch the appropriate books
      if (role === "AUTHOR") {
        data = await handleGetAuthorBooks(); // Fetch books for authors
      } else {
        data = await handleGetPublisherBooks(); // Fetch books for publishers
      }

      if (data && data.message === "No books found") {
        setNoBooks(true); // Set noBooks to true if no books found
        setBooks([]); // Clear the books array
      } else {
        setBooks(data); // Set the books if data is available
        setNoBooks(false); // Reset noBooks if books are found
      }
    } catch (error) {
      setNoBooks(true); // Set noBooks to true in case of error
    } finally {
      setLoading(false); // Stop loading when fetch is complete
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [role]); // Include role as a dependency to refetch books when role changes

  console.log(books);

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

  return (
    <>
      {/* upload book component */}
      {uploadBook && <AddBook role={role} setUploadBook={setUploadBook} />}

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
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
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
            className=" px-6 py-3 flex items-center space-x-3 rounded-[10px] bg-[#0530A1]"
          >
            <img src={upload} alt="" />
            <p className=" font-Outfit text-sm font-medium text-white">
              Upload a book
            </p>
          </button>

          {/* <div className="flex w-full flex-row items-center justify-start mt-8 overflow-auto border-b pb- border-[#EAEBF0]">
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
          </div> */}

          <div className=" w-full mt-6 ">
            <div className=" w-full border border-[#EAEBF0] rounded-[10px]">
              {loading ? (
                // Show loading spinner while fetching data
                <tr>
                  <td colSpan="6">
                    <LoadingTable />
                  </td>
                </tr>
              ) : noBooks ? (
                // Show "No authors found" message

                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-center font-Outfit text-[#667085] text-sm"
                  >
                    There are no Books yet.
                  </td>
                </tr>
              ) : (
                <div className=" flex flex-col space-y-3 w-full h-full p-4">
                  {books.map((item) => (
                    <div
                      key={item._id}
                      className=" w-full py-3 border-b border-[#EAEBF0] flex flex-row items-center justify-between"
                    >
                      <div className=" flex flex-row space-x-3">
                        <img src={file} alt="" />
                        <div className="">
                          <p className=" font-Outfit font-medium text-[#272D37] text-xs capitalize">
                            {item.title}
                          </p>
                          {item.labels.map((item) => (
                            <p className=" font-Outfit text-[10px] text-[#5F6D7E] capitalize">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                      <span className=" flex space-x-3">
                        <img src={edit} className=" w-4" alt="" />
                        <img src={trash} className=" w-4" alt="" />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorBooks;
