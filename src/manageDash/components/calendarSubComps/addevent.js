import { useEffect, useState } from "react";
import close from "./assets/clos.svg";
import add from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";
import { handleAddEvent } from "../../../controllers/schoolControllers/sessionController";

const AddEvents = ({ setAddEvent, triggerFetch }) => {
  const sessionID = localStorage.getItem("veclary_sessionID");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // Validate all fields
  const validateFields = () => {
    let errors = {};

    if (!name) errors.name = "Event Name is required";
    if (!subtitle) errors.subtitle = "Subtitle is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    setAddEvent(false);
    triggerFetch();
    enqueueSnackbar("Event added successfully!", { variant: "success" });
  };

  const onError = (error) => {
    setLoading(false);
    triggerFetch();
    enqueueSnackbar("Event creation failed!", { variant: "error" });
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return; // If field validation fails, stop submission
    }

    setLoading(true);
    const userData = {
      name,
      subtitle,
      startDate,
      endDate,
    };
    handleAddEvent(sessionID, userData, onSuccess, onError);
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] -[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full bg-[#fff] overflow-auto">
            <span className=" w-full flex items-center justify-between">
              <img src={add} className="" alt="" />
              <img
                onClick={() => {
                  setAddEvent(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Add New Event
            </p>
            <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium mt-6 text-sm">
              Event Name
              <input
                type="text"
                name="name"
                placeholder="e.g, Inter House Sport"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={` font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px]
                     ${errors.name ? "border-red-500" : "border-[#DAE0E6]"}
                `}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.name}
                </p>
              )}
            </label>
            <label className=" w-full flex flex-col text-[#272D37] font-Outfit font-medium mt-4 text-sm">
              Event Subtitle
              <input
                type="text"
                name="name"
                placeholder="Enter Event Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className={` font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border p-2.5 rounded-[5px]
                     ${errors.subtitle ? "border-red-500" : "border-[#DAE0E6]"}
                `}
              />
              {errors.subtitle && (
                <p className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.subtitle}
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

            <div className=" mt-6 w-full grid-cols-2 gap-2 md:gap-6 grid">
              <button
                onClick={() => {
                  setAddEvent(false);
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
                  "Add Event"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvents;
