import React, { useState, useEffect } from "react";
import cross from "../assets/Button Close.svg";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { PublisherService } from "../../../services/adminService";
import SnackbarUtils from "../../../utils/snackbarUtils";
import nofeed from "../assets/nofeed.svg";

const ViewPublisherModal = ({
  isOpen,
  onClose,
  publisher,
  loading,
  refetch,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [publisherData, setPublisherData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (publisher) {
      setPublisherData(publisher);
    }
  }, [publisher]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublisherData({ ...publisherData, [name]: value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await PublisherService.updatePublisher(publisher._id, publisherData);
      SnackbarUtils.success("Publisher updated successfully");
      setIsEditMode(false);
      refetch(); // To refetch the list of publishers
      onClose(); // Close modal on successful update
    } catch (err) {
      SnackbarUtils.error(err.message || "Failed to update publisher.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999]  fixed top-0 md:pb-[120px] -left-[20%] flex justify-center items-center">
      <div className="ml-[20%] h-[90%]  mt-[100px] bg-[#FFFFFF] p-6 rounded-[15px]  w-full md:w-[500px] flex flex-col">
        <span className=" w-full flex items-center justify-between shrink-0 pb-4 border-b border-[#EAEBF0]">
          <p className=" text-lg text-[#272D37] font-semibold font-Outfit">
            {isEditMode ? "Edit Publisher" : "Publisher Details"}
          </p>
          <img
            onClick={() => {
              setIsEditMode(false);
              onClose();
            }}
            src={cross}
            className=" cursor-pointer"
            alt="Close"
          />
        </span>

        <div className="w-full flex-1 overflow-y-auto">
          {loading ? (
            <div className="mt-6">
              <GenericLoadingSkeleton count={5} />
            </div>
          ) : publisher ? (
            <div className="mt-6">
              {isEditMode ? (
                <div className="flex flex-col space-y-4">
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Publisher Name
                    <input
                      type="text"
                      name="name"
                      value={publisherData.userId?.name || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base capitalize border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={publisherData.userId?.email || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Phone Number
                    <input
                      type="text"
                      name="phone"
                      value={publisherData.phone || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    CAC Number
                    <input
                      type="text"
                      name="cacNumber"
                      value={publisherData.cacNumber || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Bank Name
                    <input
                      type="text"
                      name="bankName"
                      value={publisherData.bankName || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Account Name
                    <input
                      type="text"
                      name="accountName"
                      value={publisherData.accountName || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Account Number
                    <input
                      type="text"
                      name="accountNumber"
                      value={publisherData.accountNumber || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Address
                    <textarea
                      name="address"
                      value={publisherData.address || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-normal font-Outfit text-sm mt-1 border p-2 rounded-md"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Publisher Name
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base capitalize">
                      {publisher.userId?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Email
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {publisher.userId?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Phone Number
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {publisher.phone || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      CAC Number
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {publisher.cacNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Bank Name
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base capitalize">
                      {publisher.bankName || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Account Name
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base capitalize">
                      {publisher.accountName || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Account Number
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {publisher.accountNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Address
                    </span>
                    <span className="text-[#272D37] font-normal font-Outfit text-sm mt-1">
                      {publisher.address || "No address available."}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Date Joined
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {publisher.createdAt
                        ? new Date(publisher.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-10 text-center flex flex-col items-center justify-center h-[50%]">
              <img
                src={nofeed}
                alt="No details"
                className="w-[100px] h-[100px] mb-4"
              />
              <p className="font-Outfit text-[#272D37] font-semibold text-lg">
                Publisher Details Not Found
              </p>
              <p className="font-Outfit text-[#5F6D7E] text-sm mt-2">
                The details for this publisher could not be loaded.
              </p>
            </div>
          )}
        </div>

        {publisher && !loading && (
          <div className="flex justify-end space-x-4 mt-4 pt-4 border-t border-[#EAEBF0] shrink-0">
            {isEditMode ? (
              <>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="text-center text-sm font-Outfit font-medium text-gray-700 bg-gray-200 py-2 px-4 rounded-[10px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-4 rounded-[10px] disabled:bg-gray-400"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditMode(true)}
                className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-4 rounded-[10px]"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPublisherModal;
