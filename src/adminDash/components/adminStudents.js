import { useContext, useEffect, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import { SchoolService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import nofeed from "./assets/nofeed.svg";
import Pagination from "./Pagination";

const AdminStudents = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    try {
      const response = await SchoolService.getStudents({ page, limit: 10 });
      setStudents(response.data || []);
      setPagination(response.pagination || { page, limit: 10, total: 0 });
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const statusStyles = {
    pending: " bg-[#FFFBEB] text-[#F59E0B]",
    approved: " bg-green-100 text-green-600",
    rejected: " bg-red-100 text-red-600",
    verified: " bg-blue-100 text-blue-600",
  };

  const getStatusClass = (status) => {
    return statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handlePageChange = (page) => {
    fetchStudents(page);
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Students
          </p>
        </span>

        <div className="w-full items-start space-y-3 md:space-y-0 md:items-end flex flex-col md:flex-row mt-6 justify-between">
          <span className="flex items-start space-x-6">
            <label
              htmlFor="Class Teacher"
              className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Choose School
              <select className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
                <option value=""></option>
              </select>
            </label>
            <label
              htmlFor="Class Teacher"
              className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Choose Class
              <select className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
                <option value="">Class</option>
              </select>
            </label>
          </span>

          <span className="flex items-start">
            <button
              //   onClick={() => {
              //     setUploadBook(true);
              //   }}
              className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add New Student
            </button>
          </span>
        </div>

        <div className=" mt-6">
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
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      School
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Class
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Status
                    </th>

                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date Joined
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="p-4">
                        <GenericLoadingSkeleton count={5} />
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-10">
                        <img
                          src={nofeed}
                          alt="No students found"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Students Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          Students list will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    students.map((data, index) => (
                      <tr key={index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.userId?.name || data.name || "N/A"}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.schoolName ||
                            data.schoolId?.schoolName ||
                            "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.className || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                              data.status
                            )}`}
                          >
                            {data.status || "N/A"}
                          </span>
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.createdAt
                            ? new Date(data.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <button className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={pagination.page || 1}
              itemsPerPage={pagination.limit || 10}
              totalItems={pagination.total || 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminStudents;
