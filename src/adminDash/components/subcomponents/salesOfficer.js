import { useContext, useState } from "react";
import chart from "./assets/chart.svg";
import chart1 from "./assets/chart1.svg";
import chart2 from "./assets/chart2.svg";
import pload from "./assets/pload.svg";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import { useAuth } from "../../contexts/AuthContext";
import SnackbarUtils from "../../../utils/snackbarUtils";
import AdminDashMiniHeader from "../AdminDashMiniHeader";
import AnnouncementSection from "../AnnouncementSection";
import { AnnouncementService } from "../../../services/adminService";

const SalesOfficer = () => {
  // const [makeAnnouncement, setMakeAnnouncement] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolId: "",
    document: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmitAnnouncement = (announcement) => {
    // submit announcement logic
    SnackbarUtils.success("Announcement Submitted");
  };

  const [dragActive, setDragActive] = useState(false);

  const { activePage, setActivePage } = useContext(AdminActivePageContext);

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

  const performance = [
    {
      name: "E-Book Completion",
      percentage: "90%",
      stat: "Weekly Stats",
      img: chart,
    },
    {
      name: "Total Book Sold",
      percentage: "70",
      stat: "All Stats",
      img: chart1,
    },
    {
      name: "Total Book Sold",
      percentage: "70%",
      stat: "Weekly Growth",
      img: chart2,
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

      <div className="mt-6">
        <p className="font-Outfit text-lg font-semibold">Analysis</p>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {performance.map((item, index) => (
            <div
              key={index}
              className="border border-[#EAEBF0] rounded-[10px] p-4"
            >
              <p className="font-Outfit font-medium text-[#272D37] text-base">
                {item.name}
              </p>
              <div className="w-full flex flex-row justify-between mt-2 items-end">
                <div className="w-[40%]">
                  <p className="font-Outfit text-[#272D37] text-xl font-semibold">
                    {item.percentage}
                  </p>
                  <p className="font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                    {item.stat}
                  </p>
                </div>
                <div className="w-[59%]">
                  <img src={item.img} className="w-[100%] h-full" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
        <AnnouncementSection submitAnnouncement={handleSubmitAnnouncement} />

        <div className="w-full lg:w-[64%] border border-[#EAEBF0] rounded-[10px] p-4">
          <div className="w-full flex flex-row items-center justify-between">
            <p className="font-Outfit text-xl font-semibold text-black">
              Onboarding Document
            </p>
            <button
              onClick={() => handleClick("onboardedCustomers")}
              className="px-3 py-2 text-center text-sm font-Outfit text-white font-normal bg-[#0530A1] rounded-[7px]"
            >
              View all
            </button>
          </div>
          <div className="w-full mt-6">
            <div className="flex flex-row justify-between items-center">
              <label
                htmlFor="schoolName"
                className="w-[49%] flex flex-col text-[#272d37] font-Outfit text-sm font-medium"
              >
                School Name
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-full h-[40px] p-2.5 border border-[#DAE0E6] rounded-[5px] mt-2"
                />
              </label>
              <label
                htmlFor="schoolId"
                className="w-[49%] flex flex-col text-[#272d37] font-Outfit text-sm font-medium"
              >
                School Id
                <input
                  type="text"
                  name="schoolId"
                  value={formData.schoolId}
                  onChange={handleInputChange}
                  className="w-full h-[40px] p-2.5 border border-[#DAE0E6] rounded-[5px] mt-2"
                />
              </label>
            </div>

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
            <button
              onClick={handleUpload}
              className="w-full mt-6 py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
            >
              <p className="font-Outfit text-sm text-white font-medium">
                Upload
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesOfficer;
