import React, { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import load from "./assets/load.gif";
import { handleGetTeacherClasses } from "../../../controllers/teacherControllers/teacherClassesControoller";
import { handleAddTeacherAnnouncement } from "../../../controllers/teacherControllers/teacherAnnoucementControllers";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import SnackbarUtils from "../../../utils/snackbarUtils";

const CreateAnnouncement = ({ setMakeAnnouncement, triggerFetchAnnounce }) => {
  const [classes, setClasses] = useState([]);
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noClasses, setNoClasses] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");
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

  const handleSelectAllStudents = (e, classId) => {
    const classStudents =
      classes.find((c) => c.classId === classId)?.students || [];
    if (e.target.checked) {
      setSelectedStudents(classStudents.map((student) => student._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredStudents = selectedClass
    ? classes
        .find((c) => c.classId === selectedClass)
        ?.students.filter((student) =>
          student._id.toLowerCase().includes(studentSearch.toLowerCase())
        ) || []
    : [];

  const validateFields = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    if (!scheduleDate || !scheduleTime)
      newErrors.schedule = "Date and time are required";
    if (!selectedClass && selectedStudents.length === 0) {
      newErrors.recipients = "Select a class or at least one student";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);

    const announcementData = {
      title,
      subtitle,
      content,
      scheduleTime: new Date(`${scheduleDate}T${scheduleTime}`).toISOString(),
      classId: selectedClass || undefined,
      studentIds: selectedClass ? [] : selectedStudents,
    };

    const onSuccess = () => {
      setIsSubmitting(false);
      triggerFetchAnnounce();
      setMakeAnnouncement(false);
      SnackbarUtils.success("Announcement added successfully!");
    };

    const onError = () => {
      setIsSubmitting(false);
      SnackbarUtils.error("Failed to add announcement. Please try again.");
    };

    await handleAddTeacherAnnouncement(announcementData, onSuccess, onError);
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

          <label
            htmlFor="class"
            className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
          >
            Select Class (Optional)
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedStudents([]);
              }}
              className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              id="class"
            >
              <option value="">Select a class or choose students below</option>
              {classes.map((cls) => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className} ({cls.studentCount} students)
                </option>
              ))}
            </select>
          </label>

          <div className="w-full mt-4">
            <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
              Students ({selectedStudents.length})
              <input
                type="text"
                placeholder="Search students..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              />
            </label>
            <div className="bg-white border border-[#DAE0E6] rounded-[5px] mt-2 h-64 overflow-y-auto p-2">
              {isFetchingClasses ? (
                <GenericLoadingSkeleton
                  count={5}
                  height={20}
                  className="my-2"
                />
              ) : noClasses ? (
                <p className="font-Outfit text-red-500 text-sm mt-2">
                  No classes found.
                </p>
              ) : selectedClass && filteredStudents.length === 0 ? (
                <p className="font-Outfit text-red-500 text-sm mt-2">
                  No students found in this class.
                </p>
              ) : (
                <>
                  {selectedClass && (
                    <label className="flex items-center space-x-2 p-1 border-b border-gray-200">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={(e) =>
                          handleSelectAllStudents(e, selectedClass)
                        }
                        checked={
                          selectedStudents.length === filteredStudents.length &&
                          filteredStudents.length > 0
                        }
                      />
                      <span className="font-Outfit font-medium text-sm text-[#272D37]">
                        Select All
                      </span>
                    </label>
                  )}
                  {filteredStudents.map((student) => (
                    <label
                      key={student._id}
                      className="flex items-center space-x-2 p-1"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleSelectStudent(student._id)}
                        disabled={selectedClass}
                      />
                      <span className="font-Outfit text-sm text-[#272D37]">
                        {student._id}
                      </span>
                    </label>
                  ))}
                </>
              )}
            </div>
            {errors.recipients && (
              <p className="text-red-500 text-xs mt-2 font-Outfit">
                {errors.recipients}
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
                isFetchingClasses ||
                (noClasses && selectedStudents.length === 0)
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

export default CreateAnnouncement;
