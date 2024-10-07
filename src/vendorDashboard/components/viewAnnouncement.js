import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import load from "./assets/load.gif";
import { useEffect, useState } from "react";
import {
  handleGetAnnoumcementsByID,
  handlePublisherAnnouncementUpdate,
} from "../../controllers/publisherController/generalController";
import { handleGetAuthorAnnoumcementsByID } from "../../controllers/authorController/generalContoller";
import edit from "./assets/edit.svg";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";

const ViewAnnouncement = ({ setMakeView, triggerFetch, role, annouceID }) => {
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);
  const annoucementID = annouceID;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleTime, setScheduleTime] = useState(""); // For schedule time
  const [scheduleDate, setScheduleDate] = useState(""); // For schedule date
  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const fetchAnnouncementsByID = async (announcementID) => {
    if (!announcementID) {
      console.error("announcementID is required to fetch announcements.");
      return;
    }

    try {
      let data;
      if (role === "AUTHOR") {
        data = await handleGetAuthorAnnoumcementsByID(announcementID);
      } else {
        data = await handleGetAnnoumcementsByID(announcementID);
      }

      console.log("Data received:", data); // Check what exactly is being returned

      setAnnouncement(data || null); // Set announcement data
      // Initialize editable fields with fetched data
      if (data) {
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setContent(data.content);
        setScheduleTime(
          new Date(data.scheduleTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setScheduleDate(
          new Date(data.scheduleTime).toISOString().split("T")[0]
        ); // Extract only the date
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncementsByID(annoucementID);
  }, [annoucementID]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long", // 'long' for full month name
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // true for AM/PM format
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options).replace(",", ""); // Remove the comma before time
  };

  const onSuccess = () => {
    setLoading(false);
    setMakeView(false); // Close the modal after success
    triggerFetch(); // Trigger a refresh of announcements in the parent component
  };

  const onError = () => {
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      title,
      subtitle,
      content,
      scheduleTime: new Date(`${scheduleDate}T${scheduleTime}`),
    };

    handlePublisherAnnouncementUpdate(
      annoucementID,
      userData,
      onSuccess,
      onError
    );
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[400px]">
          <div className="w-full h-full bg-[#fff] overflow-auto">
            <span className=" w-full flex items-center justify-between">
              <img src={announce} alt="" />
              <img
                onClick={() => {
                  setMakeView(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              View and edit your announcement
            </p>

            {!announcement ? (
              // Show loading skeleton while announcement data is being fetched
              <GenericLoadingSkeleton
                count={10}
                width="100%"
                height={25}
                className="mt-2"
              />
            ) : (
              announcement && (
                <>
                  <label
                    htmlFor=""
                    className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Title
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title of announcement"
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                      readOnly={role === "AUTHOR"}
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Subtitle
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Enter subtitle of announcement"
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                      readOnly={role === "AUTHOR"}
                    />
                  </label>

                  <div className="mt-4 flex items-center space-x-3">
                    <label
                      htmlFor=""
                      className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
                    >
                      Schedule time
                      <input
                        value={
                          announcement?.scheduleTime
                            ? formatDate(announcement.scheduleTime)
                            : ""
                        } // Format the date or provide a fallback
                        readOnly // Optional: make the input read-only if you don't want users to change it
                        className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                        id=""
                      />
                    </label>
                    {/* Toggling the edit and close icon */}
                    {role !== "AUTHOR" && (
                      <img
                        src={isEditing ? close : edit} // Show close icon if editing, else edit icon
                        className="mt-6 w-4 cursor-pointer"
                        alt="Toggle edit"
                        onClick={toggleEdit} // Toggle edit mode on click
                      />
                    )}
                  </div>

                  {isEditing && (
                    <div className="w-full grid grid-cols-2 gap-4">
                      <label
                        htmlFor=""
                        className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                      >
                        Schedule time
                        <input
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                          id=""
                        />
                      </label>

                      <label
                        htmlFor=""
                        className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                      >
                        Schedule date
                        <input
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                          id=""
                        />
                      </label>
                    </div>
                  )}

                  <label
                    htmlFor=""
                    className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Body
                    <textarea
                      type="text"
                      value={content}
                      readOnly={role === "AUTHOR"}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter body of announcement"
                      className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>

                  {role !== "AUTHOR" && (
                    <div className="w-full mt-6 grid grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setMakeView(false);
                        }}
                        className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base flex items-center justify-center"
                      >
                        {loading ? (
                          <img src={load} className="w-6" alt="" />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAnnouncement;
