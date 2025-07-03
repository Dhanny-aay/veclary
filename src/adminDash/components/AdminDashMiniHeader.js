import React from "react";

const AdminDashMiniHeader = ({ name, bodyText }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    const initials = words[0][0] + (words[1] ? words[1][0] : "");
    return initials.toUpperCase();
  };

  return (
    <div className="flex border-b border-[#EAEBF0] pb-6 flex-row md:items-center space-x-4 md:space-x-3">
      <span className="w-[50px] md:w-[85px] h-[45px] md:h-[85px] rounded-[50%] bg-[#EAEBF0] flex items-center justify-center text-xl md:text-3xl font-bold">
        {getInitials(name)}
      </span>
      <span className="flex flex-col">
        <p className="font-Outfit font-medium text-xl text-black md:text-3xl capitalize">
          Welcome back, {name || "Sales Officer"}!
        </p>
        <p className="font-Outfit text-base md:text-lg font-normal text-[#000000B2]">
          {bodyText}
        </p>
      </span>
    </div>
  );
};
export default AdminDashMiniHeader;
