import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
// import trash from "./assets/trash.svg";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import { useContext, useEffect, useState } from "react";
import { handleGetSchoolTeachers } from "../../controllers/schoolControllers/teachersController";
import LoadingTable from "../../utils/loadingTable";
import EditTeacher from "./teacherSubComps/editTeacher";
import AddTeacher from "./teacherSubComps/addTeacher";
// import DeleteTeacher from "./teacherSubComps/deleteTeacher";

const ManageTeachers = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);
  const [addTeach, setAddTeach] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [teacherID, setTeacherID] = useState("");
  // const [deleteTeach, setDeleteTeach] = useState(false);
  const [editTeach, setEditTeach] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(10);

  // Get current teachers for the page
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  // Calculate total pages
  const totalPages = Math.ceil(teachers.length / teachersPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const triggerFetch = () => {
    setTrigger(!trigger);
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const data = await handleGetSchoolTeachers();
      if (data) {
        setTeachers(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [trigger]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
      case "CURRENT":
        return "bg-[#17BD8D1A] text-[#17BD8D]";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "Ended":
        return "bg-[#FF4E3E1A] text-[#FF4E3E]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  // const handleDeleteIconClick = (teacherID) => {
  //   setTeacherID(teacherID);
  //   setDeleteTeach(true);
  // };

  const handleEditIconClick = (teacherID) => {
    setTeacherID(teacherID);
    setEditTeach(true);
  };

  return (
    <>
      {addTeach && (
        <AddTeacher setAddTeach={setAddTeach} triggerFetch={triggerFetch} />
      )}
      {/* {deleteTeach && (
        <DeleteTeacher
          teacherID={teacherID}
          setDeleteTeach={setDeleteTeach}
          triggerFetch={triggerFetch}
        />
      )} */}
      {editTeach && (
        <EditTeacher
          teacherID={teacherID}
          setEditTeach={setEditTeach}
          triggerFetch={triggerFetch}
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
            Teachers
          </p>
        </span>

        <div className=" w-full items-end flex flex-row px-6 mt-6 justify-between">
          <span className=" flex items-start space-x-6">
            <label
              htmlFor="Class Teacher"
              className=" font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Filter
              <select
                type="text"
                value={""}
                className=" mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="">Sort by...</option>
                <option value="Jss1">Class</option>
              </select>
            </label>
          </span>

          <span className=" flex items-start">
            <button
              onClick={() => {
                setAddTeach(true);
              }}
              className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add New Teacher
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
                      Student Names
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Subject Taught
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Address
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Status
                    </th>
                    {/* <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Class Taught
                    </th> */}
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6">
                        <LoadingTable rows={6} columns={6} />
                      </td>
                    </tr>
                  ) : teachers.length === 0 ? (
                    <tr className=" w-full">
                      <td
                        colSpan="6"
                        className="px-4 py-3 text-center font-Outfit text-[#667085] text-sm w-full"
                      >
                        There are no teachers yet.
                      </td>
                    </tr>
                  ) : (
                    currentTeachers.map((data, index) => (
                      <tr key={index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {indexOfFirstTeacher + index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.name}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.subject}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.address}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <button
                            className={`rounded-[20px] capitalize py-2 px-[10px] ${getStatusColor(
                              data.status
                            )}`}
                          >
                            {data.status}
                          </button>
                        </td>
                        {/* <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.class}
                        </td> */}
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center flex items-center justify-center">
                          <img
                            onClick={() => handleEditIconClick(data._id)}
                            className=" w-3 mt-2"
                            src={edit}
                            alt=""
                          />
                          {/* <img
                            onClick={() => handleDeleteIconClick(data._id)}
                            className=" w-3"
                            src={trash}
                            alt=""
                          /> */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className=" w-full py-3 px-3 flex justify-between items-center">
              <span
                className={`flex space-x-1 cursor-pointer ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => paginate(currentPage - 1)}
              >
                <img src={backArr} alt="" />
                <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Prev
                </p>
              </span>
              <span className=" flex items-end space-x-4">
                {[...Array(totalPages).keys()].map((number) => (
                  <p
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`font-Outfit text-sm cursor-pointer ${
                      currentPage === number + 1
                        ? "text-[#0530A1] font-bold"
                        : "text-[#5F6D7E]"
                    }`}
                  >
                    {number + 1}
                  </p>
                ))}
              </span>
              <span
                className={`flex space-x-1 cursor-pointer ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => paginate(currentPage + 1)}
              >
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

export default ManageTeachers;
