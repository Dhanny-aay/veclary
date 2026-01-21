import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import { FinancialService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";
import Pagination from "./Pagination";
import nofeed from "./assets/nofeed.svg";
import ViewPaymentModal from "./paymentComps/viewPaymentModal";

const Payments = () => {
  const { setSidebarVisible } = useContext(AdminSidebarContext);
  const { setActivePage } = useContext(AdminActivePageContext);
  const [viewPaymentModal, setViewPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
  });

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        ...filters,
      };
      const response = await FinancialService.getPayments(params);
      if (Array.isArray(response)) {
        setPayments(response);
        setPagination({});
      } else if (response && response.data) {
        setPayments(response.data);
        setPagination(response.pagination || {});
      } else {
        setPayments([]);
        setPagination({});
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch payments.";
      setError(errorMessage);
      SnackbarUtils.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleViewDetails = async (id) => {
    setViewPaymentModal(true);
    setViewLoading(true);
    try {
      const response = await FinancialService.getPaymentById(id);
      if (response && response) {
        setSelectedPayment(response);
      }
    } catch (err) {
      SnackbarUtils.error(err.message || "Failed to fetch payment details.");
    } finally {
      setViewLoading(false);
    }
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

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
    <>
      <ViewPaymentModal
        isOpen={viewPaymentModal}
        onClose={() => {
          setViewPaymentModal(false);
          setSelectedPayment(null);
        }}
        payment={selectedPayment}
        loading={viewLoading}
        refetch={fetchPayments}
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
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Payments
          </p>
        </span>

        <div className="w-full items-end flex flex-row mt-6 justify-between">
          <span className="flex items-end space-x-6">
            <label className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium">
              Status
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[160px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="">All</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </label>
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
                      Reference
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Amount
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date
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
                        <GenericLoadingSkeleton count={5} />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : payments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10">
                        <img
                          src={nofeed}
                          alt="No payments found"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Payments Found
                        </p>
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment, index) => (
                      <tr key={payment._id}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {payment.reference || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          ₦{payment.amount || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {payment.createdAt
                            ? new Date(payment.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-center">
                          <p
                            className={`font-medium text-[13px] rounded-[5px] w-fit mx-auto py-[2px] px-2 capitalize ${getStatusClass(
                              payment.status
                            )}`}
                          >
                            {payment.status?.toLowerCase() || "N/A"}
                          </p>
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <button
                            onClick={() => handleViewDetails(payment._id)}
                            className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]"
                          >
                            View Details
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
              itemsPerPage={pagination.limit || 10}
              totalItems={pagination.totalItems || 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
