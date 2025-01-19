import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import {
  handleGetSubjectById,
  handleUpdateSubjectById,
} from "../../../controllers/schoolControllers/subjectController";
import { handleGetSchoolClasses } from "../../../controllers/schoolControllers/classController";
import { handleUpdateStudentById } from "../../../controllers/schoolControllers/studentController";

const EditSubject = ({ setEditSubject, subjectID, triggerFetch }) => {
  const [subject, setSubject] = useState({
    name: "",
    classId: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  // Fetch Subject by ID
  const fetchSubjectByID = async () => {
    try {
      const data = await handleGetSubjectById(subjectID);
      if (data) {
        setSubject(data);
      }
    } catch (error) {
      console.error("Error fetching Subject:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjectByID();
  }, [subjectID]);

  const fetchClasses = async () => {
    setLoadingClasses(true);
    try {
      const data = await handleGetSchoolClasses();
      if (data) {
        setClasses(data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  // Validate fields before submitting
  const validateFields = () => {
    const requiredFields = ["name", "classId"];
    for (let field of requiredFields) {
      if (!subject[field]) {
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
    setEditSubject(false);
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
      const userData = subject;
      handleUpdateStudentById(subjectID, userData, onSuccess, onError);
    }
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] -[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[400px]">
          <div className="w-full h-full bg-[#fff] overflow-auto">
            <span className="w-full flex items-center justify-between">
              <img src={edit} className="" alt="" />
              <img
                onClick={() => setEditSubject(false)}
                src={close}
                className="w-4"
                alt=""
              />
            </span>
            <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Edit Subject
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
                <label className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={subject.name}
                    onChange={handleChange}
                    placeholder="Enter the subject name"
                    className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  />
                </label>

                <label className="w-full mt-3 flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                  Class
                  {loadingClasses ? (
                    <GenericLoadingSkeleton
                      count={1}
                      width="100%"
                      height={40}
                    />
                  ) : (
                    <select
                      name="classId"
                      value={subject.classId}
                      onChange={handleChange}
                      className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal bg-white"
                    >
                      <option value="">Select Class</option>
                      {classes.map((item, index) => (
                        <option value={item._id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                </label>

                <div className=" w-full mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setEditSubject(false);
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
    </>
  );
};

export default EditSubject;
