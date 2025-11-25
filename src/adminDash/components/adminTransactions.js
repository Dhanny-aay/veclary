import { useContext, useState, useEffect, useRef } from "react";
import { TransactionService } from "../../services/adminService";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import edit from "./assets/edit.svg";
import down from "./assets/download.svg";
import Pagination from "./Pagination";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import nofeed from "./assets/nofeed.svg";
import ViewTransaction from "./transactionComps/viewTransaction";
import SnackbarUtils from "../../utils/snackbarUtils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TransactionReceipt from "./transactionComps/transactionReceipt";

const AdminTransactions = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [amountSearch, setAmountSearch] = useState("");
  const [sort, setSort] = useState("all");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const receiptRef = useRef();

  const [transactions, setTransactions] = useState([]);
  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleSelectChange = (event) => {
    setSort(event.target.value);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", limit);
      if (sort !== "all") {
        params.append("sort", sort);
        if (sortDirection) {
          params.append("direction", sortDirection);
        }
      }
      if (amountSearch) {
        params.append("amount", amountSearch);
      }
      const response = await TransactionService.getTransactions(params);
      if (response && response.data) {
        setTransactions(response.data);
        setPagination(response.pagination);
      } else {
        setTransactions([]);
        setPagination({});
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, limit, sort, sortDirection, amountSearch]); // Refetch when the filter changes

  const columns = {
    transactions: [
      "S/N",
      "Description",
      "Amount",
      "Reference",
      "Type",
      "Method",
    ],
  };

  const typeStyles = {
    credit: "text-[#2D8A39] bg-[#F0FAF0]",
    debit: "text-[#E2341D] bg-[#FFF2F0]",
    default: "text-gray-600 bg-gray-100",
  };

  const getTypeClass = (type) => {
    const upperType = type?.toUpperCase();
    return typeStyles[upperType] || typeStyles.default;
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransactionId(null);
    setIsModalOpen(false);
  };

  const handleUpdateTransaction = async (transactionId, updatedData) => {
    setIsSubmitting(true);
    try {
      const response = await TransactionService.updateTransaction(
        transactionId,
        updatedData
      );
      if (response) {
        SnackbarUtils.success("Transaction updated successfully!");
        await fetchTransactions(); // Refetch all transactions to show updated data
      }
    } catch (error) {
      SnackbarUtils.error(error.message || "Failed to update transaction.");
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
    }
  };

  const handleDownloadReceipt = async (transaction) => {
    setReceiptData(transaction);

    // Allow time for the receipt component to render with the new data
    setTimeout(async () => {
      if (receiptRef.current) {
        const canvas = await html2canvas(receiptRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`receipt-${transaction.reference}.pdf`);
        setReceiptData(null); // Clean up
      }
    }, 100);
  };

  return (
    <>
      <ViewTransaction
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transactionId={selectedTransactionId}
        onSubmit={handleUpdateTransaction}
        isSubmitting={isSubmitting}
      />
      <div className="absolute -z-10 -left-[9999px]">
        {receiptData && (
          <TransactionReceipt ref={receiptRef} transaction={receiptData} />
        )}
      </div>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Transactions
          </p>
        </span>

        <div className="w-full items-end flex flex-col md:flex-row mt-6 justify-between md:space-x-4 space-y-3 md:space-y-0">
          <span className="flex items-start space-x-6">
            <label
              htmlFor="Class Teacher"
              className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Filter
              <select // The value should be the state it controls
                value={sort}
                onChange={handleSelectChange}
                className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="all">All Transactions</option>
                <option value="school_fees">Sort by School fee</option>
                <option value="books_sold">Sort by Books sold</option>
                <option value="subscription_fees">
                  Sort by Subscription fee
                </option>
              </select>
            </label>
            <input
              type="number"
              placeholder="Search by amount..."
              value={amountSearch}
              onChange={(e) => setAmountSearch(e.target.value)}
              className="mt-auto text-[#272D37] text-sm w-[180px] md:w-[250px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            />
            {/* <button
              onClick={() =>
                setSortDirection(sortDirection === "asc" ? "desc" : "asc")
              }
              className="mt-auto text-[#272D37] text-sm font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              {sortDirection === "asc" ? "Ascending" : "Descending"}
            </button> */}
          </span>
        </div>

        <div className="mt-6">
          <div className="border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    {columns.transactions.map((column, index) => (
                      <th
                        key={index}
                        className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"
                      >
                        {column}
                      </th>
                    ))}
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">
                        <GenericLoadingSkeleton count={limit} />
                      </td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.transactions.length + 1}
                        className="text-center py-10"
                      >
                        <img src={nofeed} alt="No data" className="mx-auto" />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Transactions Yet
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          Transactions will appear here when they are made.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((data, index) => (
                      <tr key={data._id || index}>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center max-w-[200px] truncate">
                          {data.description && data.description.length > 30
                            ? `${data.description.substring(0, 30)}...`
                            : data.description || "N/A"}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {data.amount || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.reference || "N/A"}
                        </td>
                        <td
                          className={`font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-center`}
                        >
                          <p
                            className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px] w-fit mx-auto py-[2px] px-2 capitalize ${getTypeClass(
                              data.type
                            )}`}
                          >
                            {data.type?.toLowerCase() || "N/A"}
                          </p>
                        </td>

                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
                          {data.method || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex space-x-3">
                          <img
                            className="w-3 mt-3 cursor-pointer"
                            src={down}
                            alt="Download"
                            onClick={() => handleDownloadReceipt(data)}
                          />
                          <img
                            className="w-3 mt-3 cursor-pointer"
                            src={edit}
                            alt="Edit"
                            onClick={() => handleOpenModal(data._id)}
                          />
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

export default AdminTransactions;
