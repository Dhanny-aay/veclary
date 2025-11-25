import { useState, useEffect } from "react";
import { TransactionService } from "../../../services/adminService";
import SnackbarUtils from "../../../utils/snackbarUtils";
import close from "../assets/Button Close.svg";
import { FilePenLine } from "lucide-react";

const ViewTransaction = ({
  isOpen,
  onClose,
  transactionId,
  onSubmit,
  isSubmitting,
}) => {
  const [transaction, setTransaction] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    status: "",
    type: "",
    method: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && transactionId) {
      const fetchTransaction = async () => {
        setLoading(true);
        try {
          const response = await TransactionService.getTransactionById(
            transactionId
          );
          if (response) {
            setTransaction(response);
            setFormData({
              description: response.description || "",
              amount: response.amount || "",
              status: response.status || "",
              type: response.type || "",
              method: response.method || "",
            });
          }
        } catch (error) {
          SnackbarUtils.error(
            error.message || "Failed to fetch transaction details."
          );
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchTransaction();
    }
  }, [isOpen, transactionId, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(transactionId, formData);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
        <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-2xl max-w-2xl">
          <div className="p-6 border-b flex justify-between items-center">
            <span className="flex items-center space-x-2">
              <FilePenLine className="text-[#0530A1]" />
              <h2 className="text-xl font-semibold text-[#272D37]">
                Edit Transaction
              </h2>
            </span>
            <button onClick={onClose}>
              <img src={close} alt="Close" />
            </button>
          </div>
          {loading ? (
            <div className="p-6 text-center min-h-[300px] flex items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="p-6 max-h-[65vh] overflow-y-auto min-h-[300px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                    >
                      <option value="successful">Successful</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                    >
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    Method
                    <select
                      name="method"
                      value={formData.method}
                      onChange={handleChange}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                    >
                      <option value="transfer">Transfer</option>
                      <option value="voucher">Voucher</option>
                      <option value="card">Card</option>
                    </select>
                  </label>
                </div>
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
                  className="px-6 py-2.5 rounded-lg bg-[#0530A1] text-white hover:bg-[#041D6D] font-semibold disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewTransaction;
