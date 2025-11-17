import React, { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import load from "./assets/load.gif";
import { handleGetTeacherClasses } from "../../../controllers/teacherControllers/teacherClassesControoller";
import { handleUpdateTeacherAnnouncement } from "../../../controllers/teacherControllers/teacherAnnoucementControllers";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import SnackbarUtils from "../../../utils/snackbarUtils";

const EditAnnouncement = ({
  announcement,
  setEditAnnouncement,
  triggerFetchAnnounce,
}) => {
  const [classes, setClasses] = useState([]);
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);
  const [noClasses, setNoClasses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(announcement.title || "");
  const [subtitle, setSubtitle] = useState(announcement.subtitle || "");
  const [content, setContent] = useState(announcement.content || "");
  const [scheduleDate, setScheduleDate] = useState(
    announcement.scheduleTime
      ? new Date(announcement.scheduleTime).toISOString().split("T")[0]
      : ""
  );
  const [scheduleTime, setScheduleTime] = useState(
    announcement.scheduleTime
      ? new Date(announcement.scheduleTime)
          .toISOString()
          .split("T")[1]
          .slice(0, 5)
      : ""
  );
  const [errors, setErrors] = useState({});

  const fetchClasses = async () => {
    setIsFetchingClasses(true);
    try {
      const response = await handleGetTeacherClasses();
      if (response && response.classes && Array.isArray(response.classes)) {
        setClasses(response.classes);
        setNoClasses(response.classes.length === 0);
      } else {
        setNoClasses(true);
        setClasses([]);
      }
    } catch (err) {
      setNoClasses(true);
      setClasses([]);
    } finally {
      setIsFetchingClasses(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    if (!scheduleDate || !scheduleTime)
      newErrors.schedule = "Date and time are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);

    const userData = {
      classId: announcement.classId || undefined,
      schoolId: announcement.schoolId || undefined, // Adjust based on schoolId source
      title,
      subtitle,
      content,
      scheduleTime: new Date(`${scheduleDate}T${scheduleTime}`).toISOString(),
    };

    const onSuccess = () => {
      setIsSubmitting(false);
      triggerFetchAnnounce();
      setEditAnnouncement(null);
      SnackbarUtils.success("Announcement updated successfully!");
    };

    const onError = () => {
      setIsSubmitting(false);
      SnackbarUtils.error("Failed to update announcement.");
    };

    await handleUpdateTeacherAnnouncement(
      announcement._id,
      userData,
      onSuccess,
      onError
    );
  };

  const targetStudents =
    announcement.targets?.find((t) => t.role === "Student")?.users || [];
  const className =
    classes.find((c) => c.classId === announcement.classId)?.className ||
    announcement.classId ||
    "N/A";

  return (
    <div className="w-full h-full bg-[#1212128d] z-[99999] fixed top-0 left-0 p-6 flex justify-center items-center">
      <div className="w-full max-w-[900px] h-[90vh] md:h-[80vh] flex justify-center items-center">
        <div className="bg-[#FFFFFF] p-6 rounded-[15px] w-full h-full overflow-y-auto">
          <span className="w-full flex items-center justify-between">
            <img src={announce} alt="announcement icon" />
            <img
              onClick={() => setEditAnnouncement(null)}
              src={close}
              className="w-4 cursor-pointer"
              alt="close icon"
            />
          </span>
          <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
            Edit Announcement
          </p>

          <label
            htmlFor="title"
            className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
          >
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title of announcement"
              className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              id="title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.title}
              </p>
            )}
          </label>

          <label
            htmlFor="subtitle"
            className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
          >
            Subtitle
            <input
              type="text"
              name="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle of announcement"
              className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              id="subtitle"
            />
          </label>

          <label
            htmlFor="content"
            className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
          >
            Body
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter body of announcement"
              rows="4"
              className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              id="content"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.content}
              </p>
            )}
          </label>

          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <label
              htmlFor="date"
              className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
            >
              Select Date
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id="date"
              />
              {errors.schedule && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.schedule}
                </p>
              )}
            </label>
            <label
              htmlFor="time"
              className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
            >
              Select Time
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id="time"
              />
              {errors.schedule && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.schedule}
                </p>
              )}
            </label>
          </div>

          <div className="w-full mt-4">
            <p className="text-[#272D37] font-Outfit font-medium text-sm">
              Audience
            </p>
            {isFetchingClasses ? (
              <GenericLoadingSkeleton count={3} height={20} className="my-2" />
            ) : noClasses && !targetStudents.length ? (
              <p className="font-Outfit text-red-500 text-sm mt-2">
                No audience assigned.
              </p>
            ) : (
              <div className="mt-2 p-2 border border-[#DAE0E6] rounded-[5px]">
                {announcement.audience === "Class" ? (
                  <p className="font-Outfit text-sm text-[#272D37]">
                    Class: {className}
                  </p>
                ) : (
                  <>
                    <p className="font-Outfit text-sm text-[#272D37]">
                      Students ({targetStudents.length})
                    </p>
                    <div className="max-h-64 overflow-y-auto p-2">
                      {targetStudents.map((studentId) => (
                        <p
                          key={studentId}
                          className="font-Outfit text-sm text-[#272D37] p-1"
                        >
                          {studentId}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setEditAnnouncement(null)}
              className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isFetchingClasses}
              className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base"
            >
              {isSubmitting ? (
                <img src={load} className="w-6" alt="loading" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncement;
