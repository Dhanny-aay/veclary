import React, { useState, useEffect, useCallback } from "react";
import edit from "../../assets/edit.svg";
import Pagination from "../../Pagination";
import ListNewJob from "./listNewJob";
import { JobService } from "../../../../services/adminService";
import SnackbarUtils from "../../../../utils/snackbarUtils";
import GenericLoadingSkeleton from "../../../../utils/loadingSkeleton";
import nofeed from "../../assets/nofeed.svg";
import EditJob from "./editJob";

const Career = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await JobService.getJobs();
      if (response) {
        setJobs(response);
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const columns = [
    "S/N",
    "Job Title",
    "Salary Range",
    "Status",
    "State/Country",
    "",
  ];

  const statusStyles = {
    active: "text-[#2D8A39] bg-[#F0FAF0]",
    inactive: "text-gray-600 bg-gray-100",
    default: "text-gray-600 bg-gray-100",
  };

  const getStatusClass = (status) => {
    return statusStyles[status?.toLowerCase()] || statusStyles.default;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (jobId) => {
    setSelectedJobId(jobId);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleSubmitNewJob = async (newJob) => {
    setIsSubmitting(true);
    try {
      const response = await JobService.createJob(newJob);
      if (response) {
        SnackbarUtils.success("Job listed successfully!");
        fetchJobs();
      }
    } catch (error) {
      SnackbarUtils.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to list new job."
      );
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
    }
  };

  const handleUpdateJob = async (jobId, jobData) => {
    setIsSubmitting(true);
    try {
      const response = await JobService.updateJob(jobId, jobData);
      if (response) {
        SnackbarUtils.success("Job updated successfully!");
        fetchJobs();
      }
    } catch (error) {
      SnackbarUtils.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update job."
      );
    } finally {
      setIsSubmitting(false);
      handleCloseEditModal();
    }
  };

  return (
    <>
      <ListNewJob
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNewJob}
        isSubmitting={isSubmitting}
      />
      <EditJob
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateJob}
        jobId={selectedJobId}
        isSubmitting={isSubmitting}
      />
      <div className="w-full">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleOpenModal}
            className="bg-[#0530A1] text-white font-Outfit text-sm font-medium py-3 px-6 rounded-[5px]"
          >
            Add New Job listing
          </button>
        </div>

        <div className="border border-[#EAEBF0] px-3 rounded-[10px] bg-white">
          <div className="w-full overflow-x-auto">
            <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-4 px-4 ${
                        index === 0 ? "text-center" : "text-left"
                      }`}
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
                      <GenericLoadingSkeleton count={10} />
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-10">
                      <img
                        src={nofeed}
                        alt="No jobs found"
                        className="mx-auto"
                      />
                      <p className="font-Outfit text-lg mt-4 font-semibold">
                        No Job Listings Yet
                      </p>
                      <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                        New job listings will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  jobs.map((data, index) => (
                    <tr key={data._id}>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center px-4">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-left px-4 capitalize">
                        {data.role}
                      </td>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-left px-4">
                        ₦{parseInt(data.salary).toLocaleString()}
                      </td>
                      <td className="font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-left px-4">
                        <p
                          className={`font-medium text-[13px] rounded-[5px] w-fit py-[2px] px-2 capitalize ${getStatusClass(
                            data.status
                          )}`}
                        >
                          {data.status || "N/A"}
                        </p>
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-left px-4">
                        {data.city}, {data.country}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-right px-4">
                        <div className="flex items-center justify-end space-x-4">
                          <img
                            className="w-4 cursor-pointer"
                            src={edit}
                            alt="Edit"
                            onClick={() => handleOpenEditModal(data._id)}
                          />
                        </div>
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
            totalItems={jobs.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Career;
