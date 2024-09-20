import uplo from "./assets/uplo.svg";
import cross from "./assets/cross.svg";
import { useState } from "react";
import { useSnackbar } from "notistack";
import FileUploader from "../../utils/fileUploader";
import LabelSelector from "../../utils/labelSelector";

const AddBook = ({ setUploadBook }) => {
  const [schedule, setSchedule] = useState(false);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [labels, setLabels] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const [bookCover, setBookCover] = useState(null);
  const [bookFile, setBookFile] = useState(null);

  const handleBookCoverSelect = (file) => {
    setBookCover(file);
  };

  const handleBookFileSelect = (file) => {
    setBookFile(file);
  };

  // Validation function
  const validateFields = () => {
    const newErrors = {};

    if (title.trim() === "") newErrors.title = "Book's title is required";
    if (isbn.trim() === "") newErrors.isbn = "Book's ISBN is required";
    if (description.trim() === "")
      newErrors.description = "Book's description is required";
    if (!bookCover) newErrors.bookCover = "Book cover is required";
    if (!bookFile) newErrors.bookFile = "Book file is required";
    if (bookPrice.trim() === "" || isNaN(bookPrice))
      newErrors.bookPrice = "Valid book price is required";
    if (labels.length === 0)
      newErrors.labels = "At least one label is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      // Submit form logic here
      enqueueSnackbar("Book successfully uploaded!", { variant: "success" });
    } else {
      enqueueSnackbar("Please fix the errors in the form", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] h-[500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[500px]">
          <div className="w-full h-full bg-[#fff] overflow-auto rounded-[15px]">
            <span className="w-full flex items-center justify-between">
              <img src={uplo} alt="Upload" />
              <img
                onClick={() => setUploadBook(false)}
                src={cross}
                className="w-4 cursor-pointer"
                alt="Close"
              />
            </span>
            <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Upload a Book
            </p>

            {/* Title and ISBN Inputs */}
            <div className="w-full flex flex-row justify-between items-center">
              <label className="w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title of Book"
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.title}
                  </span>
                )}
              </label>
              <label className="w-[48%] flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                Book ISBN
                <input
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="Enter book ISBN"
                  className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                />
                {errors.isbn && (
                  <span className="text-red-500 text-xs mt-1 font-Outfit">
                    {errors.isbn}
                  </span>
                )}
              </label>
            </div>

            {/* Description */}
            <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
              Book Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter book Description"
                className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.description}
                </span>
              )}
            </label>

            {/* Label Selector */}
            <LabelSelector labels={labels} setLabels={setLabels} />
            {errors.labels && (
              <span className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.labels}
              </span>
            )}

            {/* Book Price */}
            <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
              Book Price
              <input
                type="text"
                value={bookPrice}
                onChange={(e) => setBookPrice(e.target.value)}
                placeholder="Enter Book Price"
                className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
              />
              {errors.bookPrice && (
                <span className="text-red-500 text-xs mt-1 font-Outfit">
                  {errors.bookPrice}
                </span>
              )}
            </label>

            {/* File Uploaders */}
            <FileUploader
              label="Book Cover"
              accept="image/png, image/jpeg"
              maxSize={2000000} // 2MB
              isImage={true}
              onFileSelect={handleBookCoverSelect}
            />
            {errors.bookCover && (
              <span className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.bookCover}
              </span>
            )}

            <FileUploader
              label="Book File"
              accept="application/pdf, application/epub+zip, application/x-mobipocket-ebook"
              maxSize={200000000} // 200MB
              isImage={false}
              onFileSelect={handleBookFileSelect}
            />
            {errors.bookFile && (
              <span className="text-red-500 text-xs mt-1 font-Outfit">
                {errors.bookFile}
              </span>
            )}

            {/* Schedule & Publish Buttons */}
            <div className="w-full mt-6 grid grid-cols-2 gap-4">
              {schedule ? (
                <>
                  <button
                    onClick={() => setUploadBook(false)}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setSchedule(true)}
                    className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
                  >
                    Schedule Publish
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold text-base"
                  >
                    Publish Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
