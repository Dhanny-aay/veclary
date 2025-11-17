import { useContext, useState, useEffect } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import { handleGetTeacherClasses } from "../../controllers/teacherControllers/teacherClassesControoller";
import MarkAttendance from "./attendance/markAttendance";
import ViewAttendance from "./attendance/viewAttendance";
import {
  handleCreateAttendance,
  handleGetAttendance,
} from "../../controllers/teacherControllers/attendanceControllers";
import UnifiedAttendance from "./attendance/unifiedAttendance";

const TeacherAttendance = ({ dashboard }) => {
  const { sidebarVisible, setSidebarVisible } = useContext(
    TeacherSidebarContext
  );
  const { setActivePage } = useContext(TeacherActivePageContext);
  const [activeTab, setActiveTab] = useState("mark"); // 'mark' or 'view'
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoadingClasses(true);
      try {
        const response = await handleGetTeacherClasses();
        if (response?.classes) {
          setClasses(response.classes);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setLoadingClasses(false);
      }
    };
    fetchClasses();
  }, []);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Attendance
          </p>
        </span>

        <div className="px-6 mt-6">
          <UnifiedAttendance
            dashboard={dashboard}
            onGetClasses={handleGetTeacherClasses}
            onGetAttendance={handleGetAttendance}
            onSaveAttendance={handleCreateAttendance}
          />
          {/* Tabs */}
          {/* <div className="flex border-b border-[#EAEBF0]">
            <button
              onClick={() => setActiveTab("mark")}
              className={`py-2 px-4 font-Outfit text-sm font-medium ${
                activeTab === "mark"
                  ? "text-[#0530A1] border-b-2 border-[#0530A1]"
                  : "text-[#5F6D7E]"
              }`}
            >
              Mark Attendance
            </button>
            <button
              onClick={() => setActiveTab("view")}
              className={`py-2 px-4 font-Outfit text-sm font-medium ${
                activeTab === "view"
                  ? "text-[#0530A1] border-b-2 border-[#0530A1]"
                  : "text-[#5F6D7E]"
              }`}
            >
              View Attendance
            </button>
          </div> */}
          {/* Tab Content */}
          {/* <div className="mt-6">
            {activeTab === "mark" ? (
              <MarkAttendance
                classes={classes}
                dashboard={dashboard}
                loading={loadingClasses}
              />
            ) : (
              <ViewAttendance classes={classes} dashboard={dashboard} />
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TeacherAttendance;
