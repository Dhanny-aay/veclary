import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useEffect, useState } from "react";
import Day from "./day";
import {
  handleGetSchoolSessions,
  handleGetSessionByID,
} from "../../../controllers/schoolControllers/sessionController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { useSnackbar } from "notistack";
import { handleGetSchoolClasses } from "../../../controllers/schoolControllers/classController";
import { handleAddTimetable } from "../../../controllers/schoolControllers/timetableController";
import load from "./assets/load.gif";
import SnackbarUtils from "../../../utils/snackbarUtils";

const AddTimetable = ({ setAddTimetable, triggerFetch, dashboard }) => {
  const [days, setDays] = useState([
    { name: "Monday", periods: [] },
    { name: "Tuesday", periods: [] },
    { name: "Wednesday", periods: [] },
    { name: "Thursday", periods: [] },
    { name: "Friday", periods: [] },
    // Add other days as needed
  ]);
  const [sessions, setSessions] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [classId, setClassID] = useState("");
  const [terms, setTerms] = useState([]);
  const [loadingTerms, setLoadingTerms] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [errors, setErrors] = useState({});
  const schoolId = dashboard?.school?._id;
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchClasses = async () => {
    setLoadingClasses(true);
    try {
      const data = await handleGetSchoolClasses();
      if (data) {
        setClasses(data.data || data);
      } else {
        // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchTermsBySession = async (selectedSessionId) => {
    setLoadingTerms(true);
    try {
      const data = await handleGetSessionByID(selectedSessionId);
      if (data && data.terms) {
        setTerms(data.terms);
      } else {
        setTerms([]);
        SnackbarUtils.info("No terms found for the selected session");
      }
    } catch (error) {
      console.error("Error fetching terms:", error);
      SnackbarUtils.error("Failed to fetch terms");
    } finally {
      setLoadingTerms(false);
    }
  };

  const handleSessionChange = (e) => {
    const selectedSessionId = e.target.value;
    setSessionId(selectedSessionId);
    setTermId(""); // Reset the term selection when session changes
    setTerms([]); // Clear terms when a new session is selected
    if (selectedSessionId) {
      fetchTermsBySession(selectedSessionId);
    }
  };

  const addDay = (dayName) => {
    setDays([...days, { name: dayName, periods: [] }]);
  };

  const updateDay = (index, updatedDay) => {
    const updatedDays = [...days];
    updatedDays[index] = updatedDay;
    setDays(updatedDays);
  };

  const removeDay = (index) => {
    const updatedDays = [...days];
    updatedDays.splice(index, 1);
    setDays(updatedDays);
  };

  console.log(days);

  // Validate all fields
  const validateFields = () => {
    let errors = {};

    if (!sessionId) errors.sessionId = "Session is required";
    if (!termId) errors.termId = "Term is required";
    if (!classId) errors.classId = "Class is required";
    // if (!address) errors.address = "Address is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddTimetable(false);
    triggerFetch();
    SnackbarUtils.success("Timetable added successfully!");
  };

  const onError = (error) => {
    setLoading(false);

    SnackbarUtils.error("Failed. Please try again.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // If field validation fails, stop submission
    }

    setLoading(true);
    const userData = { schoolId, termId, classId, days };
    handleAddTimetable(userData, onSuccess, onError);
    console.log(userData);
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] bg-[#FFFFFF] p-3 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full p-3 max-h-[500px] bg-[#fff] overflow-auto">
            <span className=" w-full flex items-center justify-between">
              <img src={edit} className="" alt="" />
              <img
                onClick={() => setAddTimetable(false)}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <h1 className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Create a Timetable
            </h1>
            <div className=" w-full">
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm font-medium">
                  Session
                  {loadingSession ? (
                    <GenericLoadingSkeleton
                      count={1}
                      width="100%"
                      height={40}
                    />
                  ) : sessions.length === 0 ? (
                    <p className="font-Outfit text-red-500 text-sm mt-2">
                      No sessions found. Create one in Calendar.
                    </p>
                  ) : (
                    <select
                      value={sessionId}
                      onChange={handleSessionChange}
                      className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
                    >
                      <option value="">Select Session</option>
                      {sessions.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.sessionId && (
                    <span className="text-red-500 text-xs mt-1 font-Outfit">
                      {errors.sessionId}
                    </span>
                  )}
                </label>
                <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm font-medium">
                  Term
                  {loadingTerms ? (
                    <GenericLoadingSkeleton
                      count={1}
                      width="100%"
                      height={40}
                    />
                  ) : terms.length === 0 && sessionId ? (
                    <p className="font-Outfit text-red-500 text-sm mt-2">
                      No terms found. Please add one.
                    </p>
                  ) : (
                    <select
                      value={termId}
                      onChange={(e) => setTermId(e.target.value)}
                      className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
                    >
                      <option value="">Select Term</option>
                      {terms.map((item) => (
                        <option
                          className=" capitalize"
                          value={item._id}
                          key={item._id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.termId && (
                    <span className="text-red-500 text-xs mt-1 font-Outfit">
                      {errors.termId}
                    </span>
                  )}
                </label>
              </div>

              <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm mt-3 font-medium">
                Class
                {loadingClasses ? (
                  <GenericLoadingSkeleton count={1} width="100%" height={40} />
                ) : classes.length === 0 ? (
                  <p className="font-Outfit text-red-500 text-sm mt-2">
                    No classes found. Create one in Classes.
                  </p>
                ) : (
                  <select
                    value={classId}
                    onChange={(e) => setClassID(e.target.value)}
                    className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
                  >
                    <option value="">Select Class</option>
                    {classes.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.classId && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.classId}
                  </p>
                )}
              </label>

              <div className="p- w-full">
                {days.map((day, index) => (
                  <Day
                    key={day.name}
                    day={day}
                    onUpdate={(updatedDay) => updateDay(index, updatedDay)}
                    onRemove={() => removeDay(index)}
                  />
                ))}
                {/* <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => addDay(`new-day-${days.length + 1}`)}
              >
                Add Day
              </button> */}
              </div>

              <div className=" w-full mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setAddTimetable(false);
                  }}
                  className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base"
                >
                  {loading ? (
                    <img src={load} className=" w-6" alt="" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTimetable;
