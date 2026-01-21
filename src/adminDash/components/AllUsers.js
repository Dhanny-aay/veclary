import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import { UserService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import nofeed from "./assets/nofeed.svg";
import Pagination from "./Pagination";
import arrowBlue from "./assets/arrowblue.svg";

const AllUsers = () => {
  const { setSidebarVisible } = useContext(AdminSidebarContext);
  const { setActivePage } = useContext(AdminActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, limit, search };
      const response = await UserService.getUsers(params);
      if (response && response.data) {
        setUsers(response.data);
        setPagination({
          totalItems: response.totalItems,
          limit: response.limit,
          totalPages: response.totalPages,
          currentPage: response.page,
        });
      } else {
        setUsers([]);
        setPagination({});
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, search]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
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
        <p className="font-Outfit text-xl font-semibold mb-2 ml-3">All Users</p>
      </span>

      {/* Search Bar */}
      <div className="w-full flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm font-Outfit w-64 focus:outline-none focus:border-[#0530A1]"
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
                    Name
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Email
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Role
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Date Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">
                      <GenericLoadingSkeleton count={limit} />
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10">
                      <img src={nofeed} alt="No data" className="mx-auto" />
                      <p className="font-Outfit text-lg mt-4 font-semibold">
                        No Users Found
                      </p>
                    </td>
                  </tr>
                ) : (
                  users.map((data, index) => (
                    <tr key={data._id || index}>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                        {data.name || "N/A"}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.email || "N/A"}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
                        {data.role || "User"}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.createdAt
                          ? new Date(data.createdAt).toLocaleDateString()
                          : "N/A"}
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
  );
};

export default AllUsers;
