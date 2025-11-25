import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import { UserService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import nofeed from "./assets/nofeed.svg";
import Pagination from "./Pagination";
// import AddPersonnel from "./addPersonnel";
import SnackbarUtils from "../../utils/snackbarUtils";

import Icon from "./assets/Icon.svg";
import arrowBlue from "./assets/arrowblue.svg";
import AddHRPersonnel from "./hrComps/addPersonnel";
import { UserPlus } from "lucide-react";

const HRTeam = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const [personnels, setPersonnels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [isAddPersonnelModalOpen, setAddPersonnelModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPersonnels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, limit };
      const response = await UserService.getHRPersonnels(params);
      if (response && response.data) {
        setPersonnels(response.data);
        setPagination({
          totalItems: response.totalItems,
          limit: response.limit,
          totalPages: response.totalPages,
          currentPage: response.page,
        });
      } else {
        setPersonnels([]);
        setPagination({});
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching personnel.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  const handleAddPersonnel = async (personnelData) => {
    setIsSubmitting(true);
    try {
      const response = await UserService.addHRPersonnel(personnelData);
      if (response) {
        SnackbarUtils.success("Personnel added successfully!");
        setAddPersonnelModalOpen(false);
        fetchPersonnels(); // Refresh the list
      }
    } catch (error) {
      SnackbarUtils.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add personnel."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPersonnels();
  }, [fetchPersonnels]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <AddHRPersonnel
        isOpen={isAddPersonnelModalOpen}
        onClose={() => setAddPersonnelModalOpen(false)}
        onSubmit={handleAddPersonnel}
        isSubmitting={isSubmitting}
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
            Human Resources
          </p>
        </span>
        <div className="w-full flex justify-end">
          <button
            onClick={() => setAddPersonnelModalOpen(true)}
            className="flex items-center space-x-2 bg-[#0530A1] text-white font-Outfit text-sm font-medium py-2 px-4 rounded-md"
          >
            <UserPlus className="stroke-white w-4 h-4" />
            <span className="text-white">Add Personnel</span>
          </button>
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
                      Name
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Department / Position
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Email
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Date of Employment
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
                  ) : personnels.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10">
                        <img src={nofeed} alt="No data" className="mx-auto" />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Personnel Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          HR personnel will appear here once they are added.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    personnels.map((data, index) => (
                      <tr key={data._id || index}>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {data.userId?.name || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <p className="font-medium text-[#272D37] capitalize">
                            {data.department || "N/A"}
                          </p>
                          <p className="text-xs text-[#5F6D7E]">
                            {data.position || "N/A"}
                          </p>
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.userId?.email || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex space-x-3 whitespace-nowrap">
                          <button className="py-2 px-3 rounded-[10px] bg-[#FFC317] text-[#FFFFFF] font-Outfit font-medium text-xs">
                            Suspend
                          </button>
                          <button className="py-2 px-3 rounded-[10px] bg-[#E23D5A] text-[#FFFFFF] font-Outfit font-medium text-xs">
                            Fire
                          </button>
                          <button className="py-2 px-3 rounded-[10px] bg-[#0530A1] text-[#FFFFFF] font-Outfit font-medium text-xs">
                            View Profile
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

export default HRTeam;
