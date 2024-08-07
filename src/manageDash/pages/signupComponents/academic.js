import progress1 from "../assets/progress1.svg";
import { useState, useEffect } from "react";

const AcademicManage = ({ formData, setFormData }) => {
  const [academicData, setAcademicData] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setAcademicData(formData);
  }, [formData]);

  return (
    <>
      <div className="w-full">
        <img src={progress1} className=" w-full mt-3" alt="" />
        <p className=" font-Outfit font-medium text-2xl mt-6">
          School Administrator Information
        </p>
        <p className=" font-Outfit text-[#636363] font-normal text-sm">
          Individual approve...
        </p>

        <div className=" w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
          <label
            htmlFor="adminName"
            className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            Administrator Name
            <input
              type="text"
              name="adminName"
              value={academicData.adminName || ""}
              onChange={handleChange}
              className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <label
            htmlFor="adminEmail"
            className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            Administrator Email Address
            <input
              type="email"
              name="adminEmail"
              value={academicData.adminEmail || ""}
              onChange={handleChange}
              className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <label
            htmlFor="AdminPassword"
            className=" flex flex-col mb-12 w-full font-Outfit text-sm font-medium mt-4"
          >
            Administrator Password
            <input
              type="password"
              name="AdminPassword"
              value={academicData.AdminPassword || ""}
              onChange={handleChange}
              className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default AcademicManage;
