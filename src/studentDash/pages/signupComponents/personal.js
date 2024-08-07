import strength from "../assets/strength.svg";
import progress from "../assets/progress.svg";
import { useState, useEffect } from "react";

const PersonalStudent = ({ formData, setFormData }) => {
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
        <img src={progress} className="w-full mt-3" alt="Progress" />
        <p className="font-Outfit font-medium text-2xl mt-6">
          Personal Information
        </p>

        <div className="w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
          <label
            htmlFor="name"
            className="flex flex-col w-full font-Outfit text-sm font-medium"
          >
            Full Name
            <input
              type="text"
              name="name"
              value={personalData.name || ""}
              onChange={handleChange}
              className="border border-[#EAEBF0] text-black h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <label
            htmlFor="email"
            className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            Email Address
            <input
              type="email"
              name="email"
              value={personalData.email || ""}
              onChange={handleChange}
              className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <label
            htmlFor="password"
            className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            Password
            <input
              type="password"
              name="password"
              value={personalData.password || ""}
              onChange={handleChange}
              className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <img src={strength} className="w-full mt-5" alt="Strength" />

          <p className="font-Outfit text-base font-medium text-[#000000B2] mt-4">
            Password Strength Requirement
          </p>
          <div className="flex flex-row justify-between items-center mt-4 w-full">
            {req.map((item, index) => (
              <span
                key={index}
                className="flex flex-col text-center items-center"
              >
                <p className="font-Outfit text-lg font-medium text-[#01A85D]">
                  {item.example}
                </p>
                <p className="font-Outfit text-sm text-[#12121266] font-medium">
                  {item.name}
                </p>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalStudent;
