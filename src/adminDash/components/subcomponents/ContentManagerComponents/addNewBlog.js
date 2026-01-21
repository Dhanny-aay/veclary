import React, { useState, useEffect } from "react";
import { X, FileText } from "lucide-react";
import FileUploader from "../../../../utils/fileUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddNewBlog = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const initialState = {
    title: "",
    subtitle: "",
    content: "",
    status: "published",
    coverImage: null,
    image: null,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleFileSelect = (name, file) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogData = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        blogData.append(key, formData[key]);
      }
    }
    onSubmit(blogData);
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
              Create New Blog Post
            </h2>
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
          <form
            onSubmit={handleSubmit}
            id="add-blog-form"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block text-sm font-medium text-gray-700">
                Blog Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter a catchy title"
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Status
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1] bg-white capitalize"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
            </div>

            <label className="block text-sm font-medium text-gray-700">
              Subtitle
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Enter a brief subtitle or summary"
                rows="2"
                className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1] resize-y"
              ></textarea>
            </label>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Content</p>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                className="h-64 mb-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploader
                label="Cover Image (Recommended: 1200x630)"
                accept="image/png, image/jpeg, image/webp"
                maxSize={5000000} // 5MB
                isImage={true}
                onFileSelect={(file) => handleFileSelect("coverImage", file)}
              />
              <FileUploader
                label="Content Image (Optional)"
                accept="image/png, image/jpeg, image/webp"
                maxSize={5000000} // 5MB
                isImage={true}
                onFileSelect={(file) => handleFileSelect("image", file)}
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t shrink-0 bg-gray-50">
          <button
            type="submit"
            form="add-blog-form"
            className="w-full py-3 rounded-lg bg-[#0530A1] text-white hover:bg-[#042882] font-semibold disabled:bg-gray-400 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting Blog..." : "Post Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewBlog;
