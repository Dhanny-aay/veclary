import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import { handleGetSchoolSessions } from "../../../controllers/schoolControllers/sessionController";
import { handleGetSchoolTeachers } from "../../../controllers/schoolControllers/teachersController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { handleAddClass } from "../../../controllers/schoolControllers/classController";
import { handleGetSchoolSubjects } from "../../../controllers/schoolControllers/subjectController";
import SnackbarUtils from "../../../utils/snackbarUtils";
// import add from "./assets/addBlk.svg";
// import plus from "./assets/PlusCircle.svg";

const AddClass = ({ setAddClass, triggerFetch }) => {
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [classteacher, setClassTeacher] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sessions, setSessions] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const data = await handleGetSchoolSubjects();
      if (data) {
        setSubjects(data[0]?.subjects || []);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAppendSubject = (subjectId) => {
    if (!selectedSubjects.includes(subjectId)) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleRemoveSubject = (subjectId) => {
    setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
  };

  const fetchSessions = async () => {
    setLoadingSession(true);
    try {
      const data = await handleGetSchoolSessions();
      if (data) setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoadingSession(false);
    }
  };

  const fetchTeachers = async () => {
    setLoadingTeachers(true);
    try {
      const data = await handleGetSchoolTeachers();
      if (data) setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchTeachers();
  }, []);

  // Set default values after data is fetched
  useEffect(() => {
    if (sessions.length > 0 && !sessionId) {
      setSessionId(sessions[0]._id);
    }
  }, [sessions, sessionId]);

  useEffect(() => {
    if (teachers.length > 0 && !classteacher) {
      setClassTeacher(teachers[0]._id);
    }
  }, [teachers, classteacher]);

  const validateFields = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!sessionId) errors.sessionId = "Session is required";
    if (selectedSubjects.length === 0) {
      errors.selectedSubjects = "At least one subject must be selected";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddClass(false);
    triggerFetch();
    // SnackbarUtils.success("Class added successfully!");
  };

  const onError = (error) => {
    setLoading(false);
    SnackbarUtils.error("Failed. Please try again.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      console.log("Validation failed", errors);
      return;
    }

    setLoading(true);
    const userData = {
      name,
      sessionId,
      teacherId: classteacher,
      subjects: selectedSubjects,
    };

    handleAddClass(userData, onSuccess, onError);
  };

  const disableSubmit =
    loading || sessions.length === 0 || teachers.length === 0;

  return (
    <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
      <div className="md:ml-[20%] bg-[#FFFFFF] p-3 rounded-[15px] w-full md:w-[700px]">
        <div className="w-full h-full p-3 max-h-[500px] bg-[#fff] overflow-auto">
          <span className=" w-full flex items-center justify-between">
            <img src={edit} className="" alt="" />
            <img
              onClick={() => setAddClass(false)}
              src={close}
              className=" w-4"
              alt=""
            />
          </span>
          <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
            Add Class
          </p>
          {/* Form Inputs */}
          <label className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm">
            Class Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the Class name"
              className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.name}
              </p>
            )}
          </label>
          <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm mt-3 font-medium">
            Session
            {loadingSession ? (
              <GenericLoadingSkeleton count={1} width="100%" height={40} />
            ) : sessions.length === 0 ? (
              <p className="font-Outfit text-red-500 text-sm mt-2">
                No sessions found. Please go to the school calendar menu to
                create one.
              </p>
            ) : (
              <select
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
              >
                {sessions.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {errors.sessionId && (
              <p className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.sessionId}
              </p>
            )}
          </label>

          <div className="mt-3 grid grid-cols-1 gap-3">
            <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm font-medium">
              Class Teacher(optional)
              {loadingTeachers ? (
                <GenericLoadingSkeleton count={1} width="100%" height={40} />
              ) : teachers.length === 0 ? (
                <p className="font-Outfit text-red-500 text-sm mt-2">
                  No teachers found. Please go to the teachers menu to add one.
                </p>
              ) : (
                <select
                  value={classteacher}
                  onChange={(e) => setClassTeacher(e.target.value)}
                  className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>

          <div className="mt-6 w-full flex flex-row items-center justify-between">
            <label
              htmlFor="choose"
              className=" font-Outfit font-medium text-sm text-[#272D37]"
            >
              Choose Subject
            </label>
          </div>

          {loadingSubjects ? (
            <GenericLoadingSkeleton count={1} width="100%" height={40} />
          ) : subjects.length === 0 ? (
            <p className="font-Outfit text-red-500 text-sm mt-2">
              No subjects found. Create one in Subjects.
            </p>
          ) : (
            <>
              <span className=" w-full border border-[#DAE0E6] mt-[6px] block px-4 py-3 rounded-[5px] bg-white">
                <select
                  name=""
                  id="subject-dropdown"
                  onChange={(e) => {
                    handleAppendSubject(e.target.value);
                    e.target.value = "";
                  }}
                  className=" w-full bg-transparent font-Outfit font-normal text-sm text-[#919BA7]"
                >
                  <option disabled selected value="">
                    Choose Subject
                  </option>
                  {subjects.map((subject) => (
                    <option
                      className="capitalize"
                      key={subject._id}
                      value={subject._id}
                    >
                      {subject.name}
                    </option>
                  ))}
                </select>
              </span>
              {errors.selectedSubjects && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.selectedSubjects}
                </p>
              )}
            </>
          )}

          <div className="flex flex-wrap gap-3 items-start justify-start mt-4 w-full">
            {selectedSubjects.map((subjectId) => {
              const subject = subjects.find((item) => item._id === subjectId);
              return (
                <div
                  key={subjectId}
                  className="flex items-center bg-[#F1F1F1F1] py-1 px-3 rounded-[16px] space-x-2"
                >
                  <span className="font-Outfit font-medium capitalize text-sm text-black">
                    {subject?.name || "Unknown Subject"}
                  </span>
                  <button onClick={() => handleRemoveSubject(subjectId)}>
                    <img src={close} className="w-3 h-3" alt="" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setAddClass(false)}
              className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={disableSubmit}
              className={`w-full py-3 font-Outfit rounded-md text-white font-semibold text-base ${
                disableSubmit
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0530A1]"
              }`}
            >
              {loading ? (
                <img src={load} alt="" className="h-6 w-6 mx-auto" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
