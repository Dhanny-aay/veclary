import { useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import { handleAddTeacher } from "../../controllers/schoolControllers/teachersController";

const AddTeacher = ({ setAddTeach, triggerFetch }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  // Validate all fields
  const validateFields = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!subject) errors.subject = "Subject is required";
    if (!email) errors.email = "Email is required";
    if (!address) errors.address = "Address is required";

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
        <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[400px]">
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
              Subject
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter the teacher's subject"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.subject}
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
