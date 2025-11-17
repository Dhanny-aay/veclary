import { useContext, useEffect, useState } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import classbg from "./assets/classbg.svg";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";
import { DatePicker } from "rsuite";
import Mcq from "./assignmentComps/mcq";
import Handwritten from "./assignmentComps/handWritten";
import { handleGetTeacherClasses } from "../../controllers/teacherControllers/teacherClassesControoller";
import TeacherClassDetails from "./teacherClassDetails";

const SkeletonCard = () => (
  <div className="w-full bg-gray-200 animate-pulse rounded-[15px] p-6 h-[280px]">
    <div className="bg-gray-300 h-6 w-3/4 rounded mb-4"></div>
    <div className="bg-gray-300 h-[200px] w-full rounded-[10px]"></div>
  </div>
);

const TeacherClasses = () => {
  const { setSidebarVisible } = useContext(TeacherSidebarContext);
  const { setActivePage } = useContext(TeacherActivePageContext);
  const [selectedClass, setSelectedClass] = useState(null);
  const [createSchedule, setCreateSchedule] = useState(false);
  const [createAssignment, setCreateAssignment] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentComponent, setCurrentComponent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);
  const [noClasses, setNoClasses] = useState(false);

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      setCreateAssignment(false);
      switch (selectedOption) {
        case "Handwritten":
          setCurrentComponent(
            <Handwritten onCancel={resetToCreateAssignment} />
          );
          break;
        case "MCQ":
          setCurrentComponent(<Mcq onCancel={resetToCreateAssignment} />);
          break;
        default:
          setCurrentComponent(null);
      }
    } else {
      alert("Please select an option before continuing.");
    }
  };

  const fetchClasses = async () => {
    setIsFetchingClasses(true);
    try {
      const response = await handleGetTeacherClasses();
      if (response?.classes?.length) {
        setClasses(response.classes);
        setNoClasses(false);
      } else {
        setClasses([]);
        setNoClasses(true);
      }
    } catch (err) {
      setClasses([]);
      setNoClasses(true);
    } finally {
      setIsFetchingClasses(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleBackClick = () => {
    setSelectedClass(null);
  };

  const resetToCreateAssignment = () => {
    setSelectedOption("");
    setCreateAssignment(true);
    setCurrentComponent(null);
  };

  const formatClassName = (name) => {
    if (!name) return "";
    const lowerName = name.toLowerCase();
    if (lowerName.includes("primary")) {
      const parts = name.split(" ");
      return `Pry ${parts[1]}`;
    }
    return name;
  };

  return (
    <>
      {createAssignment && (
        <div className="w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <div className="ml-[20%] bg-[#FFFFFF] h-[420px] p-6 rounded-[15px] w-[400px]">
              <div className="w-full h-full overflow-y-auto bg-white">
                <span className="w-full flex items-center justify-between">
                  <img src={announce} alt="" />
                  <img
                    onClick={() => setCreateAssignment(false)}
                    src={close}
                    className="w-4"
                    alt=""
                  />
                </span>
                <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                  Add new Assignment
                </p>
                <p className="text-base text-[#5F6D7E] font-semibold mt-2 font-Outfit">
                  Choose form of assignment
                </p>
                <label className="mt-6 flex flex-row items-center font-Outfit font-medium text-base text-[#272b37] space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-6 custom-checkbox"
                    checked={selectedOption === "Handwritten"}
                    onChange={() => handleCheckboxChange("Handwritten")}
                  />
                  <span className="checkmark"></span>
                  <p>Handwritten</p>
                </label>
                <label className="mt-4 flex flex-row items-center font-Outfit font-medium text-base text-[#272b37] space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-6 custom-checkbox"
                    checked={selectedOption === "Typed"}
                    onChange={() => handleCheckboxChange("Typed")}
                  />
                  <span className="checkmark"></span>
                  <p>Typed</p>
                </label>
                <label className="mt-4 flex flex-row items-center font-Outfit font-medium text-base text-[#272b37] space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-6 custom-checkbox"
                    checked={selectedOption === "Theory"}
                    onChange={() => handleCheckboxChange("Theory")}
                  />
                  <span className="checkmark"></span>
                  <p>Theory</p>
                </label>
                <label className="mt-4 flex flex-row items-center font-Outfit font-medium text-base text-[#272b37] space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-6 custom-checkbox"
                    checked={selectedOption === "MCQ"}
                    onChange={() => handleCheckboxChange("MCQ")}
                  />
                  <span className="checkmark"></span>
                  <p>MCQ</p>
                </label>
                <div className="w-full mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCreateAssignment(false)}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContinue}
                    className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentComponent}

      {createSchedule && (
        <div className="w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
          <div className="w-full h-full flex justify-center items-center">
            <div className="ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[400px]">
              <span className="w-full flex items-center justify-between">
                <img src={announce} alt="" />
                <img
                  onClick={() => setCreateSchedule(false)}
                  src={close}
                  className="w-4"
                  alt=""
                />
              </span>
              <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                Create a schedule
              </p>
              <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                Title
                <input
                  type="text"
                  placeholder="Enter title of schedule"
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
              </label>
              <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                Body
                <textarea
                  placeholder="Enter body of schedule"
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
              </label>
              <div className="w-full grid grid-cols-2 gap-4">
                <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                  Select time
                  <DatePicker className="z-[99999] font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]" />
                </label>
                <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                  Select date
                  <DatePicker className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]" />
                </label>
              </div>
              <div className="w-full mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCreateSchedule(false)}
                  className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                >
                  Cancel
                </button>
                <button className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedClass ? (
        <TeacherClassDetails
          classItem={selectedClass}
          onBackClick={handleBackClick}
        />
      ) : (
        <div
          onClick={() => setSidebarVisible(false)}
          className="absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
        >
          <span
            onClick={() => setActivePage("Home")}
            className="cursor-pointer px-6 mt-6 flex flex-row items-center"
          >
            <img src={arrowBlue} alt="" />
            <p className="font-Outfit text-[#0530A1] text-sm font-medium">
              Back
            </p>
            <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
              Classes
            </p>
          </span>
          <div className="px-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {isFetchingClasses ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : noClasses ? (
              <p>No classes found.</p>
            ) : (
              classes.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClassClick(item)}
                  className="w-full bg-[#f8f8f8] rounded-[15px] p-6 cursor-pointer"
                >
                  <p className="font-Outfit text-xl font-semibold text-[#121212] capitalize">
                    {item.className}
                  </p>
                  <div
                    style={{
                      backgroundImage: `url(${classbg})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="w-full bg-[#C9E4FC] h-[200px] text-[#121212] rounded-[10px] font-Outfit font-semibold text-5xl flex items-center justify-center capitalize mt-4"
                  >
                    {formatClassName(item.className)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherClasses;
