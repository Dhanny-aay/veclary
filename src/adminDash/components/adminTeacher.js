import { useContext, useEffect, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import { SchoolService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import nofeed from "./assets/nofeed.svg";
import Pagination from "./Pagination";

const AdminTeacher = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchTeachers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await SchoolService.getTeachers({ page, limit: 10 });
      setTeachers(response.data || []);
      setPagination(response.pagination || { page, limit: 10, total: 0 });
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handlePageChange = (page) => {
    fetchTeachers(page);
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
            Teachers
          </p>
        </span>

        <div className="w-full items-end flex flex-row mt-6 justify-between">
          <label
            htmlFor="Class Teacher"
            className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
          >
            Filter
            <select className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
              <option value="">Sort by School</option>
            </select>
          </label>

          <span className="flex items-start">
            <button
              //   onClick={() => {
              //     setUploadBook(true);
              //   }}
              className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add New Teacher
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
                      Teachers Name
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Address
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date of Employment
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Subject Taught
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      School
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="p-4">
                        <GenericLoadingSkeleton count={5} />
                      </td>
                    </tr>
                  ) : teachers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-10">
                        <img
                          src={nofeed}
                          alt="No teachers found"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Teachers Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          Teachers list will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    teachers.map((data, index) => (
                      <tr key={index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.name}
                        </td>

                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.address || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.createdAt
                            ? new Date(data.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.subject || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.schoolId?.schoolName || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex space-x-3">
                          <img
                            className="w-3 mt-3 cursor-pointer"
                            src={edit}
                            alt="Edit"
                          />
                          <img
                            className="w-3 mt-3 cursor-pointer"
                            src={trash}
                            alt="Trash"
                          />
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

export default AdminTeacher;
