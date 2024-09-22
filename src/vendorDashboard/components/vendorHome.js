import { useContext, useEffect, useState } from "react";
import upload from "./assets/upload.svg";
import chart from "./assets/chart.svg";
import chart1 from "./assets/chart1.svg";
import chart2 from "./assets/chart2.svg";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import nofeed from "./assets/nofeed.svg";
import base from "./assets/base.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddBook from "./addBook";
import AddAnnouncement from "./addAnnouncement";
import { handleGetPublisherAnnounce } from "../../controllers/publisherController/generalController";

const VendorHome = ({ loading, profile, role }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);
  const [uploadBook, setUploadBook] = useState(false);
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [noAnnouncements, setNoAnnouncements] = useState(false);

  const fetchAnnouncements = async () => {
    setLoadingAnnouncements(true); // Start loading when fetching books
    try {
      let data;

      // Check role and fetch the appropriate announcements
      if (role === "AUTHOR") {
        // data = await handleGetAuthorBooks(); // Fetch announcements for authors
      } else {
        data = await handleGetPublisherAnnounce(); // Fetch announcements for publishers
      }

      if (data && data.message === "No announcements found") {
        setNoAnnouncements(true); // Set noAnnouncements to true if no announcements found
        setAnnouncements([]); // Clear the announcements array
      } else {
        setAnnouncements(data); // Set the announcements if data is available
        setNoAnnouncements(false); // Reset noAnnouncements if books are found
      }
    } catch (error) {
      setNoAnnouncements(true); // Set noAnnouncements to true in case of error
    } finally {
      setLoadingAnnouncements(false); // Stop loading when fetch is complete
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  console.log(announcements);

  const analysis = [
    {
      name: "E-Book Completion",
      percentage: "90%",
      stat: "Weekly Stats",
      img: chart,
    },
    {
      name: "Total Book Sold",
      percentage: "88",
      stat: "All Stats",
      img: chart1,
    },
    {
      name: "User Retention",
      percentage: "88%",
      stat: "Weekly Stats",
      img: chart2,
    },
  ];

  console.log(profile);

  return (
    <>
      {/* upload book component */}
      {uploadBook && <AddBook role={role} setUploadBook={setUploadBook} />}
      {/* make announcement comp */}
      {makeAnnouncement && (
        <AddAnnouncement setMakeAnnouncement={setMakeAnnouncement} />
      )}
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <div className=" flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between items-start">
          <div className="flex flex-row md:items-center space-x-4 md:space-x-3">
            <span
              style={{
                backgroundImage:
                  profile && profile[0]?.avatar?.url
                    ? `url(${profile[0].avatar.url})`
                    : "none",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundColor:
                  profile && profile[0]?.avatar?.url
                    ? "transparent"
                    : "#EAEBF0", // Set color only if the image doesn't exist
              }}
              className=" w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"
            ></span>
            <span className=" flex flex-col">
              {loading ? (
                <Skeleton height={30} />
              ) : (
                profile && (
                  <p className="font-Outfit font-medium text-xl md:text-3xl">
                    Welcome back,{" "}
                    <span className=" capitalize">{profile[0].name}!</span>
                  </p>
                )
              )}
              <p className=" font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
                Let's see how your books are performing!
              </p>
            </span>
          </div>
          <button
            onClick={() => {
              setUploadBook(true);
            }}
            className=" px-10 py-3 flex items-center w-full md:w-auto justify-center space-x-3 rounded-[10px] bg-[#0530A1]"
          >
            <img src={upload} alt="" />
            <p className=" font-Outfit text-base font-medium text-white">
              Upload a book
            </p>
          </button>
        </div>

        <div className=" mt-6">
          <p className=" font-Outfit font-semibold text-xl text-black">
            Analysis
          </p>
          <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.map((item, index) => (
              <div
                key={index}
                className=" border border-[#EAEBF0] rounded-[10px] p-4"
              >
                <p className=" font-Outfit font-medium text-[#272D37] text-base">
                  {item.name}
                </p>
                <div className=" w-full flex flex-row justify-between mt-2 items-end">
                  <div className=" w-[40%]">
                    <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                      {item.percentage}
                    </p>
                    <p className=" font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                      {item.stat}
                    </p>
                  </div>
                  <div className=" w-[59%]">
                    <img src={item.img} className=" w-[100%] h-full" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
          <div className=" w-full lg:w-[39%] border border-[#EAEBF0] rounded-[10px] p-4">
            <p className=" font-Outfit text-lg text-[#272D37] font-semibold">
              Total Sales Revenue
            </p>
            <p className=" font-Outfit text-xl text-[#272D37] font-semibold">
              $135,450
            </p>
            <img src={base} className=" mt-6 w-full" alt="" />
          </div>

          <div className=" w-full lg:w-[29%] border border-[#EAEBF0] rounded-[10px] p-4 relative">
            <p className=" font-Outfit text-[#272D37] text-lg font-semibold">
              Announcements
            </p>
            <div className=" flex flex-col items-center">
              <img src={nonoti} className=" mt-7" alt="" />
              <p className=" font-Outfit text-center font-medium mt-3 text-base">
                No Announcements
              </p>
              <p className=" font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                When you have an announcement you’ll see them here
              </p>
              <div className=" w-full px-4 lg:absolute bottom-4">
                <button
                  onClick={() => {
                    setMakeAnnouncement(true);
                  }}
                  className=" w-full  mt-8 lg:mt-0 py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
                >
                  <img src={add} alt="" />
                  <p className=" font-Outfit text-sm text-white font-medium">
                    Make an Announcement
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className=" w-full lg:w-[29%] border border-[#EAEBF0] rounded-[10px] p-4">
            <p className=" font-Outfit text-[#272D37] text-lg font-semibold">
              Students Feedbacks
            </p>
            <div className=" flex flex-col items-center">
              <img src={nofeed} className=" mt-7" alt="" />
              <p className=" font-Outfit text-center font-medium mt-3 text-base">
                No Feedbacks
              </p>
              <p className=" font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                When you have a feedback you’ll see them here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorHome;
