import React, { useState, useEffect, useCallback } from "react";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";
import Pagination from "../../Pagination";
import { ContentService } from "../../../../services/adminService";
import SnackbarUtils from "../../../../utils/snackbarUtils";
import GenericLoadingSkeleton from "../../../../utils/loadingSkeleton";
import nofeed from "../../assets/nofeed.svg";
import AddNewBlog from "./addNewBlog";
import ViewEditBlog from "./viewEditBlog";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetchingBlog, setIsFetchingBlog] = useState(false);

  const itemsPerPage = 9;

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ContentService.getBlogs();
      if (response) {
        setBlogs(response);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch blogs.");
      //   SnackbarUtils.error(err.message || "Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const columns = ["S/N", "Blog Title", "Date Posted", "Time Posted", ""];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { dateStyle: "long" });
  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString("en-US", { timeStyle: "short" });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenViewModal = async (blog) => {
    setIsViewModalOpen(true);
    setIsFetchingBlog(true);
    try {
      const fullBlog = await ContentService.getBlogById(blog._id);
      setSelectedBlog(fullBlog);
    } catch (error) {
      SnackbarUtils.error("Failed to fetch blog details.");
      handleCloseViewModal();
    } finally {
      setIsFetchingBlog(false);
    }
  };

  const handleCloseViewModal = () => {
    setSelectedBlog(null);
    setIsViewModalOpen(false);
  };

  const handleSubmitNewBlog = async (blogData) => {
    setIsSubmitting(true);
    try {
      const response = await ContentService.createBlog(blogData);
      if (response) {
        SnackbarUtils.success("Blog posted successfully!");
        fetchBlogs();
      }
    } catch (error) {
      //   SnackbarUtils.error(
      //     error.response?.data?.message || error.message || "Failed to post blog."
      //   );
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
    }
  };

  const handleUpdateBlog = async (blogData) => {
    if (!selectedBlog) return;
    setIsUpdating(true);
    try {
      const response = await ContentService.updateBlog(
        selectedBlog._id,
        blogData
      );
      if (response) {
        SnackbarUtils.success("Blog updated successfully!");
        fetchBlogs();
      }
    } catch (error) {
      //   SnackbarUtils.error(
      //     error.response?.data?.message || error.message || "Failed to update blog."
      //   );
    } finally {
      setIsUpdating(false);
      handleCloseViewModal();
    }
  };

  return (
    <>
      <AddNewBlog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNewBlog}
        isSubmitting={isSubmitting}
      />
      <ViewEditBlog
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        blog={selectedBlog}
        onSubmit={handleUpdateBlog}
        isSubmitting={isUpdating}
        isLoading={isFetchingBlog}
      />
      <div className="flex justify-end mb-6 mt-6">
        <button
          onClick={handleOpenModal}
          className="bg-[#0530A1] text-white font-Outfit text-sm font-medium py-3 px-6 rounded-[5px]"
        >
          Add New Blog
        </button>
      </div>

      <div className="border border-[#EAEBF0] px-3 rounded-[10px] bg-white">
        <div className="w-full overflow-x-auto">
          <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-4 text-left px-4"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length}>
                    <GenericLoadingSkeleton count={itemsPerPage} />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-10 text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-10">
                    <img
                      src={nofeed}
                      alt="No blogs found"
                      className="mx-auto"
                    />
                    <p className="font-Outfit text-lg mt-4 font-semibold">
                      No Blogs Found
                    </p>
                    <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                      New blogs will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                blogs.map((data, index) => (
                  <tr key={data._id}>
                    <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-left px-4">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-left px-4">
                      {data.title}
                    </td>
                    <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-left px-4">
                      {formatDate(data.createdAt)}
                    </td>
                    <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-left px-4">
                      {formatTime(data.createdAt)}
                    </td>
                    <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-right px-4">
                      <div className="flex items-center justify-end space-x-4">
                        <img
                          onClick={() => handleOpenViewModal(data)}
                          className="w-4 cursor-pointer"
                          src={edit}
                          alt="Edit"
                        />
                        {/* <img
                          className="w-4 cursor-pointer"
                          src={trash}
                          alt="Delete"
                        /> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={blogs.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Blog;
