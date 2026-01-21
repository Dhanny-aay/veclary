import React, { useState, useEffect } from "react";
import cross from "../assets/Button Close.svg";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { FinancialService } from "../../../services/adminService";
import SnackbarUtils from "../../../utils/snackbarUtils";

const ViewPaymentModal = ({ isOpen, onClose, payment, loading, refetch }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (payment) {
      setPaymentData(payment);
    }
  }, [payment]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      // Using updatePaymentPlan as the update method for individual payment records based on service definition
      await FinancialService.updatePaymentPlan(payment._id, paymentData);
      SnackbarUtils.success("Payment updated successfully");
      setIsEditMode(false);
      refetch();
      onClose();
    } catch (err) {
      SnackbarUtils.error(err.message || "Failed to update payment.");
    } finally {
      setIsUpdating(false);
    }
  };

  const statusStyles = {
    SUCCESS: "text-[#2D8A39] bg-[#F0FAF0]",
    COMPLETED: "text-[#2D8A39] bg-[#F0FAF0]",
    PENDING: "text-[#E2341D] bg-[#FFF2F0]",
    FAILED: "text-[#E2341D] bg-[#FFF2F0]",
    default: "text-gray-600 bg-gray-100",
  };

  const getStatusClass = (status) => {
    const upperStatus = status?.toUpperCase();
    return statusStyles[upperStatus] || statusStyles.default;
  };

  return (
    <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999]  fixed top-0 md:pb-[120px] -left-[20%] flex justify-center items-center">
      <div className="ml-[20%] h-[90%]  mt-[100px] bg-[#FFFFFF] p-6 rounded-[15px]  w-full md:w-[500px]">
        <div className=" w-full h-full bg-[#fff] overflow-auto rounded-[15px]">
          <span className=" w-full flex items-center justify-between">
            <p className=" text-lg text-[#272D37] font-semibold font-Outfit">
              {isEditMode ? "Edit Payment" : "Payment Details"}
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

          {loading ? (
            <div className="mt-6">
              <GenericLoadingSkeleton count={5} />
            </div>
          ) : payment ? (
            <div className="mt-6">
              {isEditMode ? (
                <div className="flex flex-col space-y-4">
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Status
                    <select
                      name="status"
                      value={paymentData.status || ""}
                      onChange={handleInputChange}
                      className="font-medium text-sm w-full px-2 py-2 rounded-[5px] capitalize border mt-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="success">Success</option>
                      <option value="failed">Failed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </label>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Reference
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {payment.reference || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Amount
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      ₦{payment.amount || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Payment ID
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {payment.paymentId || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Date
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Status
                    </span>
                    <span
                      className={`font-medium text-sm w-fit px-2 py-1 rounded-[5px] capitalize ${getStatusClass(
                        payment.status
                      )}`}
                    >
                      {payment.status?.toLowerCase() || "N/A"}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-4 mt-6">
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
            </div>
          ) : (
            <div className="mt-10 text-center">
              <p className="font-Outfit text-[#5F6D7E]">
                Payment details not found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPaymentModal;
