import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import load from "./assets/load.gif";
import { handleMakePublisherAnnounce } from "../../controllers/publisherController/generalController";
import { handleGetPublisherAuthors } from "../../controllers/publisherController/authorController";
import SnackbarUtils from "../../utils/snackbarUtils";

const AddAnnouncement = ({ setMakeAnnouncement, triggerFetch }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [authorSearch, setAuthorSearch] = useState("");
  const [isFetchingAuthors, setIsFetchingAuthors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noAuthors, setNoAuthors] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
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
    fetchAuthors();
  }, []);

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
    author.userId.name.toLowerCase().includes(authorSearch.toLowerCase())
  );

  const validateFields = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    if (!scheduleDate || !scheduleTime)
      newErrors.schedule = "Date and time are required";
    if (selectedAuthors.length === 0)
      newErrors.authors = "Select at least one author";
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
      SnackbarUtils.success("Announcement added successfully!");
      triggerFetch();
      setMakeAnnouncement(false);
    };

    const onError = () => {
      setIsSubmitting(false);
      SnackbarUtils.error("Failed to add announcement. Please try again.");
    };

    await handleMakePublisherAnnounce(announcementData, onSuccess, onError);
  };

  return (
    <div className="w-full h-full bg-[#1212128d] z-[99999] fixed top-0 left-0 p-6 flex justify-center items-center">
      <div className="w-full max-w-[900px] h-[90vh] md:h-[80vh] flex justify-center items-center">
        <div className="bg-[#FFFFFF] p-6 rounded-[15px] w-full h-full overflow-y-auto">
          <span className="w-full flex items-center justify-between">
            <img src={announce} alt="announcement icon" />
            <img
              onClick={() => setMakeAnnouncement(false)}
              src={close}
              className="w-4 cursor-pointer"
              alt="close icon"
            />
          </span>
          <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
            Create an Announcement
          </p>

          <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title of announcement"
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
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Enter subtitle of announcement"
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
              className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.content}
              </p>
            )}
          </label>

          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
              Select Date
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              />
              {errors.schedule && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.schedule}
                </p>
              )}
            </label>
            <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
              Select Time
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
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
              Authors ({selectedAuthors.length})
              <input
                type="text"
                placeholder="Search authors..."
                value={authorSearch}
                onChange={(e) => setAuthorSearch(e.target.value)}
                className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              />
            </label>
            <div className="bg-white border border-[#DAE0E6] rounded-[5px] mt-2 h-64 overflow-y-auto p-2">
              {isFetchingAuthors ? (
                <div className="animate-pulse">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded my-2"></div>
                  ))}
                </div>
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
                        onChange={() => handleSelectAuthor(author._id)}
                      />
                      <span className="font-Outfit text-sm text-[#272D37]">
                        {author.userId.name}
                      </span>
                    </label>
                  ))}
                </>
              )}
            </div>
            {errors.authors && (
              <p className="text-red-500 text-xs mt-2 font-Outfit">
                {errors.authors}
              </p>
            )}
          </div>

          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setMakeAnnouncement(false)}
              className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                isFetchingAuthors ||
                (noAuthors && selectedAuthors.length === 0)
              }
              className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base disabled:opacity-50"
            >
              {isSubmitting ? (
                <img src={load} className="w-6" alt="loading" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
