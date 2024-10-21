import { useState } from "react";
import close from "./assets/clos.svg";
import edit from "./assets/teach.svg";
import add from "./assets/addBlk.svg";
import { useSnackbar } from "notistack";
import load from "./assets/load.gif";

const AddStudent = ({ setAddStudent }) => {
  return (
    <>
      <div className=" w-full md:w-[120%] h-full bg-[#1212128d] z-[99999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className=" w-full h-full flex justify-center items-center">
          <div className=" md:ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[400px]">
            <span className=" w-full flex items-center justify-between">
              <img src={add} className="" alt="" />
              <img
                onClick={() => {
                  setAddStudent(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Add new Student
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
