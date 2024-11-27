import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import { handleGetSchoolSessions } from "../../../controllers/schoolControllers/sessionController";
import { handleGetSchoolTeachers } from "../../../controllers/schoolControllers/teachersController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { handleAddClass } from "../../../controllers/schoolControllers/classController";
import add from "./assets/addBlk.svg";

const AddClass = ({ setAddClass, triggerFetch }) => {
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teacherSubjectPairs, setTeacherSubjectPairs] = useState([
    { teacherId: "", subject: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const [sessions, setSessions] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

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
  const validateFields = () => {
    let errors = {};
    // Validate the class name and session ID
    if (!name) errors.name = "Name is required";
    if (!sessionId) errors.sessionId = "Session is required";

    // Initialize an empty array for teacher errors
    const teacherErrors = teacherSubjectPairs.map((pair, index) => {
      const pairErrors = {};
      if (!pair.teacherId) pairErrors.teacherId = "Teacher is required";
      if (!pair.subject) pairErrors.subject = "Subject is required";
      return pairErrors;
    });

    // Only include teacherSubjectPairs errors if there are any
    if (teacherErrors.some((pairError) => Object.keys(pairError).length > 0)) {
      errors.teacherSubjectPairs = teacherErrors;
    }

    setErrors(errors);
    // If no errors, return true
    return Object.keys(errors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddClass(false);
    triggerFetch();
    enqueueSnackbar("Class added successfully!", { variant: "success" });
  };

  const onError = (error) => {
    setLoading(false);
    enqueueSnackbar("Failed. Please try again.", { variant: "error" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      console.log("Validation failed", errors);
      return;
    }

    setLoading(true);
    const userData = { name, sessionId, teachers: teacherSubjectPairs };

    handleAddClass(userData, onSuccess, onError);
  };

  const addTeacherSubjectPair = () => {
    setTeacherSubjectPairs([
      ...teacherSubjectPairs,
      { teacherId: "", subject: "" },
    ]);
  };

  const handleTeacherSubjectChange = (index, field, value) => {
    const updatedPairs = teacherSubjectPairs.map((pair, idx) =>
      idx === index ? { ...pair, [field]: value } : pair
    );
    setTeacherSubjectPairs(updatedPairs);
  };

  return (
    <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
      <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[700px]">
        <div className="w-full h-full bg-[#fff] overflow-auto">
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
            Name
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
            ) : (
              <select
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
              >
                <option value="">Select Session</option>
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

          {teacherSubjectPairs.map((pair, index) => (
            <div className="mt-3 grid grid-cols-2 gap-3" key={index}>
              <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm font-medium">
                Teacher
                {loadingTeachers ? (
                  <GenericLoadingSkeleton count={1} width="100%" height={40} />
                ) : (
                  <select
                    value={pair.teacherId}
                    onChange={(e) =>
                      handleTeacherSubjectChange(
                        index,
                        "teacherId",
                        e.target.value
                      )
                    }
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
                {errors.teacherSubjectPairs?.[index]?.teacherId && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.teacherSubjectPairs[index].teacherId}
                  </p>
                )}
              </label>
              <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                Subject
                <input
                  type="text"
                  value={pair.subject}
                  onChange={(e) =>
                    handleTeacherSubjectChange(index, "subject", e.target.value)
                  }
                  placeholder="Enter the teacher's subject"
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
                {errors.teacherSubjectPairs?.[index]?.subject && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.teacherSubjectPairs[index].subject}
                  </p>
                )}
              </label>
            </div>
          ))}

          <button
            className="flex items-center space-x-2 mt-3"
            onClick={addTeacherSubjectPair}
          >
            <img src={add} alt="" className="w-5 h-5" />
            <p className="font-Outfit font-medium text-sm text-[#272d37]">
              Add another teacher
            </p>
          </button>

          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setAddClass(false)}
              className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 font-Outfit rounded-md bg-[#0530A1] text-white font-semibold text-base"
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
