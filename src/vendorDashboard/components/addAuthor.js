import close from "./assets/close.svg";
import edit from "./assets/change.svg";
import { useState } from "react";
import load from "./assets/load.gif";
import { useSnackbar } from "notistack";
import { handlePulisherAuthorRegister } from "../../controllers/publisherController/authorController";

const AddAuthor = ({ setMakeModalVisible, fetchAuthors }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // Validation function
  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

    if (name.trim() === "") newErrors.name = "Author's name is required";
    if (email.trim() === "") {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    console.log(response);
    setMakeModalVisible(false);
    fetchAuthors();
    // enqueueSnackbar("Submitted successfully, Please Continue", {
    //   variant: "success",
    // });
  };
  const onError = () => {
    setLoading(false);
    // navigate("/studentlogin");\
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    const isValid = validateFields();

    if (isValid) {
      setLoading(true);

      const userData = { name, email };
      handlePulisherAuthorRegister(userData, onSuccess, onError);
    }
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className=" w-full h-full flex justify-center items-center">
          <div className="md:ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[400px]">
            <span className=" w-full flex items-center justify-between">
              <img src={edit} className="" alt="" />
              <img
                onClick={() => {
                  setMakeModalVisible(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>

            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Add a new author
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
                placeholder="Enter the name of your author"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.name}
                </span>
              )}
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your author's mail"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.email}
                </span>
              )}
            </label>

            <div className=" w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setMakeModalVisible(false);
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
                {loading ? <img src={load} className=" w-6" alt="" /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAuthor;
