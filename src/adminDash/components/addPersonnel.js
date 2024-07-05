import close from "./assets/Button Close.svg";
import icon from "./assets/Icon.svg";

const AddPersonnel = ({ setAddPerson }) => {
  return (
    <>
      <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
        <div className=" w-full h-full flex justify-center items-center">
          <div className="ml-[20%] bg-[#FFFFFF] py-6 rounded-[15px] w-[500px] md:h-[400px] lg:h-[550px]">
            <div className=" w-full h-full overflow-y-auto px-5">
              <span className=" w-full flex items-center justify-between">
                <img src={icon} alt="" />
                <img
                  onClick={() => {
                    setAddPerson(false);
                  }}
                  src={close}
                  className=" "
                  alt=""
                />
              </span>
              <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                Add new personnel
              </p>
              <div className=" w-full flex justify-between items-center">
                <label
                  htmlFor=""
                  className=" w-full md:w-[48%] flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  First name
                  <input
                    type="text"
                    name=""
                    placeholder="Enter First name"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>
                <label
                  htmlFor=""
                  className=" w-full md:w-[48%] flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Other name
                  <input
                    type="text"
                    name=""
                    placeholder="Enter Other name"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>
              </div>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Email Address
                <input
                  type="text"
                  name=""
                  placeholder="Enter Email Address"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Phone Number
                <input
                  type="text"
                  name=""
                  placeholder="Enter Phone Number"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Password
                <input
                  type="text"
                  name=""
                  placeholder="Create Password"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Department
                <input
                  type="text"
                  name=""
                  placeholder="Enter Department"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>
              <label
                htmlFor=""
                className=" w-full flex flex-col mt-3 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Staff position
                <input
                  type="text"
                  name=""
                  placeholder="Enter Staff position"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>

              <div className=" w-full mt-6 ">
                <button className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base">
                  Add Personnel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPersonnel;
