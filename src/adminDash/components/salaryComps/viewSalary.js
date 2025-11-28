import React from "react";
import { X, FileText } from "lucide-react";

const ViewSalaryDetails = ({ isOpen, onClose, salary }) => {
  if (!isOpen || !salary) return null;

  const formatNaira = (amount) => {
    return `₦${
      amount?.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || "0.00"
    }`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const DetailItem = ({ label, value }) => (
    <div className="py-2">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-800 capitalize">{value || "N/A"}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-auto md:max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <span className="flex items-center space-x-2">
            <FileText className="text-[#0530A1]" />
            <h2 className="text-xl font-semibold text-[#272D37]">
              Salary Details
            </h2>
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <DetailItem label="Position" value={salary.adminId?.position} />
            <DetailItem label="Department" value={salary.adminId?.department} />
            <DetailItem label="Amount" value={formatNaira(salary.amount)} />
            <DetailItem label="VAT" value={formatNaira(salary.vat)} />
            <DetailItem label="Status" value={salary.status} />
            <DetailItem
              label="Created At"
              value={formatDate(salary.createdAt)}
            />
            <DetailItem
              label="Last Updated"
              value={formatDate(salary.updatedAt)}
            />
          </div>
          <div className="mt-4">
            <DetailItem label="Description" value={salary.description} />
          </div>
        </div>

        <div className="p-6 border-t flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSalaryDetails;
