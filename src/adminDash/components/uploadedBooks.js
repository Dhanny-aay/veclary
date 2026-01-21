import { useContext, useState, useEffect, useCallback } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import right from "./assets/right.svg";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import x from "./assets/x.svg";
import x1 from "./assets/x (1).svg";
import x2 from "./assets/x (2).svg";
import pload from "./assets/pload.svg";
import uplo from "./assets/uplo.svg";
import cross from "./assets/cross.svg";
import { BookService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";
import Pagination from "./Pagination";
import nofeed from "./assets/nofeed.svg";
import ViewBookModal from "./booksComps/ViewBookModal";

const UploadedBooks = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [uploadBook, setUploadBook] = useState(false);
  const [viewBookModal, setViewBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    author: "",
    status: "",
  });

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        ...filters,
      };
      const response = await BookService.getBooks(params);
      if (response && response.data) {
        setBooks(response.data);
        setPagination(response.pagination || {});
      } else {
        setBooks([]);
        setPagination({});
      }
    } catch (err) {
      setError(err.message || "Failed to fetch books.");
      SnackbarUtils.error(err.message || "Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleViewDetails = async (id) => {
    setViewBookModal(true);
    setViewLoading(true);
    try {
      const response = await BookService.getBookById(id);
      if (response) {
        setSelectedBook(response);
      }
    } catch (err) {
      SnackbarUtils.error(err.message || "Failed to fetch book details.");
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
    PENDING: "text-[#E2341D] bg-[#FFF2F0]",
    APPROVED: "text-[#2D8A39] bg-[#F0FAF0]",
    COMPLETED: "text-[#2D8A39] bg-[#F0FAF0]",
    default: "text-gray-600 bg-gray-100",
  };

  const getStatusClass = (status) => {
    const upperStatus = status?.toUpperCase();
    return statusStyles[upperStatus] || statusStyles.default;
  };

  return (
    <>
      {uploadBook && (
        <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999]  fixed top-0 md:pb-[120px] -left-[20%] flex justify-center items-center">
          <div className="ml-[20%] h-[90%]  mt-[100px] bg-[#FFFFFF] p-6 rounded-[15px]  w-full md:w-[500px]">
            <div className=" w-full h-full bg-[#fff] overflow-auto rounded-[15px]">
              <span className=" w-full flex items-center justify-between">
                <img src={uplo} alt="" />
                <img
                  onClick={() => {
                    setUploadBook(false);
                  }}
                  src={cross}
                  className=" w-4"
                  alt=""
                />
              </span>
              <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
                Upload a Book
              </p>
              <div className=" w-full flex flex-row justify-between items-center">
                <label
                  htmlFor=""
                  className=" w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Title
                  <input
                    type="text"
                    name=""
                    placeholder="Enter title of Book"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>
                <label
                  htmlFor=""
                  className=" w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
                >
                  Book ISBN
                  <input
                    type="text"
                    name=""
                    placeholder="Enter book ISN"
                    className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                    id=""
                  />
                </label>
              </div>

              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Book Description
                <textarea
                  type="text"
                  name=""
                  placeholder="Enter book Description"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>

              <label
                htmlFor=""
                className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm"
              >
                Add book label
                <input
                  type="text"
                  name=""
                  placeholder="Search for Label"
                  className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                  id=""
                />
              </label>

              <span className=" flex flex-row items-center space-x-3 mt-6">
                <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#026AA2] bg-[#f0f9ff]">
                  <p className="">Sci-Fi</p>
                  <img src={x} alt="" />
                </button>
                <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#3538CD] bg-[#EEF4FF]">
                  <p className="">Novel</p>
                  <img src={x1} alt="" />
                </button>
                <button className=" py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1 text-[#C11574] bg-[#FDF2FA]">
                  <p className="">Read Alone</p>
                  <img src={x2} alt="" />
                </button>
              </span>

              <div className=" mt-6 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-3">
                <img src={pload} alt="" />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
              <button className=" w-full  mt-3 py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]">
                <p className=" font-Outfit text-sm text-white font-medium">
                  Upload
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      <ViewBookModal
        isOpen={viewBookModal}
        onClose={() => {
          setViewBookModal(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        loading={viewLoading}
        refetch={fetchBooks}
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
            Uploaded Books
          </p>
        </span>

        <div className="w-full items-end flex flex-row mt-6 justify-between">
          <span className="flex items-end space-x-6">
            <input
              type="text"
              name="name"
              placeholder="Search by book name..."
              value={filters.name}
              onChange={handleFilterChange}
              className="text-[#272D37] text-sm w-[180px] md:w-[250px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            />
            <label className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium">
              Status
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[160px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </span>

          <span className="flex items-start">
            <button
              onClick={() => {
                setUploadBook(true);
              }}
              className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Upload New Book
            </button>
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
                      Book Title
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Author
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
                  ) : books.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10">
                        <img
                          src={nofeed}
                          alt="No books found"
                          className="mx-auto"
                        />
                        <p className="font-Outfit text-lg mt-4 font-semibold">
                          No Books Found
                        </p>
                        <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                          Uploaded books will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    books.map((book, index) => (
                      <tr key={book._id}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {book.title || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
                          {(book.author && book.author.length > 0
                            ? book.author.join(", ")
                            : "N/A") || "N/A"}
                        </td>
                        <td className="font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-center">
                          <p
                            className={`font-medium text-[13px] rounded-[5px] w-fit mx-auto py-[2px] px-2 capitalize ${getStatusClass(
                              book.status
                            )}`}
                          >
                            {book.status?.toLowerCase() || "N/A"}
                          </p>
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          <button
                            onClick={() => handleViewDetails(book._id)}
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

export default UploadedBooks;
