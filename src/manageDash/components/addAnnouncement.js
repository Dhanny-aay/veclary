import React, { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import load from "./assets/load.gif";
import { handleAddAnnouncement } from "../../controllers/schoolControllers/annoucementController";
import { handleGetSchoolStudents } from "../../controllers/schoolControllers/studentController";
import { handleGetSchoolTeachers } from "../../controllers/schoolControllers/teachersController";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";

const AddAnnouncement = ({ setMakeAnnouncement, triggerFetchAnnounce }) => {
  // State for data fetching and loading
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [noStudents, setNoStudents] = useState(false);
  const [noTeachers, setNoTeachers] = useState(false);

  // State for form fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // State for search functionality
  const [teacherSearch, setTeacherSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  // State for form validation errors
  const [errors, setErrors] = useState({});

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await handleGetSchoolStudents();
      if (Array.isArray(data) && data.length === 0) {
        setNoStudents(true);
        setStudents([]);
      } else {
        setStudents(data);
        setNoStudents(false);
      }
    } catch (error) {
      setNoStudents(true);
    } finally {
      setLoading(false);
    }
  };

  // console.log(students);

  const fetchTeachers = async () => {
    try {
      const data = await handleGetSchoolTeachers();
      if (Array.isArray(data) && data.length === 0) {
        setNoTeachers(true);
        setTeachers([]);
      } else {
        setTeachers(data);
        setNoTeachers(false);
      }
    } catch (error) {
      setNoTeachers(true);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const handleSelectAllTeachers = (e) => {
    if (e.target.checked) {
      setSelectedTeachers(filteredTeachers.map((teacher) => teacher._id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleSelectTeacher = (id) => {
    setSelectedTeachers((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSelectAllStudents = (e) => {
    if (e.target.checked) {
      setSelectedStudents(filteredStudents.map((student) => student._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const validateFields = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    if (selectedTeachers.length === 0 && selectedStudents.length === 0) {
      newErrors.recipients = "At least one teacher or student must be selected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setLoadingAdd(true);

    const announcementData = {
      title,
      subtitle,
      content,
      teacherIds: selectedTeachers,
      studentIds: selectedStudents,
      scheduleTime: new Date(`${scheduleDate}T${scheduleTime}`).toISOString(),
    };

    const onSuccess = () => {
      setLoadingAdd(false);
      triggerFetchAnnounce();
      setMakeAnnouncement(false);
      // SnackbarUtils.success("Announcement added successfully!");
    };

    const onError = () => {
      setLoadingAdd(false);
      // SnackbarUtils.error("Failed to add announcement. Please try again.");
    };

    await handleAddAnnouncement(announcementData, onSuccess, onError);
  };

  const filteredTeachers = teachers?.filter((teacher) =>
    teacher?.name?.toLowerCase().includes(teacherSearch.toLowerCase())
  );
  const filteredStudents = students?.filter((student) =>
    student?._id?.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <>
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
              Create an announcement
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-4 w-full">
              <label
                htmlFor="title"
                className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
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
                className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
              >
                Subtitle
                <input
                  type="text"
                  name="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Enter a subtitle"
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id="subtitle"
                />
              </label>
            </div>

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
                htmlFor="time"
                className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
              >
                Select time
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px] border border-[#DAE0E6] p-2.5"
                  id="time"
                />
              </label>
              <label
                htmlFor="date"
                className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm"
              >
                Select date
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px] border border-[#DAE0E6] p-2.5"
                  id="date"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full">
                <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Teachers ({selectedTeachers.length})
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>
                <div className="bg-white border border-[#DAE0E6] rounded-[5px] mt-2 h-64 overflow-y-auto p-2">
                  <label className="flex items-center space-x-2 p-1 border-b border-gray-200">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={handleSelectAllTeachers}
                      checked={
                        selectedTeachers.length === filteredTeachers.length &&
                        filteredTeachers.length > 0
                      }
                    />
                    <span className="font-Outfit font-medium text-sm text-[#272D37]">
                      Select All
                    </span>
                  </label>
                  {loading ? (
                    <GenericLoadingSkeleton
                      count={5}
                      height={20}
                      className="my-2"
                    />
                  ) : noTeachers ? (
                    <p className="font-Outfit text-red-500 text-sm mt-2">
                      No teachers found.
                    </p>
                  ) : (
                    filteredTeachers.map((teacher) => (
                      <label
                        key={teacher._id}
                        className="flex items-center space-x-2 p-1"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedTeachers.includes(teacher._id)}
                          onChange={() => handleSelectTeacher(teacher._id)}
                        />
                        <span className="font-Outfit text-sm text-[#272D37]">
                          {teacher.name}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="w-full">
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
                  <label className="flex items-center space-x-2 p-1 border-b border-gray-200">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={handleSelectAllStudents}
                      checked={
                        selectedStudents.length === filteredStudents.length &&
                        filteredStudents.length > 0
                      }
                    />
                    <span className="font-Outfit font-medium text-sm text-[#272D37]">
                      Select All
                    </span>
                  </label>
                  {loading ? (
                    <GenericLoadingSkeleton
                      count={5}
                      height={20}
                      className="my-2"
                    />
                  ) : noStudents ? (
                    <p className="font-Outfit text-red-500 text-sm mt-2">
                      No students found.
                    </p>
                  ) : (
                    filteredStudents.map((student) => (
                      <label
                        key={student._id}
                        className="flex items-center space-x-2 p-1"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => handleSelectStudent(student._id)}
                        />
                        <span className="font-Outfit text-sm text-[#272D37]">
                          {student._id}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>

            {errors.recipients && (
              <p className="text-red-500 text-xs mt-2 font-Outfit">
                {errors.recipients}
              </p>
            )}

            <div className="w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => setMakeAnnouncement(false)}
                className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loadingAdd || loading || (noTeachers && noStudents)}
                className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base"
              >
                {loadingAdd ? (
                  <img src={load} className="w-6" alt="loading" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAnnouncement;
