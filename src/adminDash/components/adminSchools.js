import { useContext, useState, useEffect } from "react";
import { SchoolService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import { AdminNavContext } from "../contexts/AdminNavContext";
import arrowBlue from "./assets/arrowblue.svg";
import Pagination from "./Pagination";
import nofeed from "./assets/nofeed.svg";
import AddSchool from "./schoolComps/addSchool";
import SnackbarUtils from "../../utils/snackbarUtils";

const AdminSchools = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { setSchoolId } = useContext(AdminNavContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        status: statusFilter === "all" ? "" : statusFilter,
        search: searchQuery,
      };
      const response = await SchoolService.getSchools(params);
      if (response && response.data) {
        setSchools(response.data);
        setPagination(response.pagination);
      } else {
        setSchools([]);
        setPagination({});
        setError("No schools found matching the criteria.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching schools.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSchools();
  }, [currentPage, statusFilter, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddNewSchool = async (newSchool) => {
    setIsSubmitting(true);
    try {
      if (!newSchool) throw new Error("New School data not found");

      const response = await SchoolService.registerSchool(newSchool);
      if (response.message) {
        SnackbarUtils.success("New School Registered Successfully!");
        fetchSchools(); // Refetch schools to show the new one
      }
    } catch (error) {
      SnackbarUtils.error(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
    }
  };

  const statusStyles = {
    PENDING: "text-[#E2341D] bg-[#FFF2F0]",
    APPROVED: "text-[#2D8A39] bg-[#F0FAF0]",
    COMPLETED: "text-[#2D8A39] bg-[#F0FAF0]",
    default: "text-gray-600 bg-gray-100",
  };

  const getStatusClass = (status) => {
    return statusStyles[status] || statusStyles.default;
  };

  return (
    <>
      <AddSchool
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddNewSchool}
        isSubmitting={isSubmitting}
      />
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
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">Schools</p>
        </span>

        <div className="w-full items-end flex flex-col md:flex-row mt-6 justify-between md:space-x-4 space-y-3 md:space-y-0">
          <span className="flex items-start space-x-6">
            <label
              htmlFor="status-filter"
              className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Filter by Status
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-2 text-[#272D37] text-sm w-[140px] md:w-[160px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="all">All</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </label>
            <input
              type="text"
              placeholder="Search by school name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-auto text-[#272D37] text-sm w-[180px] md:w-[250px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            />
          </span>

          <span className="flex items-start">
            <button
              onClick={handleOpenModal}
              className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add New School
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
                      School Names
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Registration Number
                    </th>
                    <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Email
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Status
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6">
                        <GenericLoadingSkeleton count={6} height={40} />
                      </td>
                    </tr>
                  ) : schools.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center">
                        <div className="flex flex-col items-center">
                          <img
                            src={nofeed}
                            alt="No schools"
                            className="w-24 h-24"
                          />
                          <p className="font-Outfit text-[#5F6D7E] mt-4">
                            No schools match the current filters.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    schools.map((data, index) => (
                      <tr key={data._id || index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.schoolName}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.schoolReg || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.schoolEmail || "N/A"}
                        </td>
                        <td
                          className={`font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-center`}
                        >
                          <p
                            className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px] w-fit mx-auto py-[2px] px-2 capitalize ${getStatusClass(
                              data.status
                            )}`}
                          >
                            {data.status.toLowerCase()}
                          </p>
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <button
                            onClick={() => {
                              setSchoolId(data._id);
                              handleClick("schoolProfile");
                            }}
                            className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]"
                          >
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
              currentPage={currentPage}
              itemsPerPage={pagination.limit}
              totalItems={pagination.totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSchools;
