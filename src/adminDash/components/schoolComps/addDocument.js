import React, { useState, useEffect } from "react";
import close from "../assets/Button Close.svg";
import icon from "../assets/Icon.svg";
import pload from "../assets/pload.svg";

const AddDocument = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDocuments([]);
      setPreviews([]);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);

    const filePreviews = files.map((file) => ({
      name: file.name,
      type: file.type,
    }));
    setPreviews(filePreviews);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (documents.length === 0) {
      // Or show a snackbar error
      alert("Please select at least one document to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    documents.forEach((doc) => {
      formData.append("documents", doc);
    });
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <span className="flex items-center space-x-2">
            <img src={icon} alt="Upload Document" />
            <h2 className="text-xl font-semibold text-[#272D37]">
              Upload Document
            </h2>
          </span>
          <button onClick={onClose}>
            <img src={close} alt="Close" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Document Title
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., CAC Documents"
                className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
              />
            </label>
            <div>
              <p className="font-Outfit text-[#272D37] font-medium text-sm">
                Upload Files
              </p>
              <label
                htmlFor="file-upload"
                className=" mt-2 w-full border-2 border-dashed border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6 cursor-pointer"
              >
                <img src={pload} alt="upload" />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                  PDF, PNG, JPG, etc. (max. 20MB each)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <div className="mt-2 text-sm text-gray-500">
                {previews.map((file) => (
                  <div key={file.name}>{file.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 border-t flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#0530A1] text-white hover:bg-[#041D6D] font-semibold disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocument;
