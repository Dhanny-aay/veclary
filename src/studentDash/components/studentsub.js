import arrowBlue from "./assets/arrowblue.svg";
import biology from "./assets/biolo.svg";
import chem from "./assets/chemistry.svg";
import maths from "./assets/math.svg";
import geopgraphy from "./assets/geo.svg";
import hist from "./assets/hist.svg";
import phys from "./assets/physics.svg";
import bookimg from "./assets/bookimg.svg";
import { useContext, useEffect, useState } from "react";
import like from "./assets/like.svg";
import share from "./assets/share.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import {
  handleGetSubjectById,
  handleGetSubjects,
} from "../../controllers/studentControllers/subjectController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Book, Download } from "lucide-react";
import nonoti from "./assets/nonoti.svg"; // Added for the no items image

const StudentSub = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectID, setSelectedSubjectID] = useState(null);
  const [showSubjects, setShowSubjects] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const [loading, setLoading] = useState(true);
  const [loadingSubject, setLoadingSubject] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState([]);

  const subjectImages = [biology, chem, maths, geopgraphy, hist, phys];

  // Function to get a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * subjectImages.length);
    return subjectImages[randomIndex];
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await handleGetSubjects();
        if (data) {
          setSubjects(data);
        } else {
          // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // enqueueSnackbar("An error occurred while fetching profile data", {
        //   variant: "error",
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, []);

  useEffect(() => {
    const fetchSubject = async () => {
      if (selectedSubject?._id) {
        try {
          setLoadingSubject(true);
          const data = await handleGetSubjectById(selectedSubject._id);
          if (data) {
            setSubject(data); // Wrap in array if handleGetSubjectById returns a single object
          } else {
            // enqueueSnackbar("Failed to fetch subject data", { variant: "error" });
          }
        } catch (error) {
          console.error("Error fetching subject:", error);
          // enqueueSnackbar("An error occurred while fetching subject data", {
          //   variant: "error",
          // });
        } finally {
          setLoadingSubject(false);
        }
      }
    };

    fetchSubject();
  }, [selectedSubject?._id]);

  const [activeButton, setActiveButton] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleButtonClick = (tag) => {
    setActiveButton(tag);
    setSelectedTag(tag);
    if (tag === "all") {
      setFilteredCategories(selectedSubject.content);
    } else {
      const filtered = selectedSubject.content.filter(
        (category) => category.tag === tag
      );
      setFilteredCategories(filtered);
    }
  };

  const handleClick = (subject) => {
    setSelectedSubject(subject);
    setShowSubjects(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else {
      setSelectedSubject(null);
      setShowSubjects(true);
    }
  };

  return (
    <>
      {!selectedItem && (
        <div
          onClick={() => {
            setSidebarVisible(false);
          }}
          className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
        >
          <span className="flex flex-row items-center">
            {selectedSubject && (
              <>
                <img src={arrowBlue} alt="" onClick={handleBack} />
                <p
                  className="font-Outfit text-[#0530A1] text-sm font-medium cursor-pointer"
                  onClick={handleBack}
                >
                  Back
                </p>
              </>
            )}
            <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
              Subjects
            </p>
          </span>
          <div className="relative w-full h-full">
            {showSubjects && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <>
                    {Array(3)
                      .fill()
                      .map((_, index) => (
                        <div
                          key={index}
                          className="w-full bg-[#f8f8f8] p-6 rounded-[15px]"
                        >
                          <Skeleton height={20} width="60%" />{" "}
                          {/* Name placeholder */}
                          <div className="w-full h-[200px] mt-6 rounded-[10px] flex justify-center items-center bg-[#C9E4FC]">
                            <Skeleton height={150} width="50%" />{" "}
                            {/* Image placeholder */}
                          </div>
                        </div>
                      ))}
                  </>
                ) : !subjects.length ? (
                  <div className="absolute top-0 left-0 w-full h-[70vh] flex flex-col items-center justify-center">
                    <p className="font-Outfit text-center font-medium mt-3 text-base">
                      No Subjects Available
                    </p>
                    <p className="font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                      When you have subjects you’ll see them here
                    </p>
                  </div>
                ) : (
                  subjects.map((subject) => (
                    <div
                      key={subject._id}
                      className="w-full bg-[#f8f8f8] p-6 rounded-[15px]"
                      onClick={() => handleClick(subject)}
                    >
                      <p
                        className="font-Outfit text-xl font-semibold capitalize overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ maxWidth: "200px" }}
                      >
                        {subject.name}
                      </p>
                      <div className="w-full h-[200px] mt-6 rounded-[10px] flex justify-center items-center bg-[#C9E4FC]">
                        <img
                          src={subject.img || getRandomImage()}
                          className="w-[50%] h-[150px]"
                          alt={subject.name}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedSubject && !selectedItem && (
        <div
          onClick={() => {
            setSidebarVisible(false);
          }}
          className="absolute lg:left-[20%] top-[102px] py-6 w-full lg:w-[80%]"
        >
          <div className="w-full px-6 bg-[#C9E4FC] flex justify-between items-center">
            <p className="font-Outfit text-3xl font-semibold py-[32px] capitalize">
              {selectedSubject?.name}
            </p>
            <img
              src={selectedSubject?.img || getRandomImage()}
              className="w-[13%] h-[100px] py-1"
              alt=""
            />
          </div>

          <div className="w-full px-6 mt-6">
            <p className="font-Outfit text-xl font-semibold capitalize">
              Explore E-Books on {selectedSubject?.name}
            </p>
            <div className="flex w-full flex-row items-center justify-start mt-8 overflow-auto space-x-6 border-b border-[#EAEBF0]">
              <button
                className={`font-normal font-Outfit text-sm pb-2 text-[#00000080] md:w-auto transition-all ${
                  activeButton === "all"
                    ? "border-b-[3px] border-[#0530A1] text-[#0530A1]"
                    : ""
                }`}
                onClick={() => handleButtonClick("all")}
              >
                All
              </button>
              {Array.from(
                new Set(
                  selectedSubject?.content?.map((category) => category.tag)
                )
              ).map((tag, index) => (
                <button
                  key={index}
                  className={`font-normal font-Outfit pb-2 text-sm text-[#00000080] transition-all ${
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
            <div className="relative w-full h-[70vh]">
              {loadingSubject ? (
                <>
                  {Array(7)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="flex flex-col w-full">
                        <Skeleton height={150} width="100%" />
                        <Skeleton
                          height={10}
                          width="100%"
                          className="mt-3"
                        />{" "}
                        {/* Full width for name */}
                        <Skeleton
                          height={8}
                          width="80%"
                          className="mt-1"
                        />{" "}
                        {/* Adjusted for date */}
                        <div className="flex items-center justify-between mt-2">
                          <Skeleton height={8} width="100%" />{" "}
                          {/* Full width for button placeholder */}
                        </div>
                      </div>
                    ))}
                </>
              ) : !selectedSubject?.subjects?.length ? (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                  <img src={nonoti} className="w-[20%] mt-4" alt="No items" />
                  <p className="font-Outfit text-center font-medium mt-3 text-base">
                    No Items Available
                  </p>
                  <p className="font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                    When you have items you’ll see them here
                  </p>
                </div>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((item) => (
                  <div
                    key={item._id || item.name} // Use _id if available, fallback to name
                    className="flex flex-col w-full"
                    onClick={() => handleItemClick(item)}
                  >
                    <span
                      style={{
                        backgroundImage: item?.img
                          ? `url(${item?.img})`
                          : "none",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundColor: item?.img ? "#fff" : "#f1f1f1",
                      }}
                      className="w-full h-[150px] flex items-center justify-center"
                    >
                      {!item?.img && <Book size={50} color="#666" />}
                    </span>
                    <p
                      className="mt-3 font-Outfit text-xs font-normal overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ maxWidth: "100%" }}
                    >
                      {item.name}
                    </p>
                    <p className="font-Outfit text-[10px] text-[#000000CC] mt-1">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <button
                      className="mt-2 w-full bg-[#0530A1] text-white text-xs font-medium py-1 rounded-[6px] flex items-center font-Outfit justify-center"
                      onClick={() => {
                        if (item.file?.url)
                          window.open(item.file.url, "_blank");
                      }}
                    >
                      <Download
                        size={12}
                        color="#fff"
                        className="mr-1 text-white"
                      />{" "}
                      Download
                    </button>
                  </div>
                ))
              ) : (
                selectedSubject?.subjects?.map((item) => (
                  <div
                    key={item._id || item.name} // Use _id if available, fallback to name
                    className="flex flex-col w-full"
                    onClick={() => handleItemClick(item)}
                  >
                    <span
                      style={{
                        backgroundImage: item?.image
                          ? `url(${item?.image})`
                          : "none",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundColor: item?.image ? "#fff" : "#f1f1f1",
                      }}
                      className="w-full h-[150px] flex items-center justify-center"
                    >
                      {!item?.image && <Book size={50} color="#666" />}
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
                    <button
                      className="mt-2 w-full bg-[#0530A1] text-white text-xs font-medium py-1 rounded-[6px] flex items-center font-Outfit justify-center"
                      onClick={() => {
                        if (item.file?.url)
                          window.open(item.file.url, "_blank");
                      }}
                    >
                      <Download
                        size={12}
                        color="#fff"
                        className="mr-1 text-white"
                      />{" "}
                      Download
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {selectedItem && (
        <div
          onClick={() => {
            setSidebarVisible(false);
          }}
          className="absolute lg:left-[20%] top-[56px] py-6 w-full lg:w-[80%]"
        >
          <div className="flex px-6 items-center space-x-3">
            <span className="flex items-center">
              <img src={arrowBlue} alt="" onClick={handleBack} />
              <p
                className="font-Outfit text-[#0530A1] text-sm font-medium cursor-pointer ml-1"
                onClick={handleBack}
              >
                Back
              </p>
            </span>
            <p className="font-Outfit text-2xl mb-2 font-semibold">Books</p>
          </div>

          <div
            style={{
              backgroundImage: `url(${selectedItem.img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full bg-[#C9E4FC] mt-6 flex h-[120px] px-6 relative items-center"
          >
            <p className="font-Outfit text-3xl font-semibold text-white z-[99]">
              {selectedItem.name}
            </p>
            <div className="w-full absolute h-full left-0 top-0 bg-[#ffffff03] backdrop-blur-[2px]"></div>
          </div>

          <div className="w-full p-6 flex justify-between flex-col space-y-6 lg:space-y-0 lg:flex-row items-start lg:items-center">
            <span className="flex flex-col">
              <p className="font-Outfit text-base font-semibold">Author:</p>
              <span className="text-xs font-Outfit w-[250px] mt-2 font-normal">
                {selectedItem.author}
              </span>
            </span>
            <span className="flex flex-col">
              <p className="font-Outfit text-base font-semibold">Publisher:</p>
              <span className="text-xs font-Outfit w-[250px] mt-2 font-normal">
                N/A
              </span>
            </span>

            <div className="flex items-center space-x-8">
              <button className="flex flex-col items-center space-y-2">
                <img src={like} alt="" />
                <p className="font-Outfit text-sm font-normal text-[#222328]">
                  Add to favorite
                </p>
              </button>

              <button className="flex flex-col items-center space-y-2">
                <img src={share} alt="" />
                <p className="font-Outfit text-sm font-normal text-[#222328]">
                  Share
                </p>
              </button>
              <button
                onClick={() => handlePageClick("Reader")}
                className="text-center text-base font-Outfit font-medium text-white bg-[#0530A1] py-3 px-8 rounded-[10px]"
              >
                Open Book
              </button>
            </div>
          </div>
          <div className="px-6">
            <span className="flex flex-col">
              <p className="font-Outfit text-base font-semibold">
                Description:
              </p>
              <span className="text-xs font-Outfit mt-2 font-normal">
                {selectedItem.desc}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSub;
