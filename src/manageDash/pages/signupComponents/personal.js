import strength from "../assets/strength.svg";
import progress from "../assets/progress.svg";
import { useState, useEffect } from "react";

const PersonalManage = ({ formData, setFormData }) => {
  const [personalData, setPersonalData] = useState(formData);

  const req = [
    { name: "Characters", example: "8+" },
    { name: "Uppercase", example: "AA" },
    { name: "Lowercase", example: "aa" },
    { name: "Numbers", example: "123" },
    { name: "Symbol", example: "$#^" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setPersonalData(formData);
  }, [formData]);

  return (
    <>
      <div className="w-full">
        <img src={progress} className=" w-full mt-3" alt="" />
        <p className=" font-Outfit font-medium text-2xl mt-6">
          School Information
        </p>

        <div className=" w-full mt-4 lg:overflow-y-auto lg:h-[260px]">
          <label
            htmlFor="schoolName"
            className=" flex flex-col w-full font-Outfit text-sm font-medium"
          >
            School Name
            <input
              type="text"
              name="schoolName"
              value={personalData.schoolName || ""}
              onChange={handleChange}
              className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <div className=" w-full flex justify-between items-center">
            <label
              htmlFor="schoolCAC"
              className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
            >
              School CAC Number
              <input
                type="text"
                name="schoolCAC"
                value={personalData.schoolCAC || ""}
                onChange={handleChange}
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="schoolReg"
              className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
            >
              School Registration Number
              <input
                type="number"
                name="schoolReg"
                value={personalData.schoolReg || ""}
                onChange={handleChange}
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full flex justify-between items-end">
            <label
              htmlFor="schoolPhone"
              className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
            >
              School Contact Information
              <input
                type="number"
                name="schoolPhone"
                value={personalData.schoolPhone || ""}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="schoolEmail"
              className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
            >
              <input
                type="email"
                name="schoolEmail"
                value={personalData.schoolEmail || ""}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>
          </div>

          <label
            htmlFor="schoolAddress"
            className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            School Address
            <input
              type="text"
              name="schoolAddress"
              value={personalData.schoolAddress || ""}
              onChange={handleChange}
              className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          {/* <div className=" w-full flex justify-between items-end">
            <label
              htmlFor="Email"
              className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
            >
              State
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="Email"
              className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
            >
              Country
              <input
                type="email"
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>
          </div> */}

          <label
            htmlFor="schoolWebsite"
            className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            School Website (optional)
            <input
              type="text"
              name="schoolWebsite"
              value={personalData.schoolWebsite || ""}
              onChange={handleChange}
              className=" border border-[#EAEBF0] h-[40px] mb-10 p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>
        </div>
      </div>{" "}
    </>
  );
};

export default PersonalManage;
