import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import add from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import { handleAddSession } from "../../controllers/schoolControllers/sessionController";

const AddSession = ({ setAddSession, dashboard, triggerFetch }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [endDate, setEndDate] = useState("");
  const [termStructure, setTermStructure] = useState("");
  const [terms, setTerms] = useState([
    {
      name: "first term",
      startDate: "",
      endDate: "",
      midTermStartDate: "",
      midTermEndDate: "",
      examStartDate: "",
      examEndDate: "",
    },
    {
      name: "second term",
      startDate: "",
      endDate: "",
      midTermStartDate: "",
      midTermEndDate: "",
      examStartDate: "",
      examEndDate: "",
    },
    {
      name: "third term",
      startDate: "",
      endDate: "",
      midTermStartDate: "",
      midTermEndDate: "",
      examStartDate: "",
      examEndDate: "",
    },
  ]);
  const [errors, setErrors] = useState({});

  // useEffect to check dashboard and set schoolId if dashboard is available
  useEffect(() => {
    if (dashboard && dashboard.school && dashboard.school._id) {
      setSchoolId(dashboard.school._id);
    }
  }, [dashboard]);

  // Validation function for session name format
  const validateSessionName = () => {
    const regex = /^\d{4}\/\d{4}$/;
    if (!name.match(regex)) {
      return "Session name must be in the format 'YYYY/YYYY'.";
    }
    return null;
  };

  // Validate all fields
  const validateFields = () => {
    let errors = {};
    const sessionNameError = validateSessionName();

    if (sessionNameError) errors.name = sessionNameError;
    if (!name) errors.name = errors.name || "Session name is required";
    if (!termStructure) errors.termStructure = "Term structure is required";
    if (!status) errors.status = "Status is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";

    terms.forEach((term, index) => {
      if (!term.startDate)
        errors[`startDate${index}`] = "Start date is required";
      if (!term.endDate) errors[`endDate${index}`] = "End date is required";
      if (!term.midTermStartDate)
        errors[`midTermStartDate${index}`] = "Midterm start date is required";
      if (!term.midTermEndDate)
        errors[`midTermEndDate${index}`] = "Midterm end date is required";
      if (!term.examStartDate)
        errors[`examStartDate${index}`] = "Exam start date is required";
      if (!term.examEndDate)
        errors[`examEndDate${index}`] = "Exam end date is required";
    });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle term changes
  const handleChangeTerm = (index, field, value) => {
    const newTerms = [...terms];
    newTerms[index][field] = value;
    setTerms(newTerms);
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddSession(false);
    triggerFetch();
    // enqueueSnackbar("Session added successfully!", { variant: "success" });
  };

  const onError = (error) => {
    setLoading(false);
    triggerFetch();
    // enqueueSnackbar("Failed. Please try again.", {
    //   variant: "error",
    // });
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return; // If field validation fails, stop submission
    }

    if (!schoolId) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        schoolId: "Please refresh the page and start over",
      }));
      return; // Stop submission if schoolId is missing
    }

    setLoading(true);
    const userData = {
      name,
      schoolId,
      status,
      startDate,
      endDate,
      termStructure,
      terms,
    };
    handleAddSession(userData, onSuccess, onError);
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full bg-[#fff] overflow-auto">
            <span className=" w-full flex items-center justify-between">
              <img src={add} className="" alt="" />
              <img
                onClick={() => {
                  setAddSession(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              New Session
            </p>
            <div className=" w-full mt-6 grid grid-cols-2 gap-2 md:gap-4">
              <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                Session Name
                <input
                  type="text"
                  name="name"
                  placeholder="e.g, 2022/2023"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={validateSessionName}
                  className={` font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                    errors.name ? "border-red-500" : "border-[#DAE0E6]"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.name}
                  </p>
                )}
              </label>
              <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                Term Structure
                <span
                  className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                    errors.termStructure ? "border-red-500" : "border-[#DAE0E6]"
                  }`}
                >
                  <select
                    name=""
                    value={termStructure}
                    className=" w-full"
                    onChange={(e) => setTermStructure(e.target.value)}
                    id=""
                  >
                    <option value="">e.g, 12 weeks</option>
                    <option value="10 weeks">10 weeks</option>
                    <option value="11 weeks">11 weeks</option>
                    <option value="12 weeks">12 weeks</option>
                    <option value="13 weeks">13 weeks</option>
                    <option value="14 weeks">14 weeks</option>
                  </select>
                </span>
                {errors.termStructure && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.termStructure}
                  </p>
                )}
              </label>
            </div>

            <label className="mt-4 w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
              Status
              <span
                className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                  errors.status ? "border-red-500" : "border-[#DAE0E6]"
                }`}
              >
                <select
                  name=""
                  value={status}
                  className=" w-full"
                  onChange={(e) => setStatus(e.target.value)}
                  id=""
                >
                  <option value="">e.g, Pending</option>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Ended">Ended</option>
                </select>
              </span>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.status}
                </p>
              )}
            </label>

            <div className=" w-full mt-4 grid grid-cols-2 gap-2 md:gap-4">
              <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                Start Date
                <input
                  type="date"
                  name="name"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={` font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                    errors.startDate ? "border-red-500" : "border-[#DAE0E6]"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.startDate}
                  </p>
                )}
              </label>
              <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                End Date
                <input
                  type="date"
                  name="name"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={` font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                    errors.endDate ? "border-red-500" : "border-[#DAE0E6]"
                  }`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.endDate}
                  </p>
                )}
              </label>
            </div>

            {/* Render Term Inputs */}
            {terms.map((term, index) => (
              <div key={term.name}>
                <p className=" mt-4 font-medium text-[#272D37] font-Outfit text-lg">
                  {term.name.charAt(0).toUpperCase() + term.name.slice(1)}
                </p>
                <div className=" w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                    Start Date
                    <input
                      type="date"
                      value={term.startDate}
                      onChange={(e) =>
                        handleChangeTerm(index, "startDate", e.target.value)
                      }
                      className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                        errors[`startDate${index}`]
                          ? "border-red-500"
                          : "border-[#DAE0E6]"
                      }`}
                    />
                    {errors[`startDate${index}`] && (
                      <p className="text-red-500 text-xs mt-1 font-Outfit">
                        {errors[`startDate${index}`]}
                      </p>
                    )}
                  </label>
                  <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                    Midterm Break (Start and End Date)
                    <div className=" w-full grid grid-cols-2 gap-2">
                      <div className=" w-full">
                        <input
                          type="date"
                          value={term.midTermStartDate}
                          onChange={(e) =>
                            handleChangeTerm(
                              index,
                              "midTermStartDate",
                              e.target.value
                            )
                          }
                          className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                            errors[`midTermStartDate${index}`]
                              ? "border-red-500"
                              : "border-[#DAE0E6]"
                          }`}
                        />
                        {errors[`midTermStartDate${index}`] && (
                          <p className="text-red-500 text-xs mt-1 font-Outfit">
                            {errors[`midTermStartDate${index}`]}
                          </p>
                        )}
                      </div>
                      <div className=" w-full">
                        <input
                          type="date"
                          value={term.midTermEndDate}
                          onChange={(e) =>
                            handleChangeTerm(
                              index,
                              "midTermEndDate",
                              e.target.value
                            )
                          }
                          className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                            errors[`midTermEndDate${index}`]
                              ? "border-red-500"
                              : "border-[#DAE0E6]"
                          }`}
                        />
                        {errors[`midTermEndDate${index}`] && (
                          <p className="text-red-500 text-xs mt-1 font-Outfit">
                            {errors[`midTermEndDate${index}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
                <div className=" w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                    Exams (Start and End Date)
                    <div className=" w-full grid grid-cols-2 gap-2">
                      <div className=" w-full">
                        <input
                          type="date"
                          value={term.examStartDate}
                          onChange={(e) =>
                            handleChangeTerm(
                              index,
                              "examStartDate",
                              e.target.value
                            )
                          }
                          className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                            errors[`examStartDate${index}`]
                              ? "border-red-500"
                              : "border-[#DAE0E6]"
                          }`}
                        />
                        {errors[`examStartDate${index}`] && (
                          <p className="text-red-500 text-xs mt-1 font-Outfit">
                            {errors[`examStartDate${index}`]}
                          </p>
                        )}
                      </div>
                      <div className=" w-full">
                        <input
                          type="date"
                          value={term.examEndDate}
                          onChange={(e) =>
                            handleChangeTerm(
                              index,
                              "examEndDate",
                              e.target.value
                            )
                          }
                          className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                            errors[`examEndDate${index}`]
                              ? "border-red-500"
                              : "border-[#DAE0E6]"
                          }`}
                        />
                        {errors[`examEndDate${index}`] && (
                          <p className="text-red-500 text-xs mt-1 font-Outfit">
                            {errors[`examEndDate${index}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </label>

                  <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
                    End Date
                    <input
                      type="date"
                      value={term.endDate}
                      onChange={(e) =>
                        handleChangeTerm(index, "endDate", e.target.value)
                      }
                      className={` font-Outfit text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px] ${
                        errors[`endDate${index}`]
                          ? "border-red-500"
                          : "border-[#DAE0E6]"
                      }`}
                    />
                    {errors[`endDate${index}`] && (
                      <p className="text-red-500 text-xs mt-1 font-Outfit">
                        {errors[`endDate${index}`]}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            ))}

            {errors.schoolId && (
              <p className="text-red-500 text-sm mt-1 font-Outfit">
                {errors.schoolId}
              </p>
            )}

            <div className=" mt-6 w-full grid-cols-2 gap-2 md:gap-6 grid">
              <button
                onClick={() => {
                  setAddSession(false);
                }}
                className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base flex items-center justify-center"
              >
                {loading ? (
                  <img src={load} className=" w-5" alt="Loading" />
                ) : (
                  "Add Session"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSession;
