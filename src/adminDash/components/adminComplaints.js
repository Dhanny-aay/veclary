import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import { ComplaintsService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";
import Pagination from "./Pagination";
import nofeed from "./assets/nofeed.svg";

const AdminComplaints = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: 10 };
      const response = await ComplaintsService.getAllComplaints(params);
      if (response && response.data) {
        setComplaints(response.data);
        setPagination(response.pagination || {});
      } else {
        setComplaints([]);
        setPagination({});
      }
    } catch (err) {
      setError(err.message || "Failed to fetch complaints.");
      SnackbarUtils.error(err.message || "Failed to fetch complaints.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleMarkResolved = async (id) => {
    try {
      await ComplaintsService.updateComplaint(id, { status: "RESOLVED" });
      SnackbarUtils.success("Complaint marked as resolved");
      fetchComplaints();
    } catch (err) {
      SnackbarUtils.error(err.message || "Failed to update complaint");
    }
  };

  return (
    <>
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
            Complaints
          </p>
        </span>

        <div className=" mt-6">
          <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className=" w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-left px-4">
                      Subject
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
                      <td colSpan="4">
                        <GenericLoadingSkeleton count={5} />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-10 text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : complaints.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-10">
                        <img
                          src={nofeed}
                          alt="No complaints"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Complaints Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          Complaints from users will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    complaints.map((data, index) => (
                      <tr key={data._id || index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t text-left border-[#EAEBF0] text-[#272D37] font-medium text-sm capitalize">
                          {data.title || data.subject || "N/A"}
                        </td>
                        <td className=" font-Outfit py-4 border-t text-center border-[#EAEBF0] text-[#272D37] font-medium text-sm capitalize">
                          {data.status?.toLowerCase() || "Pending"}
                        </td>

                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex ">
                          <button
                            onClick={() => handleMarkResolved(data._id)}
                            className=" py-2 px-3 bg-[#2F52FF] rounded-[10px] text-white text-xs font-medium"
                          >
                            Mark as Resolved
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

export default AdminComplaints;
