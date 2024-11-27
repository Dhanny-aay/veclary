import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import {
  handleGetTeacherById,
  handleUpdateTeacherById,
} from "../../../controllers/schoolControllers/teachersController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";

const EditTeacher = ({ setEditTeach, teacherID, triggerFetch }) => {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    address: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fetchTeacherByID = async () => {
    try {
      const data = await handleGetTeacherById(teacherID);
      if (data) {
        setTeacher(data);
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherByID();
  }, [teacherID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const requiredFields = ["name", "subject", "address", "status"];

    for (let field of requiredFields) {
      if (!teacher[field]) {
        enqueueSnackbar(`Please fill in the ${field.replace("_", " ")}`, {
          variant: "error",
        });
        return false; // Validation failed
      }
    }
    return true; // Validation successful
  };

  const onSuccess = (response) => {
    setLoadingEdit(false);
    setEditTeach(false);
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
      const userData = teacher;
      handleUpdateTeacherById(teacherID, userData, onSuccess, onError);
    }
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
                  setEditTeach(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Edit Teacher
            </p>
            <div className="w-full mt-6">
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
                  <label
                    htmlFor=""
                    className=" w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Name
                    <input
                      type="text"
                      name="name"
                      value={teacher.name}
                      onChange={handleChange}
                      placeholder="Enter the teacher's name"
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>
                  <label
                    htmlFor=""
                    className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Subject
                    <input
                      type="text"
                      name="subject"
                      value={teacher.subject}
                      onChange={handleChange}
                      placeholder="Enter the teacher's subject"
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>
                  {/* <label
                    htmlFor=""
                    className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Email
                    <input
                      type="email"
                      name="email"
                      value={teacher.email}
                      onChange={handleChange}
                      placeholder="Enter the teacher's email"
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label> */}
                  <label
                    htmlFor=""
                    className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
                  >
                    Address
                    <input
                      type="text"
                      name="address"
                      value={teacher.address}
                      onChange={handleChange}
                      placeholder="Enter the teacher's Address"
                      className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                      id=""
                    />
                  </label>

                  <label className="font-Outfit w-full mt-3 flex flex-col text-[#272D37] text-sm font-medium">
                    Status
                    <select
                      name="status"
                      value={teacher.status}
                      onChange={handleChange}
                      className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal bg-white"
                    >
                      <option value="">Select Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                    </select>
                  </label>

                  <div className=" w-full mt-6 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setEditTeach(false);
                      }}
                      className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
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
      </div>
    </>
  );
};

export default EditTeacher;
