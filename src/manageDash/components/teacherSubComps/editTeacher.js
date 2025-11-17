import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/addBlk.svg";
import load from "./assets/load.gif";
import {
  handleGetTeacherById,
  handleUpdateTeacherById,
} from "../../../controllers/schoolControllers/teachersController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import SnackbarUtils from "../../../utils/snackbarUtils";
import { handleGetSchoolClasses } from "../../../controllers/schoolControllers/classController";
import { handleGetSchoolSubjects } from "../../../controllers/schoolControllers/subjectController";

const EditTeacher = ({ setEditTeach, teacherID, triggerFetch }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const [classId, setClassID] = useState("");
  const [errors, setErrors] = useState({});

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true);

  const fetchTeacherByID = async () => {
    try {
      const data = await handleGetTeacherById(teacherID);
      if (data) {
        setName(data.name);
        setSubject(data.subject);
        setAddress(data.address);
        setStatus(data.status);
        if (data.classId) {
          setIsClassTeacher(true);
          setClassID(data.classId._id);
        }
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const data = await handleGetSchoolSubjects();
      if (data) {
        setSubjects(data[0].subjects);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const fetchClasses = async () => {
    setLoadingClasses(true);
    try {
      const data = await handleGetSchoolClasses();
      if (data) {
        setClasses(data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    fetchTeacherByID();
    fetchSubjects();
    fetchClasses();
  }, [teacherID]);

  const handleToggle = () => {
    setIsClassTeacher(!isClassTeacher);
    setClassID("");
  };

  const validateFields = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!subject) errors.subject = "Subject is required";
    if (!address) errors.address = "Address is required";
    if (!status) errors.status = "Status is required";
    if (isClassTeacher && !classId) errors.classId = "Class is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSuccess = () => {
    setLoadingEdit(false);
    setEditTeach(false);
    triggerFetch();
    // SnackbarUtils.success("Teacher edited successfully!");
  };

  const onError = (error) => {
    setLoadingEdit(false);
    // SnackbarUtils.error("Failed. Please try again.");
  };

  const handleSave = () => {
    if (!validateFields()) {
      return;
    }
    setLoadingEdit(true);

    const userData = {
      name,
      subject,
      address,
      status,
      classTeacher: isClassTeacher,
      classId: isClassTeacher ? classId : null,
    };

    handleUpdateTeacherById(teacherID, userData, onSuccess, onError);
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
                    htmlFor="name"
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
                      id="name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-Outfit">
                        {errors.name}
                      </p>
                    )}
                  </label>

                  <div className="mt-3 w-full flex flex-row items-center justify-between">
                    <label
                      htmlFor="subject-dropdown"
                      className=" font-Outfit font-medium text-sm text-[#272D37]"
                    >
                      Choose Subject
                    </label>
                  </div>
                  <span className="w-full border border-[#DAE0E6] mt-[6px] block px-4 py-3 rounded-[5px] bg-white">
                    {loadingSubjects ? (
                      <GenericLoadingSkeleton
                        count={1}
                        width="100%"
                        height={40}
                      />
                    ) : (
                      <select
                        name="subject"
                        id="subject-dropdown"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-transparent font-Outfit font-normal text-sm text-[#919BA7]"
                      >
                        <option value="">Choose Subject</option>
                        {subjects.map((s) => (
                          <option key={s._id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </span>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1 font-Outfit">
                      {errors.subject}
                    </p>
                  )}

                  <label
                    htmlFor="address"
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
                      id="address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1 font-Outfit">
                        {errors.address}
                      </p>
                    )}
                  </label>

                  <label className="font-Outfit w-full mt-3 flex flex-col text-[#272D37] text-sm font-medium">
                    Status
                    <select
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal bg-white"
                    >
                      <option value="">Select Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-xs mt-1 font-Outfit">
                        {errors.status}
                      </p>
                    )}
                  </label>

                  <div className="flex items-center space-x-3 mt-4">
                    <p className="font-Outfit font-medium text-[#272D37] text-sm">
                      Assign as a Class Teacher
                    </p>
                    <label className="switch">
                      <input
                        checked={isClassTeacher}
                        onChange={handleToggle}
                        className="cursor-pointer"
                        type="checkbox"
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  {isClassTeacher && (
                    <label className="font-Outfit w-full flex flex-col text-[#272D37] text-sm mt-3 font-medium">
                      Class
                      {loadingClasses ? (
                        <GenericLoadingSkeleton
                          count={1}
                          width="100%"
                          height={40}
                        />
                      ) : classes.length === 0 ? (
                        <p className="text-red-500 text-sm mt-2 font-Outfit">
                          There are no classes yet.
                        </p>
                      ) : (
                        <select
                          value={classId}
                          onChange={(e) => setClassID(e.target.value)}
                          className="mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px] text-sm font-Outfit font-normal text-[#919BA7] w-full"
                        >
                          <option value="">Select Class</option>
                          {classes.map((item) => (
                            <option value={item._id} key={item._id}>
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
                        setEditTeach(false);
                      }}
                      className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={
                        loadingEdit ||
                        loading ||
                        loadingSubjects ||
                        loadingClasses
                      }
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
