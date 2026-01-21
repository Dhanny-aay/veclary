import React, { useState, useEffect } from "react";
import { X, FileText } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import GenericLoadingSkeleton from "../../../../utils/loadingSkeleton";

const ViewEditBlog = ({
  isOpen,
  onClose,
  blog,
  onSubmit,
  isSubmitting,
  isLoading,
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setSubtitle(blog.subtitle || "");
      setContent(blog.content);
      setIsEditing(false); // Reset to view mode when blog changes
    }
  }, [blog]);

  if (!isOpen) {
    return null;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleClose = () => {
    onClose();
    setIsEditing(false); // Reset editing state on close
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
      <div className="bg-white rounded-lg shadow-lg w-[95%] md:w-[800px] max-h-[95vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center shrink-0">
          <span className="flex items-center space-x-2">
            <FileText className="text-[#0530A1]" />
            <h2 className="text-xl font-semibold text-[#272D37]">
              {isEditing ? "Edit Blog Post" : "View Blog Post"}
            </h2>
          </span>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {isLoading || !blog ? (
          <div className="p-6">
            <GenericLoadingSkeleton count={5} />
          </div>
        ) : (
          <>
            <div className="overflow-y-auto p-6 custom-scrollbar">
              <form onSubmit={handleSubmit} id="view-edit-blog-form">
                <div className="space-y-6">
                  {blog.image && blog.image.url && (
                    <img
                      src={blog.image.url}
                      alt={title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Blog Title
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                        required
                      />
                    ) : (
                      <p className="mt-1 p-3 bg-gray-100 rounded-md">{title}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subtitle
                    </label>
                    {isEditing ? (
                      <textarea
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        rows="2"
                        className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1] resize-y"
                      />
                    ) : (
                      <p className="mt-1 p-3 bg-gray-100 rounded-md">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    {isEditing ? (
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={quillModules}
                        className="h-64 mb-12"
                      />
                    ) : (
                      <div
                        className="mt-1 p-3 bg-gray-100 rounded-md max-h-96 overflow-y-auto prose"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t shrink-0 bg-gray-50 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleEditToggle}
                className="bg-gray-200 text-gray-700 font-Outfit text-sm font-medium py-2 px-4 rounded-[5px]"
              >
                {isEditing ? "Cancel" : "Edit Post"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  form="view-edit-blog-form"
                  disabled={isSubmitting}
                  className="bg-[#0530A1] text-white font-Outfit text-sm font-medium py-2 px-4 rounded-[5px] disabled:bg-opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewEditBlog;
