import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/teach.svg";
import add from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { handleGetSchoolClasses } from "../../../controllers/schoolControllers/classController";
import { handleSchoolAddStudent } from "../../../controllers/schoolControllers/studentController";

const AddStudent = ({ setAddStudent, triggerFetch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classId, setClassID] = useState("");

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

  const validateFields = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";

    if (!email) errors.email = "Email is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddStudent(false);
    triggerFetch();
    enqueueSnackbar("Student added successfully!", { variant: "success" });
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
    const userData = { name, email, classId, password };
    handleSchoolAddStudent(userData, onSuccess, onError);
  };

  return (
    <>
      <div className=" w-full md:w-[120%] h-full bg-[#1212128d] z-[99999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className=" w-full h-[500px] flex justify-center items-center">
          <div className=" md:ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[700px]">
            <span className=" w-full flex items-center justify-between">
              <img src={add} className="" alt="" />
              <img
                onClick={() => {
                  setAddStudent(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Add new Student
            </p>

            <label
              htmlFor=""
              className=" w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Student Name
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the student's name"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.name}
                </p>
              )}
            </label>

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
            </label>

            <label
              htmlFor=""
              className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Student Email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the student's email"
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
              Student Password
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the student's password"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
            </label>

            <div className=" w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setAddStudent(false);
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

export default AddStudent;
