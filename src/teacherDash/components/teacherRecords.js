import { useContext, useEffect, useState } from "react";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import { handleGetTeacherClasses } from "../../controllers/teacherControllers/teacherClassesControoller";
import { handleGetGradeByClassID } from "../../controllers/teacherControllers/gradesController";

const TeacherRecords = () => {
  const { setSidebarVisible } = useContext(TeacherSidebarContext);
  const { setActivePage } = useContext(TeacherActivePageContext);
  const [classes, setClasses] = useState([]);
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);
  const [noClasses, setNoClasses] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [grades, setGrades] = useState([]);
  const [isFetchingGrades, setIsFetchingGrades] = useState(false);
  const [noGrades, setNoGrades] = useState(false);

  // Function to fetch grades for a selected class
  const fetchGrades = async (classId) => {
    setIsFetchingGrades(true);
    setGrades([]);
    setNoGrades(false);
    try {
      const response = await handleGetGradeByClassID(classId);
      if (response?.grades?.length) {
        setGrades(response.grades);
        setNoGrades(false);
      } else {
        setGrades([]);
        setNoGrades(true);
      }
    } catch (err) {
      setGrades([]);
      setNoGrades(true);
    } finally {
      setIsFetchingGrades(false);
    }
  };

  // Function to fetch all classes taught by the teacher
  const fetchClasses = async () => {
    setIsFetchingClasses(true);
    try {
      const response = await handleGetTeacherClasses();
      if (response?.classes?.length) {
        setClasses(response.classes);
        setNoClasses(false);
        // Set the initial selected class and fetch its grades
        const firstClassId = response.classes[0].classId;
        setSelectedClass(firstClassId);
        fetchGrades(firstClassId);
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

  // Use a separate effect to fetch grades when selectedClass changes
  useEffect(() => {
    if (selectedClass) {
      fetchGrades(selectedClass);
    }
  }, [selectedClass]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const renderTableContent = () => {
    // Show skeletons if either classes or grades are being fetched
    if (isFetchingClasses || isFetchingGrades) {
      return (
        // Loading skeletons
        Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          </tr>
        ))
      );
    }

    if (noGrades) {
      return (
        <tr>
          <td
            colSpan="8"
            className="py-8 text-center font-Outfit text-[#5F6D7E]"
          >
            No grades found for this class.
          </td>
        </tr>
      );
    }

    return grades.map((data, index) => (
      <tr key={index}>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
          0{index + 1}
        </td>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
          {data.name}
        </td>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
          {data.regNo}
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
          {data.test1}/10
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
          {data.test2}/10
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
          {data.test3}/10
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
          {data.exam}/40
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
          {data.test1 + data.test2 + data.test3 + data.exam}/70
        </td>
      </tr>
    ));
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
            My Records
          </p>
        </span>

        <div className="w-full items-start flex px-6 mt-6 justify-between">
          <label
            htmlFor="class-select"
            className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
          >
            Class
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-2 text-[#272D37] text-sm w-[120px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              disabled={isFetchingClasses}
            >
              {isFetchingClasses ? (
                <option>Loading...</option>
              ) : noClasses ? (
                <option>No classes available</option>
              ) : (
                classes.map((classData) => (
                  <option key={classData.classId} value={classData.classId}>
                    {classData.className}
                  </option>
                ))
              )}
            </select>
          </label>
          <button className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]">
            Add New Record
          </button>
        </div>

        <div className="mt-6 px-6">
          <div className="border border-[#EAEBF0] rounded-[10px]">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      Student Names
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      Registration Number
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      Test 1
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      Test 2
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      Test 3
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      Exam
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">
                      Total Score
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableContent()}</tbody>
              </table>
            </div>
            <div className="w-full py-3 px-3 flex justify-between items-center">
              <span className="flex space-x-1">
                <img src={backArr} alt="" />
                <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Prev
                </p>
              </span>
              <span className="flex items-end space-x-4">
                <p className="font-Outfit text-sm text-[#0530A1]">1</p>
                <p className="font-Outfit text-sm">2</p>
                <p className="font-Outfit text-sm">...</p>
                <p className="font-Outfit text-sm">5</p>
                <p className="font-Outfit text-sm">6</p>
              </span>
              <span className="flex space-x-1">
                <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Next
                </p>
                <img src={fwdArr} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherRecords;
