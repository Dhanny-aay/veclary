import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import Pagination from "./Pagination";
import { JobService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import nofeed from "./assets/nofeed.svg";
import SnackbarUtils from "../../utils/snackbarUtils";
import ReviewApplication from "./jobappsComps/reviewApplication";

const JobApps = () => {
  const { setSidebarVisible } = useContext(AdminSidebarContext);
  const { setActivePage } = useContext(AdminActivePageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const itemsPerPage = 10;

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await JobService.getJobApplications();
      if (response) {
        setApplications(response);
      } else {
        setApplications([]);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch job applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const statusStyles = {
    pending: " bg-[#FFFBEB] text-[#F59E0B]",
    approved: " bg-green-100 text-green-600",
    rejected: " bg-red-100 text-red-600",
    verified: " bg-blue-100 text-blue-600",
  };

  const getStatusClass = (status) => {
    return statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
  };

  const columns = ["S/N", "Name", "Job", "Status", ""];

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenReviewModal = (id) => {
    setSelectedApplicationId(id);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedApplicationId(null);
  };

  const handleUpdateApplication = async (id, data) => {
    try {
      await JobService.updateJobApplication(id, data);
      SnackbarUtils.success("Application status updated successfully!");
      fetchApplications();
    } catch (error) {
      SnackbarUtils.error("Failed to update application status.");
    } finally {
      handleCloseReviewModal();
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      await JobService.deleteJobApplication(id);
      SnackbarUtils.success("Application deleted successfully!");
      fetchApplications();
    } catch (error) {
      SnackbarUtils.error("Failed to delete application.");
    } finally {
      handleCloseReviewModal();
    }
  };

  return (
    <>
      <ReviewApplication
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        applicationId={selectedApplicationId}
        onUpdate={handleUpdateApplication}
        onDelete={handleDeleteApplication}
      />
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span className=" flex flex-row items-center">
          <img
            className="cursor-pointer "
            onClick={() => handleClick("Home")}
            src={arrowBlue}
            alt="Back Arrow"
          />
          <p
            onClick={() => handleClick("Home")}
            className="cursor-pointer font-Outfit text-[#0530A1] text-sm font-medium"
          >
            Back
          </p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Job Applications
          </p>
        </span>

        <div className="mt-6">
          <div className="flex items-center mb-6">
            <span className="text-[#272D37] text-sm font-medium font-Outfit mr-2">
              Filter By
            </span>
            <select className="border border-[#DAE0E6] rounded-[5px] text-[#272D37] text-sm font-Outfit p-2.5 bg-white focus:outline-none">
              <option value="job_type">Job type</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="border border-[#EAEBF0] px-3 rounded-[10px] bg-white">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-4 text-left px-4 first:text-center"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={columns.length}>
                        <GenericLoadingSkeleton count={itemsPerPage} />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center py-10 text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center py-10"
                      >
                        <img
                          src={nofeed}
                          alt="No applications found"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Job Applications Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          New applications will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    applications.map((data, index) => (
                      <tr key={data._id}>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center px-4">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-semibold text-sm text-left px-4 capitalize">
                          {`${data.firstName || ""} ${
                            data.lastName || ""
                          }`.trim() || "N/A"}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-left px-4 capitalize">
                          {data.specialization || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-left px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                              data.status
                            )}`}
                          >
                            {data.status || "N/A"}
                          </span>
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-right px-4">
                          <button
                            onClick={() => handleOpenReviewModal(data._id)}
                            className="bg-[#0530A1] text-white text-xs font-medium py-2 px-4 rounded-[5px]"
                          >
                            Review
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
              itemsPerPage={itemsPerPage}
              totalItems={applications.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApps;
