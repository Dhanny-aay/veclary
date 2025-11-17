import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import load from "./assets/load.gif";
import {
  handleGetAnnoumcementsByID,
  handlePublisherAnnouncementUpdate,
} from "../../controllers/publisherController/generalController";
import { handleGetAuthorAnnoumcementsByID } from "../../controllers/authorController/generalContoller";
import { handleGetPublisherAuthors } from "../../controllers/publisherController/authorController";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";

const ViewAnnouncement = ({ setMakeView, triggerFetch, role, annouceID }) => {
  const [announcement, setAnnouncement] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [authorSearch, setAuthorSearch] = useState("");
  const [isFetchingAuthors, setIsFetchingAuthors] = useState(false);
  const [noAuthors, setNoAuthors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(role !== "AUTHOR"); // Start in edit mode for non-AUTHOR roles
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [errors, setErrors] = useState({});

  const fetchAnnouncementsByID = async (announcementID) => {
    if (!announcementID) return;
    try {
      let data;
      if (role === "AUTHOR") {
        data = await handleGetAuthorAnnoumcementsByID(announcementID);
      } else {
        data = await handleGetAnnoumcementsByID(announcementID);
      }
      setAnnouncement(data || null);
      if (data) {
        setTitle(data.title);
        setSubtitle(data.subtitle || "");
        setContent(data.content);
        setScheduleDate(
          new Date(data.scheduleTime).toISOString().split("T")[0]
        );
        setScheduleTime(
          new Date(data.scheduleTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
        setSelectedAuthors(data.participants.map((p) => p.authorId._id));
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const fetchAuthors = async () => {
    setIsFetchingAuthors(true);
    try {
      const data = await handleGetPublisherAuthors();
      if (data && data.message === "No authors found") {
        setNoAuthors(true);
        setAuthors([]);
      } else {
        setAuthors(data);
        setNoAuthors(false);
      }
    } catch (error) {
      setNoAuthors(true);
      setAuthors([]);
    } finally {
      setIsFetchingAuthors(false);
    }
  };

  useEffect(() => {
    fetchAnnouncementsByID(annouceID);
    if (role !== "AUTHOR") fetchAuthors();
  }, [annouceID, role]);

  const handleSelectAllAuthors = (e) => {
    if (e.target.checked) {
      setSelectedAuthors(authors.map((author) => author._id));
    } else {
      setSelectedAuthors([]);
    }
  };

  const handleSelectAuthor = (id) => {
    setSelectedAuthors((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredAuthors = authors.filter((author) =>
    (author.userId.name || author._id)
      .toLowerCase()
      .includes(authorSearch.toLowerCase())
  );

  const validateFields = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    if (!scheduleDate || !scheduleTime)
      newErrors.schedule = "Date and time are required";
    if (role !== "AUTHOR" && selectedAuthors.length === 0) {
      newErrors.authors = "Select at least one author";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);
    const announcementData = {
      title,
      subtitle,
      content,
      scheduleTime: new Date(`${scheduleDate}T${scheduleTime}`).toISOString(),
      participants: selectedAuthors,
    };

    const onSuccess = () => {
      setIsSubmitting(false);
      SnackbarUtils.success("Announcement updated successfully!");
      triggerFetch();
      setMakeView(false);
    };

    const onError = () => {
      setIsSubmitting(false);
      SnackbarUtils.error("Failed to update announcement. Please try again.");
    };

    await handlePublisherAnnouncementUpdate(
      annouceID,
      announcementData,
      onSuccess,
      onError
    );
  };

  return (
    <div className="w-full h-full bg-[#1212128d] z-[99999] fixed top-0 left-0 p-6 flex justify-center items-center">
      <div className="w-full max-w-[900px] h-[90vh] md:h-[80vh] flex justify-center items-center">
        <div className="bg-[#FFFFFF] p-6 rounded-[15px] w-full h-full overflow-y-auto">
          <span className="w-full flex items-center justify-between">
            <img src={announce} alt="announcement icon" />
            <img
              onClick={() => setMakeView(false)}
              src={close}
              className="w-4 cursor-pointer"
              alt="close icon"
            />
          </span>
          <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
            {role === "AUTHOR" ? "View Announcement" : "Edit Announcement"}
          </p>

          {!announcement ? (
            <GenericLoadingSkeleton
              count={10}
              width="100%"
              height={25}
              className="mt-2"
            />
          ) : (
            <>
              <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title of announcement"
                  readOnly={role === "AUTHOR"}
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.title}
                  </p>
                )}
              </label>

              <label className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm">
                Subtitle
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Enter subtitle of announcement"
                  readOnly={role === "AUTHOR"}
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
              </label>

              <label className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm">
                Body
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter body of announcement"
                  rows="4"
                  readOnly={role === "AUTHOR"}
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
                {errors.content && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.content}
                  </p>
                )}
              </label>

              <div className="w-full mt-4 grid grid-cols-2 gap-4">
                <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Schedule Date
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    readOnly={role === "AUTHOR"}
                    className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                  {errors.schedule && (
                    <p className="text-red-500 text-xs mt-1 font-Outfit">
                      {errors.schedule}
                    </p>
                  )}
                </label>
                <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Schedule Time
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    readOnly={role === "AUTHOR"}
                    className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                  {errors.schedule && (
                    <p className="text-red-500 text-xs mt-1 font-Outfit">
                      {errors.schedule}
                    </p>
                  )}
                </label>
              </div>

              <div className="w-full mt-4">
                <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Participants ({selectedAuthors.length})
                  {role === "AUTHOR" ? (
                    <div className="bg-white border border-[#DAE0E6] rounded-[5px] mt-2 h-64 overflow-y-auto p-2">
                      {announcement.participants.length === 0 ? (
                        <p className="font-Outfit text-[#919BA7] text-sm mt-2">
                          No participants assigned.
                        </p>
                      ) : (
                        announcement.participants.map((participant) => (
                          <div
                            key={participant.authorId._id}
                            className="flex items-center space-x-2 p-1"
                          >
                            <span className="font-Outfit text-sm text-[#272D37]">
                              {participant.authorId.userId.name ||
                                participant.authorId._id}
                            </span>
                            <span
                              className={`text-xs font-medium rounded-[18px] px-2 py-1 ${
                                participant.status === "unseen"
                                  ? "text-[#344054] bg-[#3440541a]"
                                  : "text-[#027A48] bg-[#027A481a]"
                              }`}
                            >
                              {participant.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Search authors..."
                        value={authorSearch}
                        onChange={(e) => setAuthorSearch(e.target.value)}
                        className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      />
                      <div className="bg-white border border-[#DAE0E6] rounded-[5px] mt-2 h-64 overflow-y-auto p-2">
                        {isFetchingAuthors ? (
                          <GenericLoadingSkeleton
                            count={5}
                            height={20}
                            className="my-2"
                          />
                        ) : noAuthors ? (
                          <p className="font-Outfit text-red-500 text-sm mt-2">
                            No authors found.
                          </p>
                        ) : filteredAuthors.length === 0 ? (
                          <p className="font-Outfit text-red-500 text-sm mt-2">
                            No authors match your search.
                          </p>
                        ) : (
                          <>
                            <label className="flex items-center space-x-2 p-1 border-b border-gray-200">
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                onChange={handleSelectAllAuthors}
                                checked={
                                  selectedAuthors.length === authors.length &&
                                  authors.length > 0
                                }
                              />
                              <span className="font-Outfit font-medium text-sm text-[#272D37]">
                                Select All
                              </span>
                            </label>
                            {filteredAuthors.map((author) => (
                              <label
                                key={author._id}
                                className="flex items-center space-x-2 p-1"
                              >
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  checked={selectedAuthors.includes(author._id)}
                                  onChange={() =>
                                    handleSelectAuthor(author._id)
                                  }
                                />
                                <span className="font-Outfit text-sm text-[#272D37]">
                                  {author.userId.name || author._id}
                                </span>
                              </label>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  )}
                  {errors.authors && role !== "AUTHOR" && (
                    <p className="text-red-500 text-xs mt-2 font-Outfit">
                      {errors.authors}
                    </p>
                  )}
                </label>
              </div>

              {role !== "AUTHOR" && (
                <div className="w-full mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setMakeView(false)}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isFetchingAuthors}
                    className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <img src={load} className="w-6" alt="loading" />
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAnnouncement;
