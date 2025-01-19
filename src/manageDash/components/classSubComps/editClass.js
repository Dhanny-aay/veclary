import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import {
  handleGetClassById,
  handleUpdateClassById,
} from "../../../controllers/schoolControllers/classController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { handleGetSchoolSessions } from "../../../controllers/schoolControllers/sessionController";
import { handleGetSchoolTeachers } from "../../../controllers/schoolControllers/teachersController";
import { handleGetSchoolSubjects } from "../../../controllers/schoolControllers/subjectController";

const EditClass = ({ setEditClass, classID, triggerFetch }) => {
  const [classDeets, setClassDeets] = useState({
    name: "",
    sessionId: "",
    teacherId: "",
    subjects: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  // Fetch class by ID
  const fetchClassByID = async () => {
    try {
      const data = await handleGetClassById(classID);
      if (data) {
        setClassDeets(data.class);
      }
    } catch (error) {
      console.error("Error fetching class:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassByID();
  }, [classID]);

  // Fetch sessions and teachers
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

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const data = await handleGetSchoolSubjects();
      if (data) {
        setSubjects(data[0].subjects);
      } else {
        // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoadingSubjects(false);
    }
  };
  // Sync selectedSubjects with classDeets.subjects initially
  useEffect(() => {
    setSelectedSubjects(classDeets.subjects || []);
  }, [classDeets.subjects]);

  const handleAppendSubject = (subjectId) => {
    if (!selectedSubjects.includes(subjectId)) {
      const updatedSubjects = [...selectedSubjects, subjectId];
      setSelectedSubjects(updatedSubjects);
      setClassDeets((prev) => ({ ...prev, subjects: updatedSubjects }));
    }
  };

  const handleRemoveSubject = (subjectId) => {
    const updatedSubjects = selectedSubjects.filter((id) => id !== subjectId);
    setSelectedSubjects(updatedSubjects);
    setClassDeets((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  useEffect(() => {
    fetchSessions();
    fetchTeachers();
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassDeets((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  // Validate fields before submitting
  const validateFields = () => {
    const requiredFields = ["name", "sessionId"];
    for (let field of requiredFields) {
      if (!classDeets[field]) {
        enqueueSnackbar(`Please fill in the ${field.replace("_", " ")}`, {
          variant: "error",
        });
        return false;
      }
    }

    return true;
  };

  const onSuccess = (response) => {
    setLoadingEdit(false);
    setEditClass(false);
    triggerFetch();
    // enqueueSnackbar("Teacher edited successfully!", { variant: "success" });
  };

  const onError = (error) => {
    setLoadingEdit(false);
    // enqueueSnackbar("Teacher edit failed. Please try again.", {
    //   variant: "error",
    // });
  };

  const handleSave = () => {
    if (validateFields()) {
      setLoadingEdit(true);
      const userData = classDeets;
      handleUpdateClassById(classID, userData, onSuccess, onError);
    }
  };

  return (
    <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
      <div className="md:ml-[20%] bg-[#FFFFFF] p-3 rounded-[15px] w-full md:w-[700px]">
        <div className="w-full h-full p-3 max-h-[500px] bg-[#fff] overflow-auto">
          <span className="w-full flex items-center justify-between">
            <img src={edit} className="" alt="" />
            <img
              onClick={() => setEditClass(false)}
              src={close}
              className="w-4"
              alt=""
            />
          </span>
          <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
            Edit Class
          </p>

          {/* Show loading skeleton if still loading */}
          {loading ? (
            <GenericLoadingSkeleton
              count={10}
              width="100%"
              height={25}
              className="mt-[6px]"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-3">
                <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={classDeets.name}
                    onChange={handleChange}
                    placeholder="Enter the class name"
                    className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>

                <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Session
                  {loadingSession ? (
                    <GenericLoadingSkeleton
                      count={1}
                      width="100%"
                      height={40}
                    />
                  ) : (
                    <select
                      name="sessionId"
                      value={classDeets.sessionId}
                      onChange={handleChange}
                      className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal bg-white"
                    >
                      <option value="">Select Session</option>
                      {sessions.map((item, index) => (
                        <option value={item._id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                </label>
              </div>

              <label className="w-full mt-4 flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                Class Teacher
                {loadingTeachers ? (
                  <GenericLoadingSkeleton count={1} width="100%" height={40} />
                ) : (
                  <select
                    name="sessionId"
                    value={classDeets.teacherId}
                    onChange={handleChange}
                    className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal bg-white"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              </label>

              <div className="  mt-4 w-full flex flex-row items-center justify-between">
                <label
                  htmlFor="choose"
                  className=" font-Outfit font-medium text-sm text-[#272D37]"
                >
                  Class Subjects
                </label>
              </div>
              <div>
                {loadingSubjects ? (
                  <GenericLoadingSkeleton count={1} width="100%" height={40} />
                ) : (
                  <>
                    <div className="w-full border border-[#DAE0E6] mt-[6px] block px-4 py-3 rounded-[5px] bg-white">
                      <select
                        id="subject-dropdown"
                        onChange={(e) => {
                          handleAppendSubject(e.target.value);
                          e.target.value = ""; // Reset dropdown value
                        }}
                        className="w-full bg-transparent font-Outfit font-normal text-sm text-[]"
                      >
                        <option disabled selected value="">
                          Select Subject
                        </option>
                        {subjects.map((subject) => (
                          <option
                            className="capitalize"
                            key={subject._id}
                            value={subject._id} // Pass only the ID
                          >
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="flex flex-wrap gap-3 items-start justify-start mt-4 w-full">
                  {selectedSubjects.map((subjectId) => {
                    const subject = subjects.find(
                      (item) => item._id === subjectId
                    );
                    return (
                      <div
                        key={subjectId}
                        className="flex items-center bg-[#F1F1F1F1] py-1 px-3 rounded-[16px] space-x-2"
                      >
                        <span className="font-Outfit font-medium capitalize text-sm text-black">
                          {subject?.name || "Unknown Subject"}
                        </span>
                        <button onClick={() => handleRemoveSubject(subjectId)}>
                          <img src={close} className="w-3 h-3" alt="Remove" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className=" w-full mt-4 grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setEditClass(false);
                  }}
                  className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loadingEdit}
                  className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base"
                >
                  {loadingEdit ? (
                    <img src={load} className=" w-6" alt="" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditClass;
