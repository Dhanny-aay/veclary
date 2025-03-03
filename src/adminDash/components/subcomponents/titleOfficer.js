import pie from "./assets/pie.svg";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import pload from "./assets/pload.svg";
import right from "./assets/right.svg";
import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import x from "./assets/x.svg";
import x1 from "./assets/x (1).svg";
import x2 from "./assets/x (2).svg";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashMiniHeader from "../AdminDashMiniHeader";
import SnackbarUtils from "../../../utils/snackbarUtils";

const TitleOfficer = () => {
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bookTitle: "",
    bookIsbn: "",
    bookDescription: "",
    bookLabel: "",
    pubAndAuthorName: "",
    document: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const [dragActive, setDragActive] = useState(false);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, document: e.target.files[0] });
      setUploadProgress(0);

      // Simulate file loading progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20; // Increase progress gradually
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 300);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, document: e.dataTransfer.files[0] });
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, document: null });
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!formData.schoolName || !formData.schoolId || !formData.document) {
      SnackbarUtils.error("Please fill in all fields and upload a document.");
      return;
    }

    setLoading(true);

    const uploadEndpoint = "https://veclary-backend-endpoint.com/api/upload"; // Replace later with API endpoint from adminServices
    const form = new FormData();
    form.append("schoolName", formData.schoolName);
    form.append("schoolId", formData.schoolId);
    form.append("document", formData.document);

    try {
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to upload document");
      }
      setUploadProgress(100);

      SnackbarUtils.success("Upload successful!");
    } catch (error) {
      SnackbarUtils.error(`Upload failed: ${error.message}`);
    }
  };

  const analysis = [
    {
      name: "Active Students",
      percentage: "3000",
      stat: "Weekly Stats",
      img: pie,
    },
    {
      name: "Active Teachers",
      percentage: "200",
      stat: "Weekly Stats",
      img: pie,
    },
    {
      name: "Active School mgmt",
      percentage: "88%",
      stat: "Weekly Stats",
      img: pie,
    },
  ];

  return (
    <>
      <AdminDashMiniHeader
        name={user?.name}
        bodyText={
          "Take the first steps to Get a clear view of customer interactions."
        }
      />

      <div className=" mt-6">
        <p className=" font-Outfit text-lg font-semibold">Analysis</p>
        <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.map((item, index) => (
            <div
              key={index}
              className=" border border-[#EAEBF0] rounded-[10px] p-4"
            >
              <div className=" w-full flex flex-row justify-between mt-2 items-start">
                <div className=" w-[48%]">
                  <p className=" font-Outfit md:h-[48px] font-medium text-[#272D37] text-base">
                    {item.name}
                  </p>
                  <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                    {item.percentage}
                  </p>
                  <p className=" font-Outfit text-[#5F6D7E] text-sm mt-2 font-medium">
                    {item.stat}
                  </p>
                </div>
                <div className=" w-[48%] h-full flex items-start space-x-6">
                  <img src={item.img} className=" h-full w-[40%]" alt="" />
                  <div className=" ">
                    <span className=" flex flex-row items-center space-x-1">
                      <button className=" w-2 h-2 rounded-[50%] bg-[#0530A1]"></button>
                      <p className=" font-Outfit text-sm text-[#667085]">
                        Active
                      </p>
                    </span>
                    <span className=" flex flex-row items-center space-x-1">
                      <button className=" w-2 h-2 rounded-[50%] bg-[#E5EAFF]"></button>
                      <p className=" font-Outfit text-sm text-[#667085]">
                        UnActive
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-6 p-6 border border-[#EAEBF0] rounded-[15px]">
        <p className=" font-Outfit text-xl text-black font-semibold">
          Book Upload
        </p>
        <div className=" w-full mt-6 flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-start">
          <div className=" w-full md:w-[64%] flex flex-col">
            <div className=" flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
              <label
                htmlFor="bookTitle"
                className=" w-full md:w-[49%] flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
              >
                Book Title
                <input
                  type="text"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleInputChange}
                  className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
                />
              </label>
              <label
                htmlFor="bookIsbn"
                className=" w-full md:w-[49%] flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
              >
                Book ISBN
                <input
                  type="text"
                  name="bookIsbn"
                  value={formData.bookIsbn}
                  onChange={handleInputChange}
                  className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
                />
              </label>
            </div>
            <label
              htmlFor="bookDescription"
              className=" w-full mt-3 flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
            >
              Book Description
              <input
                type="text"
                name="bookDescription"
                value={formData.bookDescription}
                onChange={handleInputChange}
                className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
              />
            </label>
            <label
              htmlFor="bookLabel"
              className=" w-full mt-3 flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
            >
              Add book label
              <input
                type="text"
                name="bookLabel"
                value={formData.bookLabel}
                onChange={handleInputChange}
                className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
              />
            </label>

            <span className=" flex flex-row items-center space-x-3 mt-3">
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
          </div>
          <div className=" w-full md:w-[34%] flex flex-col">
            <label
              htmlFor=""
              className=" w-full flex flex-col text-[#272D37] font-medium font-Outfit text-sm"
            >
              Publisher/author’s name
              <input
                type="text"
                className=" w-full p-2.5 h-[40px] rounded-[5px] border border-[#DAE0E6] mt-2"
              />
            </label>

            {/* Upload section */}
            <div className="mt-6">
              {formData.document ? (
                <div className=" bg-gray-50">
                  {uploadProgress < 100 ? (
                    <div className="w-full bg-gray-200 rounded-full mt-3">
                      <div
                        className="bg-[#0530A1] rounded-[10px] text-xs font-medium text-white text-center p-0.5 leading-none"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 border border-[#DAE0E6] rounded-[5px] bg-gray-50">
                      <span className="text-sm font-Outfit">
                        {formData.document.name}
                      </span>
                      <button
                        onClick={handleRemoveFile}
                        className="text-red-500 font-bold text-sm"
                      >
                        X
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-3 ${
                    dragActive ? "bg-gray-100" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf,.epub,.mobi"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <img src={pload} alt="Upload" />
                    <p className="mt-3 text-sm font-normal font-Outfit text-[#667085]">
                      <span className="font-semibold text-[#0530A1] mr-1">
                        Click to upload
                      </span>
                      or drag and drop
                    </p>
                    <p className="mt-1 text-xs font-normal font-Outfit text-[#667085]">
                      PDF, EPUB, or MOBI. (max. 200mb)
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleUpload}
          className=" w-full  mt-6  py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
        >
          <p className=" font-Outfit text-sm text-white font-medium">Upload</p>
        </button>
      </div>
    </>
  );
};

export default TitleOfficer;
