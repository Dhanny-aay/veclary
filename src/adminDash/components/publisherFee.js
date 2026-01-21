import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import Pagination from "./Pagination";
import { EarningService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";
import nofeed from "./assets/nofeed.svg";
import ViewEarningModal from "./publisherFeeComps/ViewEarningModal";

const PublisherFee = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [modalData, setModalData] = useState(null);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const fetchEarnings = useCallback(async () => {
    setLoading(true);
    try {
      // const params = {
      //   page: currentPage,
      //   limit: 10,
      //   status: statusFilter,
      // };
      const response = await EarningService.getVendorEarnings();
      if (Array.isArray(response)) {
        setEarnings(response);
        setPagination({});
      } else if (response && response.data) {
        setEarnings(response.data);
        setPagination(response.pagination || {});
      } else {
        setEarnings([]);
        setPagination({});
      }
    } catch (err) {
      setError(err.message || "Failed to fetch earnings.");
      SnackbarUtils.error(err.message || "Failed to fetch earnings.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReviewClick = (data) => setModalData(data);

  const closeModal = () => setModalData(null);

  return (
    <>
      <ViewEarningModal
        isOpen={!!modalData}
        onClose={closeModal}
        earning={modalData}
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
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Publisher/Author's earnings
          </p>
        </span>

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
                      User Name
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Book Title
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Transaction ID
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Amount
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date
                    </th>

                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">
                        <GenericLoadingSkeleton count={5} />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-10 text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : earnings.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-10">
                        <img
                          src={nofeed}
                          alt="No earnings found"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Earnings Found
                        </p>
                      </td>
                    </tr>
                  ) : (
                    earnings.map((data, index) => (
                      <tr key={data._id || index}>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {data.userId?.name || "N/A"}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {data.bookId?.title || "N/A"}
                        </td>

                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data._id}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          ₦{data.price}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </td>

                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex ">
                          <button
                            onClick={() => handleReviewClick(data)}
                            className=" py-2 px-3 rounded-[10px] bg-[#0530A1] text-[#FFFFFF] font-Outfit font-medium text-xs"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              itemsPerPage={pagination.limit || 100}
              totalItems={pagination.totalItems || earnings.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PublisherFee;
