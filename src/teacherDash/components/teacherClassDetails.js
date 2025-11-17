import { useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import chart from "./assets/chart.svg";
import chart1 from "./assets/chart1.svg";
import chart2 from "./assets/chart2.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import { handleGetGradeByClassID } from "../../controllers/teacherControllers/gradesController";
import EditRecord from "./recordComps/editRecord";
import edit from "./assets/edit.svg";
import { Upload, Download } from "lucide-react";
import AddRecord from "./recordComps/addRecord";
import UploadRecordsModal from "./recordComps/uploadRecordsModal";

const TeacherClassDetails = ({ classItem, onBackClick }) => {
  const [grades, setGrades] = useState([]);
  const [isFetchingGrades, setIsFetchingGrades] = useState(false);
  const [noGrades, setNoGrades] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [createSchedule, setCreateSchedule] = useState(false);
  const [addRecord, setAddRecord] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchGrades = async (classId) => {
    setIsFetchingGrades(true);
    setGrades([]);
    setNoGrades(false);
    try {
      const response = await handleGetGradeByClassID(classId);
      if (response?.length) {
        const flattenedGrades = response.flatMap((item) => {
          if (item.participants && Array.isArray(item.participants)) {
            return item.participants.map((participant) => ({
              ...item,
              studentId: {
                ...participant.studentId,
                name: participant.studentId.userId.name,
                email: participant.studentId.userId.email,
              },
              score: participant.score,
              participantId: participant._id,
              assessmentId: item._id,
              _id: `${item._id}-${participant._id}`,
            }));
          } else if (item.studentId && item.studentId.userId) {
            item.studentId.name = item.studentId.userId.name;
          }
          return item;
        });
        setGrades(flattenedGrades);
      } else {
        setNoGrades(true);
      }
    } catch (err) {
      setNoGrades(true);
    } finally {
      setIsFetchingGrades(false);
    }
  };

  useEffect(() => {
    if (classItem) {
      fetchGrades(classItem.classId);
    }
  }, [classItem]);

  const performance = [
    { name: "Assignment", percentage: "90%", stat: "Weekly Stats", img: chart },
    { name: "Test", percentage: "88%", stat: "Monthly Growth", img: chart1 },
    {
      name: "Examination",
      percentage: "70%",
      stat: "Monthly Growth",
      img: chart2,
    },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrades = grades.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(grades.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderRecordsTable = () => {
    if (isFetchingGrades) {
      return [...Array(5)].map((_, index) => (
        <tr key={index} className="animate-pulse h-14">
          {[...Array(8)].map((_, cellIndex) => (
            <td key={cellIndex} className="py-4 border-t border-[#EAEBF0]">
              <div className="h-4 bg-gray-200 rounded"></div>
            </td>
          ))}
        </tr>
      ));
    }
    if (noGrades) {
      return (
        <tr>
          <td
            colSpan="8"
            className="py-8 text-center font-Outfit text-[#5F6D7E]"
          >
            No records found for this class.
          </td>
        </tr>
      );
    }
    return currentGrades.map((data, index) => (
      <tr key={data._id}>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center capitalize">
          {indexOfFirstItem + index + 1}
        </td>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
          {data.studentId?.name || "N/A"}
        </td>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
          {data.subjectId?.name || "N/A"}
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
          {data.name}
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
          {data.category}
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
          {data.score}
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
          {data.totalScore}
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
          <img
            src={edit}
            alt="edit"
            className="w-4 cursor-pointer mx-auto"
            onClick={() => setEditRecord(data)}
          />
        </td>
      </tr>
    ));
  };

  const renderStudentsTable = () => {
    const students = classItem?.students || [];
    if (students.length === 0) {
      return (
        <tr>
          <td
            colSpan="4"
            className="py-8 text-center font-Outfit text-[#5F6D7E]"
          >
            No students found in this class.
          </td>
        </tr>
      );
    }
    return students.map((student, index) => (
      <tr key={student._id}>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
          {index + 1}
        </td>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
          {student.userId.name}
        </td>
        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
          {student.userId.email}
        </td>
        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
          {new Date(student.createdAt).toLocaleDateString()}
        </td>
      </tr>
    ));
  };

  return (
    <>
      {addRecord && (
        <AddRecord
          classItem={classItem}
          setAddRecord={setAddRecord}
          triggerFetch={() => fetchGrades(classItem.classId)}
        />
      )}
      {editRecord && (
        <EditRecord
          classItem={classItem}
          record={editRecord}
          setEditRecord={setEditRecord}
          triggerFetch={() => fetchGrades(classItem.classId)}
        />
      )}
      {showUploadModal && (
        <UploadRecordsModal
          classItem={classItem}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => fetchGrades(classItem.classId)}
        />
      )}
      <div className="absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
        <span
          onClick={onBackClick}
          className="cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            My Class
          </p>
        </span>

        <div className="px-6 mt-6 w-full">
          <div className="w-full flex flex-col md:flex-row md:items-start mt-6 md:justify-between">
            <label className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium capitalize">
              {classItem.className} Class
              <input
                type="text"
                value={`Total Students: ${classItem.studentCount}`}
                className="mt-2 text-[#272D37] text-sm w-[150px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
                readOnly
              />
            </label>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setShowUploadModal(true)}
                className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px] flex items-center"
              >
                <Upload color="white" className="w-4 h-4 mr-2" />
                Upload
              </button>
              <button
                onClick={() => setAddRecord(true)}
                className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
              >
                Add New Record
              </button>
              <button
                onClick={() => setCreateSchedule(true)}
                className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
              >
                Create a Schedule
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 mt-6">
          <p className="font-Outfit text-lg font-semibold">
            Performance Analytics
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performance.map((item, index) => (
              <div
                key={index}
                className="border border-[#EAEBF0] rounded-[10px] p-4"
              >
                <p className="font-Outfit font-medium text-[#272D37] text-base">
                  {item.name}
                </p>
                <div className="w-full flex flex-row justify-between mt-2 items-end">
                  <div className="w-[40%]">
                    <p className="font-Outfit text-[#272D37] text-xl font-semibold">
                      {item.percentage}
                    </p>
                    <p className="font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                      {item.stat}
                    </p>
                  </div>
                  <div className="w-[59%]">
                    <img src={item.img} className="w-full h-full" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 px-6">
          <p className="font-Outfit text-lg font-semibold mb-3">Students</p>
          <div className="border border-[#EAEBF0] rounded-[10px] overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["S/N", "Student Name", "Email", "Date Joined"].map(
                    (head) => (
                      <th
                        key={head}
                        className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>{renderStudentsTable()}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 px-6">
          <div className="flex justify-between items-center mb-3">
            <p className="font-Outfit text-lg font-semibold">Class Records</p>
            <button className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-4 rounded-[10px] flex items-center">
              <Download color="white" className="w-4 h-4 mr-2" />
              Export Records
            </button>
          </div>
          <div className="border border-[#EAEBF0] rounded-[10px] overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "S/N",
                    "Student Name",
                    "Subject",
                    "Assessment",
                    "Category",
                    "Score",
                    "Total Score",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderRecordsTable()}</tbody>
            </table>
            {grades.length > 0 && (
              <div className="w-full py-3 px-3 flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <p className="font-Outfit text-sm text-[#5F6D7E]">
                    Rows per page:
                  </p>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page
                    }}
                    className="p-1 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </span>
                <span className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 disabled:opacity-50"
                  >
                    <img src={backArr} alt="Previous" />
                    <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                      Prev
                    </p>
                  </button>
                  <p className="font-Outfit text-sm text-[#5F6D7E]">
                    Page {currentPage} of {totalPages}
                  </p>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1 disabled:opacity-50"
                  >
                    <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                      Next
                    </p>
                    <img src={fwdArr} alt="Next" />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherClassDetails;
