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

const EditClass = ({ setEditClass, classID, triggerFetch }) => {
  const [classDeets, setClassDeets] = useState({
    name: "",
    sessionId: "",
    teachers: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

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

  useEffect(() => {
    fetchSessions();
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassDeets((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  // Handle teacher-subject pair changes
  const handleTeacherChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTeachers = [...classDeets.teachers];
    updatedTeachers[index] = { ...updatedTeachers[index], [name]: value };
    setClassDeets((prevClass) => ({
      ...prevClass,
      teachers: updatedTeachers,
    }));
  };

  // Add a new teacher-subject pair
  const addTeacher = () => {
    setClassDeets((prevClass) => ({
      ...prevClass,
      teachers: [...prevClass.teachers, { teacherId: "", subject: "" }],
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
    // Validate teacher-subject pairs
    for (let teacher of classDeets.teachers) {
      if (!teacher.teacherId || !teacher.subject) {
        enqueueSnackbar(
          "Please provide both teacher and subject for each teacher",
          {
            variant: "error",
          }
        );
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
      <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[400px]">
        <div className="w-full h-full bg-[#fff] overflow-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm">
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

                <label className="w-full mt-3 flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Session
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
                </label>
              </div>

              {/* Teachers section */}
              <div className="mt-6">
                {classDeets.teachers.map((teacher, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
                  >
                    <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                      Teacher
                      <select
                        name="teacherId"
                        value={teacher.teacherId}
                        onChange={(e) => handleTeacherChange(index, e)}
                        className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal bg-white"
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((t) => (
                          <option value={t._id} key={t._id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                      Subject
                      <input
                        type="text"
                        name="subject"
                        value={teacher.subject}
                        onChange={(e) => handleTeacherChange(index, e)}
                        placeholder="Enter subject"
                        className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      />
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTeacher}
                  className="mt-4 text-[#0530A1] font-medium"
                >
                  Add Another Teacher
                </button>
              </div>

              <div className=" w-full mt-6 grid grid-cols-2 gap-4">
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
