import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import { useState } from "react";
import load from "./assets/load.gif";
import { handleMakePublisherAnnounce } from "../../controllers/publisherController/generalController";
import { useSnackbar } from "notistack";

const AddAnnouncement = ({ setMakeAnnouncement, triggerFetch }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  // Validation function
  const validateFields = () => {
    const newErrors = {};

    if (title.trim() === "")
      newErrors.title = "Announcement's title is required";
    if (subtitle.trim() === "")
      newErrors.subtitle = "Announcement's subtitle is required";
    if (content.trim() === "")
      newErrors.content = "Announcement's body is required";
    if (date.trim() === "")
      newErrors.date = "Announcement's Schedule date is required";
    if (time.trim() === "")
      newErrors.time = "Announcement's Schedule time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSuccess = (response) => {
    setLoading(false);
    enqueueSnackbar("Annoucement added successfully", { variant: "success" });
    triggerFetch();
    setMakeAnnouncement(false);
  };

  const onError = (error) => {
    setLoading(false);
    enqueueSnackbar("Upload Failed", { variant: "error" });
    setMakeAnnouncement(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    const isValid = validateFields();

    if (isValid) {
      setLoading(true);

      const userData = {
        title,
        subtitle,
        content,
        scheduleTime: time + " " + date,
      };
      handleMakePublisherAnnounce(userData, onSuccess, onError);
    }
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 w-full md:w-[400px]">
          <div className="w-full h-full bg-[#fff] overflow-auto rounded-[15px]">
            <span className=" w-full flex items-center justify-between">
              <img src={announce} alt="" />
              <img
                onClick={() => {
                  setMakeAnnouncement(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Create an announcement
            </p>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title of announcement"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.title && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.title}
                </span>
              )}
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Subtitle
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="Enter subtitle of announcement"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.subtitle && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.subtitle}
                </span>
              )}
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Body
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter body of announcement"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
              {errors.content && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.content}
                </span>
              )}
            </label>

            <div className=" w-full grid grid-cols-2 gap-4">
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Schedule time
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
                {errors.time && (
                  <span className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.time}
                  </span>
                )}
              </label>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Schedule date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
                {errors.date && (
                  <span className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.date}
                  </span>
                )}
              </label>
            </div>
            <div className=" w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setMakeAnnouncement(false);
                }}
                className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base flex items-center justify-center"
              >
                {loading ? (
                  <img src={load} className=" w-6" alt="" />
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAnnouncement;
