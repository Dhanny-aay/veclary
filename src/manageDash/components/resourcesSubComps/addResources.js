import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import { handleGetSchoolSubjects } from "../../../controllers/schoolControllers/subjectController";
import {
  handleGetSchoolSessions,
  handleGetSessionByID,
} from "../../../controllers/schoolControllers/sessionController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import FileUploader from "../../../utils/fileUploader";
import { handleCreateResources } from "../../../controllers/schoolControllers/resourcesController";
import load from "./assets/load.gif";

const AddResources = ({ triggerFetch, setAddResource }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [subjectId, setSubjectId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState([]);
  const [loadingTerms, setLoadingTerms] = useState(false);
  const [resourceFile, setResourceFile] = useState(null);
  const handleResourceFileSelect = (file) => {
    setResourceFile(file);
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
    fetchSubjects();
  }, []);

  const fetchTermsBySession = async (selectedSessionId) => {
    setLoadingTerms(true);
    try {
      const data = await handleGetSessionByID(selectedSessionId);
      if (data && data.terms) {
        setTerms(data.terms);
      } else {
        setTerms([]);
        enqueueSnackbar("No terms found for the selected session", {
          variant: "info",
        });
      }
    } catch (error) {
      console.error("Error fetching terms:", error);
      enqueueSnackbar("Failed to fetch terms", { variant: "error" });
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

  // Validation function
  const validateFields = () => {
    const newErrors = {};

    if (name.trim() === "") newErrors.name = "Resource's Name is required";
    if (subjectId.trim() === "")
      newErrors.subjectId = "Resource's subject is required";
    if (sessionId.trim() === "") newErrors.sessionId = "Session is required";
    if (termId.trim() === "") newErrors.termId = "Term is required";

    if (!resourceFile) newErrors.resourceFile = "Resource file is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    enqueueSnackbar(response.message, { variant: "success" });
    setAddResource(false);
    triggerFetch();
  };

  const onError = (error) => {
    setLoading(false);
    enqueueSnackbar(error.message, { variant: "error" });
    setAddResource(false);
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("termId", termId);
      formData.append("sessionId", sessionId);
      formData.append("subjectId", subjectId);
      formData.append("file", resourceFile); // File object for book file

      handleCreateResources(formData, onSuccess, onError);
    } else {
      enqueueSnackbar("Please fix the errors in the form", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] bg-[#FFFFFF] p-3 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full p-3 max-h-[500px] bg-[#fff] overflow-auto">
            <span className=" w-full flex items-center justify-between">
              <img src={edit} className="" alt="" />
              <img
                onClick={() => setAddResource(false)}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>

            <label className="font-Outfit mt-4 w-full flex flex-col text-[#272D37] text-sm font-medium">
              What subject does this resource belong to?
              {loadingSubjects ? (
                <GenericLoadingSkeleton count={1} width="100%" height={40} />
              ) : (
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((item) => (
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
              {errors.subjectId && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.subjectId}
                </span>
              )}
            </label>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm font-medium">
                Session
                {loadingSession ? (
                  <GenericLoadingSkeleton count={1} width="100%" height={40} />
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
                  <GenericLoadingSkeleton count={1} width="100%" height={40} />
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

            <label className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the Resource name"
                className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.name}
                </p>
              )}
            </label>

            <FileUploader
              label="Resource File"
              accept="application/pdf"
              maxSize={200000000} // 200MB
              isImage={false}
              onFileSelect={handleResourceFileSelect}
            />
            {errors.resourceFile && (
              <span className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.resourceFile}
              </span>
            )}

            <div className="w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={setAddResource}
                className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base flex justify-center items-center"
              >
                {loading ? <img src={load} className=" w-5" alt="" /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddResources;
