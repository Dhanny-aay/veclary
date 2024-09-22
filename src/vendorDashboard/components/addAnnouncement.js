import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import { DatePicker } from "rsuite";

const AddAnnouncement = ({ setMakeAnnouncement }) => {
  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[400px]">
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
                name=""
                placeholder="Enter title of announcement"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Body
              <textarea
                type="text"
                name=""
                placeholder="Enter body of announcement"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
            </label>

            <div className=" w-full grid grid-cols-2 gap-4">
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Select time
                <DatePicker
                  className=" z-[99999] font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]"
                  id=""
                />
              </label>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Select date
                <DatePicker
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]"
                  id=""
                />
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
              <button className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAnnouncement;
