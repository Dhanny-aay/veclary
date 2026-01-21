import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import { PublisherService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";
import Pagination from "./Pagination";
import nofeed from "./assets/nofeed.svg";
import ViewPublisherModal from "./publisherComps/ViewPublisherModal";

const Publishers = () => {
  const { setSidebarVisible } = useContext(AdminSidebarContext);
  const { setActivePage } = useContext(AdminActivePageContext);
  const [viewPublisherModal, setViewPublisherModal] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
  });

  const fetchPublishers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        ...filters,
      };
      const response = await PublisherService.getPublishers(params);
      if (response && response.data) {
        setPublishers(response.data);
        setPagination(response.pagination || {});
      } else {
        setPublishers([]);
        setPagination({});
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch publishers.";
      setError(errorMessage);
      SnackbarUtils.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchPublishers();
  }, [fetchPublishers]);

  const handleViewDetails = async (id) => {
    setViewPublisherModal(true);
    setViewLoading(true);
    try {
      const response = await PublisherService.getPublisherById(id);
      if (response && response) {
        setSelectedPublisher(response);
      }
    } catch (err) {
      SnackbarUtils.error(err.message || "Failed to fetch publisher details.");
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

  return (
    <>
      <ViewPublisherModal
        isOpen={viewPublisherModal}
        onClose={() => {
          setViewPublisherModal(false);
          setSelectedPublisher(null);
        }}
        publisher={selectedPublisher}
        loading={viewLoading}
        refetch={fetchPublishers}
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
            Publishers
          </p>
        </span>

        <div className="w-full items-end flex flex-row mt-6 justify-between">
          <span className="flex items-end space-x-6">
            <input
              type="text"
              name="name"
              placeholder="Search by publisher name..."
              value={filters.name}
              onChange={handleFilterChange}
              className="text-[#272D37] text-sm w-[180px] md:w-[250px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            />
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
                      Publisher Name
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Email
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Phone Number
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5">
                        <GenericLoadingSkeleton count={5} />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : publishers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10">
                        <img
                          src={nofeed}
                          alt="No publishers found"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Publishers Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          Publishers will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    publishers.map((publisher, index) => (
                      <tr key={publisher._id}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {publisher.userId?.name || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {publisher.userId?.email || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-center">
                          {publisher.phone || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <button
                            onClick={() => handleViewDetails(publisher._id)}
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

export default Publishers;
