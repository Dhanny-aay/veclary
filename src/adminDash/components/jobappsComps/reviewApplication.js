import React, { useState, useEffect } from "react";
import { JobService } from "../../../services/adminService";
import SnackbarUtils from "../../../utils/snackbarUtils";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { X, Trash2, Download, Linkedin, Briefcase } from "lucide-react";

const ReviewApplication = ({
  isOpen,
  onClose,
  applicationId,
  onUpdate,
  onDelete,
}) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (isOpen && applicationId) {
      const fetchApplication = async () => {
        setLoading(true);
        try {
          const response = await JobService.getJobApplicationById(
            applicationId
          );
          // The API returns an array with a single object
          const appData = Array.isArray(response) ? response[0] : response;
          if (appData) {
            setApplication(appData);
            setNewStatus(appData.status || "");
          }
        } catch (error) {
          SnackbarUtils.error("Failed to fetch application details.");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchApplication();
    }
  }, [isOpen, applicationId, onClose]);

  const handleUpdate = () => {
    onUpdate(applicationId, { status: newStatus });
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this application?")) {
      onDelete(applicationId);
    }
  };

  if (!isOpen) return null;

  const DetailItem = ({ label, value, isLink = false, href = "#" }) => (
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      {isLink ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline break-words"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-800 break-words capitalize">
          {value || "N/A"}
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[700px] max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center shrink-0">
          <span className="flex items-center space-x-2">
            <Briefcase className="text-[#0530A1]" />
            <h2 className="text-xl font-semibold text-[#272D37]">
              Review Application
            </h2>
          </span>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
          {loading || !application ? (
            <GenericLoadingSkeleton count={10} />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <DetailItem
                  label="Full Name"
                  value={`${application.firstName} ${application.lastName}`}
                />
                <DetailItem label="Email Address" value={application.email} />
                <DetailItem label="Phone Number" value={application.phone} />
                <DetailItem
                  label="Specialization"
                  value={application.specialization}
                />
                <DetailItem
                  label="Highest Education"
                  value={application.highestEduction}
                />
                <DetailItem
                  label="Year of Completion"
                  value={application.yearOfCompletion}
                />
                <DetailItem
                  label="Location"
                  value={`${application.state}, ${application.country}`}
                />
                <DetailItem
                  label="Preferred Job Location"
                  value={application.preferredjobLocation}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-center space-x-2">
                  <Linkedin size={18} className="text-gray-600" />
                  <DetailItem
                    label="LinkedIn Profile"
                    value={application.linkedIn}
                    isLink
                    href={application.linkedIn}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Download size={18} className="text-gray-600" />
                  <DetailItem
                    label="Resume"
                    value="Download Resume"
                    isLink
                    href={application.resume?.url}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Update Status Footer */}
        <div className="p-6 border-t shrink-0 bg-gray-50 rounded-b-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-auto">
              <label
                htmlFor="status-update"
                className="text-sm font-medium text-gray-700 sr-only"
              >
                Update Status
              </label>
              <select
                id="status-update"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1] bg-white capitalize"
              >
                <option value="PENDING">Pending</option>
                <option value="VERIFIED">Verified</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <button
                onClick={handleUpdate}
                className="w-full px-8 py-2.5 rounded-lg bg-[#0530A1] text-white hover:bg-[#042882] font-semibold transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewApplication;
