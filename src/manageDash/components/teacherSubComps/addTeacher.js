import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import { handleAddTeacher } from "../../../controllers/schoolControllers/teachersController";
import { handleGetSchoolClasses } from "../../../controllers/schoolControllers/classController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";

const AddTeacher = ({ setAddTeach, triggerFetch }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([
    "English",
    "Biology",
    "Chemistry",
    "Mathematics",
    "Physics",
  ]);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const [classId, setClassID] = useState("");

  const handleToggle = () => {
    setIsClassTeacher(!isClassTeacher);
    setClassID(""); // Reset selected class when toggled off
  };

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

  // Validate all fields
  const validateFields = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!subject) errors.subject = "Subject is required";
    if (!email) errors.email = "Email is required";
    if (!address) errors.address = "Address is required";

    if (isClassTeacher && !classId) errors.classId = "Class is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddTeach(false);
    triggerFetch();
    enqueueSnackbar("Teacher added successfully!", { variant: "success" });
  };

  const onError = (error) => {
    setLoading(false);

    enqueueSnackbar("Failed. Please try again.", {
      variant: "error",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // If field validation fails, stop submission
    }

    setLoading(true);
    const userData = { name, subject, email, address };
    handleAddTeacher(userData, onSuccess, onError);
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full bg-[#fff] overflow-auto">
            <span className=" w-full flex items-center justify-between">
              <img src={edit} className="" alt="" />
              <img
                onClick={() => {
                  setAddTeach(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Add new Teacher
            </p>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Name
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the teacher's name"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.name}
                </p>
              )}
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the teacher's email"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.email}
                </p>
              )}
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Address
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the teacher's Address"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.address}
                </p>
              )}
            </label>

            <div className="  mt-3 w-full flex flex-row items-center justify-between">
              <label
                htmlFor="choose"
                className=" font-Outfit font-medium text-sm text-[#272D37]"
              >
                Choose Subject
              </label>
            </div>
            <span className=" w-full border border-[#DAE0E6] mt-[6px] block px-4 py-3 rounded-[5px] bg-white">
              <select
                name=""
                id="subject-dropdown"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className=" w-full bg-transparent font-Outfit font-normal text-sm  text-[#919BA7]"
              >
                <option disabled selected value="">
                  Choose Subject
                </option>
                {dropdownOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </span>
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.subject}
              </p>
            )}

            <div className=" flex items-center space-x-3 mt-4">
              <p className=" font-Outfit font-medium text-[#272D37] text-sm">
                Assign as a Class Teacher
              </p>
              <label class="switch">
                <input
                  checked={isClassTeacher}
                  onChange={handleToggle}
                  className=" cursor-pointer"
                  type="checkbox"
                />
                <span class="slider round"></span>
              </label>
            </div>

            {isClassTeacher && (
              <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm mt-3 font-medium">
                Class
                {loadingClasses ? (
                  <GenericLoadingSkeleton count={1} width="100%" height={40} />
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
            )}

            <div className=" w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setAddTeach(false);
                }}
                className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base"
              >
                {loading ? <img src={load} className=" w-6" alt="" /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
