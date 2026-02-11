import arrowBlue from "./assets/arrowblue.svg";
import pbar from "./assets/pbar.svg";
import bookimg from "./assets/bookimg.svg";
import { useContext, useEffect, useState } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import { handleGetLibary } from "../../controllers/studentControllers/eLibaryController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import nonoti from "./assets/nonoti.svg";
import { Book, Download, PlayCircle } from "lucide-react";
import BookReader from "./bookReader";

const StudentLib = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);

  // States
  const [activeButton, setActiveButton] = useState("all");
  const [libary, setLibary] = useState({ resources: [] });
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readingState, setReadingState] = useState({
    isOpen: false,
    fileUrl: null,
    bookId: null,
    bookName: "",
  });

  // Mock PDF for testing/fallback
  const MOCK_PDF_URL =
    "https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf";

  // Filter Categories Logic
  const uniqueTags = libary.resources
    ? Array.from(new Set(libary.resources.map((item) => item.tag || "General")))
    : [];

  const displayedResources =
    activeButton === "all"
      ? libary.resources
      : libary.resources.filter(
          (item) => (item.tag || "General") === activeButton,
        );

  // Function to handle button click
  const handleButtonClick = (tag) => {
    setActiveButton(tag);
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  // Update 'My Books' based on local storage progress
  const updateMyBooks = () => {
    if (!libary?.resources) return;

    const started = libary.resources
      .map((book) => {
        const percent = localStorage.getItem(
          "book_progress_percent_" + book._id,
        );
        if (percent) {
          return {
            ...book,
            progress: percent + "%",
            lastRead: localStorage.getItem("book_last_read_" + book._id),
          };
        }
        return null;
      })
      .filter(Boolean);

    setMyBooks(started);
  };

  const handleOpenBook = (book) => {
    setReadingState({
      isOpen: true,
      fileUrl: book.file?.url || MOCK_PDF_URL, // Use real URL or mock
      bookId: book._id,
      bookName: book.name,
    });
  };

  const handleCloseBook = () => {
    setReadingState({ ...readingState, isOpen: false });
    updateMyBooks(); // Refresh progress when closing
  };

  const onProgressUpdate = (bookId, progress) => {
    // Optional: Live update logic if needed, but we update on close mostly
  };

  useEffect(() => {
    const fetchLibary = async () => {
      try {
        const data = await handleGetLibary();
        // Inject a robust test object if data is empty or for testing
        const testObject = {
          _id: "test-pdf-1",
          name: "Functional Test PDF (Percy Jackson Demo)",
          file: { url: MOCK_PDF_URL },
          image: null,
          tag: "Fiction",
          createdAt: new Date().toISOString(),
        };

        if (data && data.resources) {
          // Append test object for verification
          setLibary({ ...data, resources: [testObject, ...data.resources] });
        } else {
          // Fallback if API fails/returns nothing
          setLibary({ resources: [testObject] });
        }
      } catch (error) {
        console.error("Error fetching library:", error);
        // Fallback on error
        setLibary({
          resources: [
            {
              _id: "test-pdf-error-fallback",
              name: "Test PDF (Network Error)",
              file: { url: MOCK_PDF_URL },
              tag: "Error",
              createdAt: new Date().toISOString(),
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLibary();
  }, []);

  // Update myBooks whenever library changes
  useEffect(() => {
    updateMyBooks();
  }, [libary]);

  return (
    <>
      {readingState.isOpen && (
        <BookReader
          fileUrl={readingState.fileUrl}
          bookId={readingState.bookId}
          bookName={readingState.bookName}
          onClose={handleCloseBook}
          onProgressUpdate={onProgressUpdate}
        />
      )}

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

        {/* MY BOOKS SECTION */}
        <div className=" mt-6 w-full bg-[#F8F8F8] rounded-[10px] p-6">
          <p className=" font-Outfit text-xl font-semibold">
            My Books (In Progress)
          </p>

          {myBooks.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-10 text-[#9E9E9E]">
              <p className="font-Outfit text-sm">
                You haven't started any books yet.
              </p>
            </div>
          ) : (
            <div className=" grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 mt-4">
              {myBooks.map((item, index) => (
                <div
                  key={index}
                  className=" flex flex-col w-full cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleOpenBook(item)}
                >
                  <span
                    style={{
                      backgroundImage: item.image
                        ? `url(${item.image})`
                        : "none",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundColor: "#fff",
                    }}
                    className=" w-full h-[150px] bg-[#fff] flex items-center justify-center border border-gray-200 rounded-sm"
                  >
                    {!item.image && (
                      <Book size={40} className="text-gray-400" />
                    )}
                  </span>
                  <p className=" mt-3 font-Outfit text-xs font-normal truncate">
                    {item.name}
                  </p>
                  <p className=" font-Outfit text-[10px] text-[#000000CC]">
                    Last read:{" "}
                    {item.lastRead
                      ? new Date(item.lastRead).toLocaleDateString()
                      : "Recently"}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-2 w-full">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-200">
                      <div
                        className="bg-[#0530A1] h-1.5 rounded-full"
                        style={{ width: item.progress }}
                      ></div>
                    </div>
                    <p className="font-Outfit text-[8px] font-normal text-right mt-1">
                      {item.progress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* EXPLORE BOOKS SECTION */}
        <div className=" mt-6 w-full bg-[#F8F8F8] rounded-[10px] p-6 mb-20">
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
            {uniqueTags.map((tag, index) => (
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
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 mt-4">
            {loading ? (
              <>
                {Array(7)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="flex flex-col w-full">
                      <Skeleton height={150} width="100%" />
                      <Skeleton height={10} width="100%" className="mt-3" />
                      <Skeleton height={8} width="80%" className="mt-1" />
                    </div>
                  ))}
              </>
            ) : !displayedResources?.length ? (
              <div className="flex flex-col col-span-full items-center justify-center w-full h-[300px]">
                <img src={nonoti} className="mt-7" alt="No items" />
                <p className="font-Outfit text-center font-medium mt-3 text-base">
                  No Items Available
                </p>
                <p className="font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                  When you have items you’ll see them here
                </p>
              </div>
            ) : (
              displayedResources.map((item) => (
                <div key={item._id} className="flex flex-col w-full group">
                  <span
                    style={{
                      backgroundImage: item?.image
                        ? `url(${item?.image})`
                        : "none",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundColor: item?.image ? "#fff" : "#fff",
                    }}
                    className="w-full h-[150px] flex items-center justify-center border border-gray-200 rounded-sm cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
                    onClick={() => handleOpenBook(item)}
                  >
                    {!item?.image && <Book size={50} color="#666" />}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="text-white w-10 h-10" />
                    </div>
                  </span>
                  <p
                    className="mt-3 font-Outfit text-xs font-normal overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ maxWidth: "100%" }}
                  >
                    {item.name}
                  </p>
                  <p className="font-Outfit text-[10px] text-[#000000CC] mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 bg-[#0530A1] text-white text-[10px] font-medium py-1.5 rounded-[4px] flex items-center font-Outfit justify-center hover:bg-[#042882]"
                      onClick={() => handleOpenBook(item)}
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLib;
