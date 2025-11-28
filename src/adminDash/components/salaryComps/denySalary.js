import React, { useState } from "react";
import { X, MessageSquareWarning } from "lucide-react";
import SnackbarUtils from "../../../utils/snackbarUtils";

const DenySalaryModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  salaryId,
}) => {
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      SnackbarUtils.warning("Please provide a reason for denial.");
      return;
    }
    onSubmit(salaryId, { description });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-auto md:max-w-md">
        <div className="p-6 border-b flex justify-between items-center">
          <span className="flex items-center space-x-2">
            <MessageSquareWarning className="text-[#E84343]" />
            <h2 className="text-xl font-semibold text-[#272D37]">
              Deny Salary Payment
            </h2>
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700">
              Reason for Denial
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#E84343] focus:border-[#E84343] resize-none"
                placeholder="Provide a clear reason for rejecting this salary payment..."
              />
            </label>
          </div>

          <div className="p-6 border-t flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-[#E84343] text-white hover:bg-red-700 font-semibold disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Deny Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DenySalaryModal;
