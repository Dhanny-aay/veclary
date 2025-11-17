import { useContext, useEffect, useState } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import ass from "./assets/ass.svg";
import test from "./assets/test.svg";
import chart from "./assets/chart.svg";
import nofeed from "./assets/nofeed.svg";
import proBadge from "./assets/Pro_Badge.svg";
import Skeleton from "react-loading-skeleton";
import CreateAnnouncement from "./annoucementComps/addAnnouncement";
import EditAnnouncement from "./annoucementComps/editAnnoncement";
import DeletePrompt from "./deletePrompt";
import Announcements from "./annoucementComps/announcements";
import {
  handleDeleteTeacherAnnouncement,
  handleGetAnnouncements,
} from "../../controllers/teacherControllers/teacherAnnoucementControllers";
import SnackbarUtils from "../../utils/snackbarUtils";

const TeacherHome = ({ loading, dashboard }) => {
  const userId = dashboard?.teacher?.userId?._id;
  const { sidebarVisible, setSidebarVisible } = useContext(
    TeacherSidebarContext
  );
  const { activePage, setActivePage } = useContext(TeacherActivePageContext);
  const [announcements, setAnnouncements] = useState([]);
  const [isFetchingAnnouncements, setIsFetchingAnnouncements] = useState(false);
  const [makeAnnouncement, setMakeAnnouncement] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const triggerFetchAnnounce = () => setTrigger(!trigger);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsFetchingAnnouncements(true);
      try {
        const response = await handleGetAnnouncements();
        setAnnouncements(response || []);
      } catch (err) {
        SnackbarUtils.error("Failed to fetch announcements.");
      } finally {
        setIsFetchingAnnouncements(false);
      }
    };
    fetchAnnouncements();
  }, [trigger]);

  const handleDelete = async (itemId) => {
    try {
      await handleDeleteTeacherAnnouncement(itemId);
      triggerFetchAnnounce();
      SnackbarUtils.success("Announcement deleted successfully!");
    } catch (err) {
      SnackbarUtils.error("Failed to delete announcement.");
    } finally {
      setDeleteModal(null);
    }
  };

  const handleClick = (page) => setActivePage(page);

  const streak = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
  ];

  const performance = [
    { name: "Assignment", percentage: "90%", stat: "Weekly Stats", img: ass },
    { name: "Test", percentage: "88%", stat: "Per Test Stats", img: test },
    {
      name: "E-Book Completion",
      percentage: "70%",
      stat: "Weekly Stats",
      img: chart,
    },
  ];

  const timetableData = [
    { color: "#006531", time: "08:00", activity: "Morning Exercise" },
    { color: "#006531", time: "09:00", activity: "Morning Exercise" },
    { color: "", time: "10:00", activity: "" },
    { color: "#1C6DF6", time: "11:00", activity: "Science Class" },
    { color: "#1C6DF6", time: "12:00", activity: "Science Class" },
    { color: "#E84343", time: "13:00", activity: "History Class" },
    { color: "#E84343", time: "14:00", activity: "History Class" },
  ];

  const receivedAnnouncements = dashboard?.announcement || [];

  return (
    <>
      {makeAnnouncement && (
        <CreateAnnouncement
          triggerFetchAnnounce={triggerFetchAnnounce}
          setMakeAnnouncement={setMakeAnnouncement}
        />
      )}
      {editAnnouncement && (
        <EditAnnouncement
          announcement={editAnnouncement}
          setEditAnnouncement={setEditAnnouncement}
          triggerFetchAnnounce={triggerFetchAnnounce}
        />
      )}
      {deleteModal && (
        <DeletePrompt
          itemId={deleteModal}
          onConfirm={() => handleDelete(deleteModal)}
          onCancel={() => setDeleteModal(null)}
        />
      )}

      <div
        onClick={() => setSidebarVisible(false)}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-row md:items-center space-x-4 md:space-x-3">
            <span className="w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0]"></span>
            <span className="flex flex-col">
              {loading ? (
                <Skeleton height={30} />
              ) : (
                dashboard && (
                  <p className="font-Outfit font-medium text-xl md:text-3xl">
                    Welcome back,{" "}
                    <span className="capitalize">
                      {dashboard?.teacher?.name}!
                    </span>
                  </p>
                )
              )}
              <p className="font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
                Take the first steps to improve your Education.
              </p>
            </span>
          </div>
          <button
            onClick={() => handleClick("Assistant")}
            className="bg-[#0530A1] py-3 px-6 flex items-center space-x-[10px] rounded-[10px]"
          >
            <img src={proBadge} alt="pro badge" />
            <p className="font-Outfit font-medium text-base text-white">
              Activate Class Assistant
            </p>
          </button>
        </div>
        <div className="border-y border-[#EAEBF0] py-3 mt-6 grid grid-cols-4 gap-6 md:grid-cols-7">
          {streak.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 text-center"
            >
              <input
                type="checkbox"
                name={item.day}
                className="rounded-[50%]"
                id={item.day}
              />
              <p className="text-center font-Outfit text-[#A1A1A1] text-xs">
                {item.day}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-Outfit text-lg font-semibold">
            Performance Analysis
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performance.map((item, index) => (
              <div
                key={index}
                className="border border-[#EAEBF0] rounded-[10px] p-4"
              >
                <p className="font-Outfit font-medium text-[#272D37] text-base">
                  {item.name}
                </p>
                <div className="w-full flex flex-row justify-between mt-2 items-end">
                  <div className="w-[40%]">
                    <p className="font-Outfit text-[#272D37] text-xl font-semibold">
                      {item.percentage}
                    </p>
                    <p className="font-Outfit text-[#5F6D7E] text-sm mt-2 font-medium">
                      {item.stat}
                    </p>
                  </div>
                  <div className="w-[59%]">
                    <img
                      src={item.img}
                      className="w-[100%] h-full"
                      alt={item.name}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
          <Announcements
            userId={userId}
            announcements={announcements}
            receivedAnnouncements={receivedAnnouncements}
            isFetchingAnnouncements={isFetchingAnnouncements}
            setMakeAnnouncement={setMakeAnnouncement}
            setEditAnnouncement={setEditAnnouncement}
            setDeleteModal={setDeleteModal}
            triggerFetchAnnounce={triggerFetchAnnounce}
          />

          <div className="w-full lg:w-[39%] border border-[#EAEBF0] rounded-[10px] p-4">
            <div className="flex flex-row justify-between items-start">
              <span>
                <p className="font-Outfit text-lg font-semibold">
                  Upcoming Schedule
                </p>
                <p className="font-Outfit text-[#000000B2] text-xs font-normal">
                  Today is Wednesday, March 27th, 2024
                </p>
              </span>
              <button
                onClick={() => handleClick("Schedule")}
                className="rounded-[10px] bg-[#0530A1] px-3 py-1 text-white text-sm font-medium"
              >
                View all
              </button>
            </div>
            <div className="flex mt-3 w-full border-y border-[#9292921A]">
              <div className="w-16 border-r border-[#9292921A]">
                {timetableData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center border-b border-[#9292921A] h-10"
                  >
                    <p className="text-center text-xs text-[#929292] font-Outfit font-normal">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex-1 w-full">
                {timetableData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: item.color
                        ? `${item.color}2a`
                        : "transparent",
                      borderColor: item.color ? item.color : "transparent",
                    }}
                    className="flex ml-1 backdrop-opacity-60 items-center text-left w-full border-l-4 bg-[#0000002a] justify-center h-10"
                  >
                    <p className="text-left w-full text-xs ml-4 text-[#000] font-Outfit font-normal">
                      {item.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[29%] border border-[#EAEBF0] rounded-[10px] p-4">
            <p className="font-Outfit text-lg font-semibold">
              Students Feedbacks
            </p>
            <div className="flex flex-col items-center">
              <img src={nofeed} className="mt-7" alt="no feedback" />
              <p className="font-Outfit text-center font-medium mt-3 text-base">
                No Feedbacks
              </p>
              <p className="font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
                When you have a feedback you’ll see them here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherHome;
