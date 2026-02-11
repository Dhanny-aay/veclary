import { useState } from "react";
import pload from "./assets/pload.svg";

const FileUploader = ({ label, accept, maxSize, isImage, onFileSelect }) => {
  const [fileName, setFileName] = useState(null);
  const [fileSizeError, setFileSizeError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file size
    if (file.size > maxSize) {
      setFileSizeError(`File size exceeds ${maxSize / 1000000}MB`);
      return;
    } else {
      setFileSizeError(null);
    }

    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      // If it's an image, create a preview
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }

    // Call the parent callback to handle the file
    onFileSelect(file);
  };

  // Convert MIME types to file extensions for display
  const getFileExtensions = (accept) => {
    if (!accept) return "";
    return accept
      .split(",")
      .map((type) => {
        const trimmedType = type.trim();
        if (trimmedType.startsWith(".")) {
          return trimmedType.substring(1); // It's a file extension like .csv
        }
        if (trimmedType.includes("/")) {
          const extension = trimmedType.split("/")[1]; // It's a MIME type like text/csv
          if (extension && extension.includes("+")) {
            return extension.split("+")[0]; // Handle cases like "svg+xml"
          }
          return extension;
        }
        return trimmedType; // Fallback for other cases
      })
      .join(", .");
  };

  return (
    <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
      {label}
      <div className="mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-3">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full max-h-48"
          />
        ) : (
          <img src={pload} alt="Upload" />
        )}

        <p className="mt-3 text-sm font-normal font-Outfit text-[#667085]">
          <span className="font-semibold text-[#0530A1] mr-1">
            Click to upload
          </span>{" "}
          or drag and drop
        </p>

        <p className="mt-1 text-xs font-normal font-Outfit text-[#667085]">
          .{getFileExtensions(accept)} (max. {maxSize / 1000000}MB)
        </p>

        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {fileSizeError && (
        <p className="text-red-500 mt-2 text-sm">{fileSizeError}</p>
      )}
      {fileName && !fileSizeError && (
        <p className="mt-2 text-xs text-gray-500">Selected: {fileName}</p>
      )}
    </label>
  );
};

export default FileUploader;
