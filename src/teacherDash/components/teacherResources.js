import React, { useContext, useState } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import StudyResources from "./studyResources";
import TeacherAssignments from "./assignmentComps/teacherAssignments";

export default function TeacherResources({ dashboard }) {
  const { setSidebarVisible } = useContext(TeacherSidebarContext);
  const { setActivePage } = useContext(TeacherActivePageContext);
  const [activeTab, setActiveTab] = useState("study"); // 'study' or 'assignments'

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Resources
          </p>
        </span>
        <div className="px-6 mt-6">
          <div className="flex border-b border-[#EAEBF0]">
            <button
              onClick={() => setActiveTab("study")}
              className={`py-2 px-4 font-Outfit text-sm font-medium ${
                activeTab === "study"
                  ? "text-[#0530A1] border-b-2 border-[#0530A1]"
                  : "text-[#5F6D7E]"
              }`}
            >
              Study Resources
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`py-2 px-4 font-Outfit text-sm font-medium ${
                activeTab === "assignments"
                  ? "text-[#0530A1] border-b-2 border-[#0530A1]"
                  : "text-[#5F6D7E]"
              }`}
            >
              Assignments
            </button>
          </div>
          <div className="mt-6">
            {activeTab === "study" ? (
              <StudyResources />
            ) : (
              <TeacherAssignments dashboard={dashboard} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
