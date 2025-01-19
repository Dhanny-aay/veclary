import { useEffect, useState } from "react";
import { handleGetSchoolClasses } from "../../../controllers/schoolControllers/classController";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
// import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { handleCreateSubject } from "../../../controllers/schoolControllers/subjectController";

const AddSubject = ({ triggerFetch, setAddSubject }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let errors = {};
    // Validate the class name and session ID
    if (!name) errors.name = "Name is required";

    setErrors(errors);
    // If no errors, return true
    return Object.keys(errors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddSubject(false);
    triggerFetch?.();
    // enqueueSnackbar("Subject added successfully!", { variant: "success" });
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
    const userData = { name };

    handleCreateSubject(userData, onSuccess, onError);
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] [500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full bg-[#fff] overflow-auto">
            <span className=" w-full flex items-center justify-between">
              <img src={edit} className="" alt="" />
              <img
                onClick={() => setAddSubject(false)}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Add Subject
            </p>

            {/* Form Inputs */}
            <label className="w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the Subject name"
                className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.name}
                </p>
              )}
            </label>

            <div className="w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => setAddSubject(false)}
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
    </>
  );
};

export default AddSubject;
