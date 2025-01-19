import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import plus from "./assets/PlusCircle.svg";
import {
  handleGetAllSubjects,
  handleAddSubject,
} from "../../../controllers/schoolControllers/subjectController";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";

const SelectSubs = ({ setSelectSub, setAddSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  const handleAppendSubject = (subjectId) => {
    if (!selectedSubjects.includes(subjectId)) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleRemoveSubject = (subjectId) => {
    setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
  };

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const data = await handleGetAllSubjects();
      if (data) {
        setSubjects(data);
      } else {
        // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
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

  // console.log(selectedSubjects);

  const onSuccess = (response) => {
    setLoading(false);
    // enqueueSnackbar("Subjects added successfully!", { variant: "success" });
  };

  const onError = (error) => {
    setLoading(false);
    enqueueSnackbar("Failed. Please try again.", { variant: "error" });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   const userData = selectedSubjects;

  //   handleAddSubject(userData, onSuccess, onError);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    const userData = { subjects: selectedSubjects };

    handleAddSubject(userData, onSuccess, onError);
  };

  console.log(selectedSubjects);

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] [500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full bg-[#fff] overflow-auto flex flex-col items-center justify-center">
            <span className=" w-full flex items-center justify-between">
              <h3 className=" font-Outfit font-medium text-2xl text-[#272D37]">
                Choose Subject
              </h3>
              <img
                onClick={() => setSelectSub(false)}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>

            <div className="  mt-6 w-full flex flex-row items-center justify-between">
              <label
                htmlFor="choose"
                className=" font-Outfit font-medium text-sm text-[#272D37]"
              >
                Choose Subject
              </label>

              <button
                onClick={() => setAddSubject(true)}
                className=" flex items-center space-x-2"
              >
                <img src={plus} className="" alt="" />
                <p className=" text-[#0530A1] font-Outfit font-semibold text-sm">
                  Can't find subject? Add it
                </p>
              </button>
            </div>

            {loadingSubjects ? (
              <GenericLoadingSkeleton count={1} width="100%" height={40} />
            ) : (
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
                      value={subject._id} // Pass only the ID
                    >
                      {subject.name}
                    </option>
                  ))}
                </select>
              </span>
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
                onClick={() => setSelectSub(false)}
                className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 font-Outfit rounded-md bg-[#0530A1] text-white font-semibold text-base flex items-center justify-center"
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
    </>
  );
};

export default SelectSubs;
