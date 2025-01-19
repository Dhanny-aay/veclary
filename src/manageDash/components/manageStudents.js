import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import vis from "./assets/vis.svg";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import { useContext, useEffect, useState } from "react";
import { handleGetSchoolStudents } from "../../controllers/schoolControllers/studentController";
import LoadingTable from "../../utils/loadingTable";
import AddStudent from "./studentSubComps/addStudent";
import EditStudent from "./studentSubComps/editStudent";
import DeleteStudent from "./studentSubComps/deleteStudent";

const ManageStudents = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noStudents, setNoStudents] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false);
  const [studentID, setStudentID] = useState("");

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  const fetchStudents = async () => {
    setLoading(true); // Start loading when fetching Students
    try {
      const data = await handleGetSchoolStudents();
      if (Array.isArray(data) && data.length === 0) {
        setNoStudents(true); // Set noStudents to true if no Students found
        setStudents([]); // Clear the Students array
      } else {
        setStudents(data); // Set the Students if data is available
        setNoStudents(false); // Reset noStudents if Students are found
      }
    } catch (error) {
      setNoStudents(true); // Set noStudents to true in case of error
    } finally {
      setLoading(false); // Stop loading when fetch is complete
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [trigger]);

  const handleDeleteIconClick = (studentID) => {
    setStudentID(studentID);
    setDeleteStudent(true);
  };

  const handleEditIconClick = (studentID) => {
    setStudentID(studentID);
    setEditStudent(true);
  };

  return (
    <>
      {editStudent && (
        <EditStudent
          triggerFetch={triggerFetch}
          setEditStudent={setEditStudent}
          studentID={studentID}
        />
      )}
      {addStudent && (
        <AddStudent setAddStudent={setAddStudent} triggerFetch={triggerFetch} />
      )}
      {deleteStudent && (
        <DeleteStudent
          studentID={studentID}
          triggerFetch={triggerFetch}
          setDeleteStudent={setDeleteStudent}
        />
      )}
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
            Students
          </p>
        </span>

        <div className=" w-full items-end flex flex-row px-6 mt-6 justify-between">
          <span className=" flex items-start space-x-6">
            <label
              htmlFor="Class Teacher"
              className=" font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Choose Class
              <select
                type="text"
                value={"Jss1"}
                className=" mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="Jss1">Jss1</option>
                <option value="Jss1">Jss1</option>
              </select>
            </label>
          </span>

          <span className=" flex items-start">
            <button
              onClick={() => {
                setAddStudent(true);
              }}
              className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add New Student
            </button>
          </span>
        </div>

        <div className=" mt-6 px-6">
          <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className=" w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Student Name
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Class
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date of Birth
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Academic Rating
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Attendance Rating
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Show loading spinner while fetching data
                    <tr>
                      <td colSpan="6">
                        <LoadingTable rows={6} columns={6} />
                      </td>
                    </tr>
                  ) : noStudents ? (
                    // Show "No Students found" message

                    <tr className=" w-full">
                      <td
                        colSpan="6"
                        className="px-4 py-3 text-center font-Outfit text-[#667085] text-sm w-full"
                      >
                        There are no Students yet.
                      </td>
                    </tr>
                  ) : (
                    students.map((data, index) => (
                      <tr key={index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          0{index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.name}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.className}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.dob}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.rate1}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.rate2}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center flex space-x-3">
                          <img
                            className=" w-3 cursor-pointer"
                            src={edit}
                            onClick={() => handleEditIconClick(data._id)}
                            alt=""
                          />
                          {/* <img className=" w-3" src={vis} alt="" /> */}
                          <img
                            className=" w-3 cursor-pointer"
                            onClick={() => handleDeleteIconClick(data._id)}
                            src={trash}
                            alt=""
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className=" w-full py-3 px-3 flex justify-between items-center">
              <span className=" flex space-x-1">
                <img src={backArr} alt="" />
                <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Prev
                </p>
              </span>
              <span className=" flex items-end space-x-4">
                <p className=" font-Outfit text-sm text-[#0530A1]">1</p>
                <p className=" font-Outfit text-sm">2</p>
                <p className=" font-Outfit text-sm">...</p>
                <p className=" font-Outfit text-sm">5</p>
                <p className=" font-Outfit text-sm">6</p>
              </span>
              <span className=" flex space-x-1">
                <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
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

export default ManageStudents;
