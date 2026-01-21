import React, { useState, useEffect } from "react";
import cross from "./assets/Button Close.svg";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import nofeed from "../assets/nofeed.svg";
import { BookService } from "../../../services/adminService";
import SnackbarUtils from "../../../utils/snackbarUtils";

const ViewBookModal = ({ isOpen, onClose, book, loading, refetch }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [bookData, setBookData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (book) {
      setBookData({
        ...book,
        author: Array.isArray(book.author)
          ? book.author.join(", ")
          : book.author || "",
        labels: Array.isArray(book.labels)
          ? book.labels.join(", ")
          : book.labels || "",
        isbn: book.bookIsbn || book.isbn || "",
      });
    }
  }, [book]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const payload = { ...bookData };
      // Convert comma-separated strings back to arrays
      if (typeof payload.author === "string") {
        payload.author = payload.author
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s);
      }
      if (typeof payload.labels === "string") {
        payload.labels = payload.labels
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s);
      }
      // Map isbn back to bookIsbn if that's what the backend provided originally
      if (book.bookIsbn) {
        payload.bookIsbn = payload.isbn;
      }

      await BookService.updateBook(book._id, payload);
      SnackbarUtils.success("Book updated successfully");
      setIsEditMode(false);
      if (refetch) refetch();
      onClose();
    } catch (err) {
      SnackbarUtils.error(err.message || "Failed to update book.");
    } finally {
      setIsUpdating(false);
    }
  };

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
    <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999]  fixed top-0 md:pb-[120px] -left-[20%] flex justify-center items-center">
      <div className="ml-[20%] h-[90%]  mt-[100px] bg-[#FFFFFF] p-6 rounded-[15px]  w-full md:w-[500px]">
        <div className=" w-full h-full bg-[#fff] overflow-auto rounded-[15px]">
          <span className=" w-full flex items-center justify-between">
            <p className=" text-lg text-[#272D37] font-semibold font-Outfit">
              {isEditMode ? "Edit Book" : "Book Details"}
            </p>
            <img
              onClick={() => {
                setIsEditMode(false);
                onClose();
              }}
              src={cross}
              className="  cursor-pointer"
              alt="Close"
            />
          </span>

          {loading ? (
            <div className="mt-6">
              <GenericLoadingSkeleton count={6} />
            </div>
          ) : book ? (
            <div className="mt-6">
              {isEditMode ? (
                <div className="flex flex-col space-y-4">
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Title
                    <input
                      type="text"
                      name="title"
                      value={bookData.title || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base capitalize border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Author (comma separated)
                    <input
                      type="text"
                      name="author"
                      value={bookData.author || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base capitalize border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    ISBN
                    <input
                      type="text"
                      name="isbn"
                      value={bookData.isbn || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Status
                    <select
                      name="status"
                      value={bookData.status || ""}
                      onChange={handleInputChange}
                      className="font-medium text-sm w-full px-2 py-2 rounded-[5px] capitalize border mt-1"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Description
                    <textarea
                      name="description"
                      value={bookData.description || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-normal font-Outfit text-sm mt-1 border p-2 rounded-md"
                      rows={4}
                    />
                  </label>
                  <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                    Labels (comma separated)
                    <input
                      type="text"
                      name="labels"
                      value={bookData.labels || ""}
                      onChange={handleInputChange}
                      className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Title
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base capitalize">
                      {book.title || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Author
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base capitalize">
                      {book.author && book.author.length > 0
                        ? book.author.join(", ")
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      ISBN
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {book.bookIsbn || book.isbn || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Status
                    </span>
                    <span
                      className={`font-medium text-sm w-fit px-2 py-1 rounded-[5px] capitalize ${getStatusClass(
                        book.status
                      )}`}
                    >
                      {book.status?.toLowerCase() || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Description
                    </span>
                    <span className="text-[#272D37] font-normal font-Outfit text-sm mt-1">
                      {book.description || "No description available."}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Date Uploaded
                    </span>
                    <span className="text-[#272D37] font-medium font-Outfit text-base">
                      {book.createdAt
                        ? new Date(book.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-[#5F6D7E] font-Outfit">
                      Labels
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {book.labels && book.labels.length > 0 ? (
                        book.labels.map((label, idx) => (
                          <span
                            key={idx}
                            className="py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium bg-[#EEF4FF] text-[#3538CD]"
                          >
                            {label}
                          </span>
                        ))
                      ) : (
                        <span className="text-[#272D37] font-normal font-Outfit text-sm">
                          N/A
                        </span>
                      )}
                    </div>
                  </div>

                  {book.fileUrl && (
                    <div className="mt-2">
                      <a
                        href={book.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0530A1] font-Outfit text-sm font-medium underline"
                      >
                        View Book File
                      </a>
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-end space-x-4 mt-6">
                {isEditMode ? (
                  <>
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="text-center text-sm font-Outfit font-medium text-gray-700 bg-gray-200 py-2 px-4 rounded-[10px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-4 rounded-[10px] disabled:bg-gray-400"
                    >
                      {isUpdating ? "Updating..." : "Update"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-4 rounded-[10px]"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-10 text-center flex flex-col items-center justify-center h-[50%]">
              <img
                src={nofeed}
                alt="No details"
                className="w-[100px] h-[100px] mb-4"
              />
              <p className="font-Outfit text-[#272D37] font-semibold text-lg">
                Book Details Not Found
              </p>
              <p className="font-Outfit text-[#5F6D7E] text-sm mt-2">
                The details for this book could not be loaded.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookModal;
