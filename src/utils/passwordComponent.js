import React, { useState, useEffect } from "react";

const PasswordComponent = ({ onChange }) => {
  const [personalData, setPersonalData] = useState({ password: "" });
  const req = [
    { name: "Characters", example: "8+", check: (pass) => pass.length >= 8 },
    { name: "Uppercase", example: "AA", check: (pass) => /[A-Z]/.test(pass) },
    { name: "Lowercase", example: "aa", check: (pass) => /[a-z]/.test(pass) },
    { name: "Numbers", example: "123", check: (pass) => /\d/.test(pass) },
    {
      name: "Symbol",
      example: "$#@",
      check: (pass) => /[!@#$%^&*]/.test(pass),
    },
  ];

  useEffect(() => {
    if (onChange) onChange(personalData.password);
  }, [personalData.password, onChange]);

  const handleChange = (e) => {
    setPersonalData({ ...personalData, password: e.target.value });
  };

  return (
    <div className="w-full">
      <label
        htmlFor="password"
        className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
      >
        Password
        <input
          type="password"
          id="password"
          name="password"
          value={personalData.password || ""}
          onChange={handleChange}
          className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
        />
      </label>

      <p className="font-Outfit text-base font-medium text-[#000000B2] mt-4">
        Password Strength Requirement
      </p>
      <div className="flex flex-row justify-between items-center mt-4 w-full space-x-4">
        {req.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-1/5">
            <div
              className={`h-1 w-full rounded-full transition-all duration-300 ${
                item.check(personalData.password)
                  ? "bg-[#01A85D]"
                  : "bg-[#EAEBF0]"
              }`}
              style={{ marginBottom: "8px" }} // Added space below the bar
            />
            <span className="flex flex-col text-center items-center">
              <p
                className={`font-Outfit text-lg font-medium ${
                  item.check(personalData.password)
                    ? "text-[#01A85D]"
                    : "text-[#12121266]"
                }`}
              >
                {item.example}
              </p>
              <p className="font-Outfit text-sm text-[#12121266] font-medium">
                {item.name}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordComponent;
