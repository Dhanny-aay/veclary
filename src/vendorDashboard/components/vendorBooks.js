import { useContext, useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import upload from "./assets/upload.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import file from "./assets/file.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";

import AddBook from "./addBook";
import { handleGetPublisherBooks } from "../../controllers/publisherController/booksContoller";
import { handleGetAuthorBooks } from "../../controllers/authorController/generalContoller";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import DeleteBook from "./deleteBook";

const VendorBooks = ({ role }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noBooks, setNoBooks] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };
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
  }, [role, trigger]);

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
  const [makeDelete, setMakeDelete] = useState(false);
  const [bookID, setBookID] = useState("");

  const toggleModal = (_id) => {
    setMakeDelete(true);
    setBookID(_id);
  };

  return (
    <>
      {uploadBook && (
        <AddBook
          role={role}
          triggerFetch={triggerFetch}
          setUploadBook={setUploadBook}
        />
      )}
      {makeDelete && (
        <DeleteBook
          bookID={bookID}
          triggerFetch={triggerFetch}
          setMakeDelete={setMakeDelete}
        />
      )}

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

          <div className="w-full mt-6">
            <div className="w-full border border-[#EAEBF0] rounded-[10px] p-4">
              {loading ? (
                <GenericLoadingSkeleton count={3} height={100} />
              ) : noBooks ? (
                <div className="text-center p-8">
                  <p className="font-Outfit text-[#667085] text-base">
                    You have not uploaded any books yet.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 w-full h-full">
                  {books.map((item) => (
                    <div
                      key={item._id}
                      className="w-full py-3 border-b border-[#EAEBF0] flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div className="flex flex-row space-x-4 items-start">
                        <img
                          src={file}
                          alt={item.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <p className=" font-Outfit font-medium text-[#272D37] text-xs capitalize">
                            {item.title}
                          </p>
                          <p className="font-Outfit text-[10px] text-[#5F6D7E] mt-1">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.labels
                              .join(",")
                              .split(",")
                              .map(
                                (label, index) =>
                                  label && (
                                    <span
                                      key={index}
                                      className="bg-[#F0F2F5] text-[#344054] text-[10px] font-medium px-2 py-0.5 rounded-full"
                                    >
                                      {label}
                                    </span>
                                  )
                              )}
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-[10px] text-[#667085] font-Outfit">
                            <p className=" block">
                              Created:{" "}
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                            {/* <p className=" block">
                              Published:{" "}
                              {item.status === "PUBLISHED"
                                ? new Date(item.updatedAt).toLocaleDateString()
                                : "N/A"}
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <span className="flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-y-0 md:space-x-3 mt-3 md:mt-0">
                        <button
                          className={`py-1 px-2 text-xs font-medium rounded-[18px] font-Outfit flex items-center space-x-2 ${
                            item.status === "PENDING"
                              ? "text-[#344054] bg-[#3440541a]"
                              : item.status === "PUBLISHED"
                              ? "text-[#027A48] bg-[#027A481a]"
                              : "text-[#B42318] bg-[#B423181a]"
                          }`}
                        >
                          <span
                            className={`w-[6px] h-[6px] rounded-full ${
                              item.status === "PENDING"
                                ? "bg-[#344054]"
                                : item.status === "PUBLISHED"
                                ? "bg-[#027A48]"
                                : "bg-[#B42318]"
                            }`}
                          ></span>
                          <p>
                            {item.status === "PENDING"
                              ? "Pending approval"
                              : item.status}
                          </p>
                        </button>
                        {/* <img
                          src={edit}
                          className="w-4 cursor-pointer"
                          alt="Edit"
                        /> */}
                        <img
                          src={trash}
                          onClick={() => toggleModal(item._id)}
                          className="w-4 cursor-pointer"
                          alt="Delete"
                        />
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
