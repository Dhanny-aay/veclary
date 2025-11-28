import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import { SalaryService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import nofeed from "./assets/nofeed.svg";
import arrowBlue from "./assets/arrowblue.svg";
import Pagination from "./Pagination";
import SnackbarUtils from "../../utils/snackbarUtils";
import ViewSalaryDetails from "./salaryComps/viewSalary";
import DenySalaryModal from "./salaryComps/denySalary";

const Salary = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSalaries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // const params = {
      //   page: currentPage,
      //   limit,
      //   status: statusFilter,
      //   amount: amountFilter,
      //   month: monthFilter,
      // };
      const response = await SalaryService.getSalaries(/*params*/);
      if (response) {
        setSalaries(response);
        // setPagination(response.pagination || {});
      } else {
        setSalaries([]);
        // setPagination({});
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching salaries.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, statusFilter, amountFilter, monthFilter]); // Keep dependencies for now

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  const statusStyles = {
    APPROVED: "text-[#2D8A39] bg-[#F0FAF0]",
    PENDING: "text-[#E2341D] bg-[#FFF2F0]",
    DENIED: "text-gray-600 bg-gray-100",
    DENEID: "text-gray-600 bg-gray-100", // Handling potential typo from API
    default: "text-gray-600 bg-gray-100", // Default style for other statuses
  };

  const getStatusClass = (status) => {
    return statusStyles[status?.toUpperCase()] || statusStyles.default;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (salary) => {
    setSelectedSalary(salary);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSalary(null);
  };

  const handleOpenDenyModal = (salary) => {
    setSelectedSalary(salary);
    setIsDenyModalOpen(true);
  };

  const handleCloseDenyModal = () => {
    setIsDenyModalOpen(false);
    setSelectedSalary(null);
  };

  const handleDenySubmit = async (salaryId, data) => {
    setIsSubmitting(true);
    try {
      await SalaryService.rejectSalaryPayment(salaryId, data);
      SnackbarUtils.success("Salary payment has been denied.");
      fetchSalaries(); // Refresh the list
    } catch (error) {
      SnackbarUtils.error(
        error.response?.data?.message || "Failed to deny salary payment."
      );
    } finally {
      setIsSubmitting(false);
      handleCloseDenyModal();
    }
  };

  return (
    <>
      <ViewSalaryDetails
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        salary={selectedSalary}
      />
      <DenySalaryModal
        isOpen={isDenyModalOpen}
        onClose={handleCloseDenyModal}
        onSubmit={handleDenySubmit}
        isSubmitting={isSubmitting}
        salaryId={selectedSalary?._id}
      />
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
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">Salary</p>
        </span>

        <div className="w-full flex flex-col md:flex-row items-start md:items-end md:space-x-4 space-y-3 md:space-y-0 mt-6">
          <label className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium">
            Filter by Status
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-2 text-[#272D37] text-sm w-[150px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="SUCCESSFUL">Successful</option>
            </select>
          </label>
          <label className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium">
            Filter by Month
            <input
              type="month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="mt-2 text-[#272D37] text-sm w-[180px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            />
          </label>
          <input
            type="number"
            placeholder="Search by amount..."
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
            className="mt-auto text-[#272D37] text-sm w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
          />
        </div>

        <div className="mt-6">
          <div className="border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Transaction ID
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Amount
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Status
                    </th>

                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6">
                        <GenericLoadingSkeleton count={limit} />
                      </td>
                    </tr>
                  ) : salaries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10">
                        <img src={nofeed} alt="No data" className="mx-auto" />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Salaries Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          Salary data will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    salaries.map((data, index) => (
                      <tr key={data._id || index}>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data._id || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          ₦
                          {data.amount?.toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || "0.00"}
                        </td>
                        <td className="font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-center">
                          <p
                            className={`font-medium text-[13px] rounded-[5px] w-fit mx-auto py-[2px] px-2 capitalize ${getStatusClass(
                              data.status
                            )}`}
                          >
                            {data.status
                              ? data.status.charAt(0).toUpperCase() +
                                data.status.slice(1).toLowerCase()
                              : "N/A"}
                          </p>
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex space-x-3">
                          <button className="py-2 px-3 rounded-[10px] bg-[#01813F] text-[#FFFFFF] font-Outfit font-medium text-xs">
                            Approve
                          </button>
                          <button
                            onClick={() => handleOpenDenyModal(data)}
                            className="py-2 px-3 rounded-[10px] bg-[#E84343] text-[#FFFFFF] font-Outfit font-medium text-xs"
                          >
                            Deny
                          </button>
                          <button
                            onClick={() => handleViewDetails(data)}
                            className="py-2 px-3 rounded-[10px] bg-[#0530A1] text-[#FFFFFF] font-Outfit font-medium text-xs"
                          >
                            View
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
              itemsPerPage={pagination.limit || limit}
              totalItems={pagination.totalItems || 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Salary;
//                         >
//                           {data.status}
//                         </p>
//                       </td>

//                       <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex space-x-3">
//                         <button className=" py-2 px-3 rounded-[10px] bg-[#01813F] text-[#FFFFFF] font-Outfit font-medium text-xs">
//                           Approve
//                         </button>
//                         <button className=" py-2 px-3 rounded-[10px] bg-[#E84343] text-[#FFFFFF] font-Outfit font-medium text-xs">
//                           Deny
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="w-full py-3 px-3 flex justify-between items-center">
//               <span className="flex space-x-1">
//                 <img src={backArr} alt="Previous" />
//                 <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
//                   Prev
//                 </p>
//               </span>
//               <span className="flex items-end space-x-4">
//                 <p className="font-Outfit text-sm text-[#0530A1]">1</p>
//                 <p className="font-Outfit text-sm">2</p>
//                 <p className="font-Outfit text-sm">...</p>
//                 <p className="font-Outfit text-sm">5</p>
//                 <p className="font-Outfit text-sm">6</p>
//               </span>
//               <span className="flex space-x-1">
//                 <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
//                   Next
//                 </p>
//                 <img src={fwdArr} alt="Next" />
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Salary;
