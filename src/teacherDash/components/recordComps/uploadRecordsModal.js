import { useState, useEffect } from "react";
import close from "../assets/clos.svg";
import newwww from "../assets/newww.svg";
import FileUploader from "../../../utils/fileUploader";
import {
  handleGetSubjects,
  handleUploadGrades,
  handleVerifyGradesUpload,
} from "../../../controllers/teacherControllers/gradesController";
import SnackbarUtils from "../../../utils/snackbarUtils";
import load from "./assets/load.gif";

const UploadRecordsModal = ({ classItem, onClose, onSuccess }) => {
  const [subjectId, setSubjectId] = useState("");
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationError, setVerificationError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const response = await handleGetSubjects();
        if (response) {
          setSubjects(response);
        }
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setVerificationResult(null);
    setVerificationError(null);
    setUploadResult(null);
  };

  const handleVerify = async () => {
    if (!file) {
      SnackbarUtils.error("Please select a file.");
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);
    const formData = new FormData();
    formData.append("file", file);

    await handleVerifyGradesUpload(
      formData,
      (response) => {
        if (response.success) {
          setVerificationResult(response);
        } else {
          setVerificationError(response.message || "Verification failed.");
          SnackbarUtils.error(response.message || "Verification failed.");
        }
      },
      (error) => {
        const errorMessage = error.response?.data?.message || "An error occurred during verification.";
        setVerificationError(errorMessage);
        SnackbarUtils.error(errorMessage);
      }
    ).finally(() => setIsVerifying(false));
  };

  const handleUpload = async () => {
    if (!subjectId || !file) {
      SnackbarUtils.error("Please select a subject and a file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("classId", classItem.classId);
    formData.append("subjectId", subjectId);
    formData.append("file", file);

    await handleUploadGrades(
      formData,
      (response) => {
        setUploadResult(response.data);
        if (
          response.data?.summary?.inserted > 0 ||
          response.data?.summary?.modified > 0
        ) {
          onSuccess();
        }
        if (!response.data?.errors || response.data.errors.length === 0) {
          setTimeout(onSuccess, 2000);
        }
      },
      (error) => {
        SnackbarUtils.error(error.message || "Upload failed.");
      }
    ).finally(() => setIsUploading(false));
  };

  const renderVerificationResult = () => (
    <div className="mt-6 p-4 border rounded-lg bg-blue-50 font-Outfit">
      <h4 className="font-semibold text-md text-gray-800">
        Verification Successful
      </h4>
      <p className="text-sm text-gray-600 mt-2">
        The following columns were found in your CSV file:
      </p>
      <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
        {verificationResult.headers.map((header, index) => (
          <li key={index}>{header}</li>
        ))}
      </ul>
      {verificationError && (
        <p className="text-sm text-red-600 mt-2">{verificationError}</p>
      )}
    </div>
  );

  const renderUploadResult = () => (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50 font-Outfit">
      <h4 className="font-semibold text-md text-gray-800">
        Upload Summary
      </h4>
      <p className="text-sm text-green-600 mt-2">
        - Records Inserted: {uploadResult.summary?.inserted || 0}
      </p>
      <p className="text-sm text-blue-600">
        - Records Modified: {uploadResult.summary?.modified || 0}
      </p>
      {uploadResult.errors && uploadResult.errors.length > 0 && (
        <div className="mt-4">
          <h5 className="font-semibold text-red-600">Errors:</h5>
          <ul className="list-disc list-inside text-sm text-red-500">
            {uploadResult.errors.map((err, index) => (
              <li key={index}>{err.error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#1212128d] z-[99999] flex justify-center items-center">
      <div className="bg-white rounded-[15px] w-full max-w-[450px] flex flex-col overflow-hidden">
        <div className="p-6 border-b">
          <span className="w-full flex items-center justify-between">
            <img src={newwww} alt="" />
            <img
              src={close}
              onClick={onClose}
              className="w-4 cursor-pointer"
              alt="close"
            />
          </span>
          <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
            Upload Records
          </p>
          <p className="text-base text-[#5F6D7E] font-normal mt-2 font-Outfit">
            Upload a CSV file with student records.
          </p>
        </div>

        <div className="p-6 overflow-y-auto">
          {!verificationResult && (
            <label className="w-full flex flex-col text-[#272D37] font-Outfit font-medium text-sm">
              Subject
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                disabled={loadingSubjects}
              >
                <option value="">
                  {loadingSubjects ? "Loading..." : "Select Subject"}
                </option>
                {subjects?.data?.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          {!uploadResult && !verificationResult && (
            <FileUploader
              label="Upload CSV File"
              accept=".csv, application/vnd.ms-excel, text/csv"
              maxSize={5000000} // 5MB
              onFileSelect={handleFileSelect}
            />
          )}
          
          {verificationResult && !uploadResult && renderVerificationResult()}
          {uploadResult && renderUploadResult()}
        </div>

        <div className="p-6 border-t grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
          >
            Cancel
          </button>
          {!verificationResult ? (
            <button
              onClick={handleVerify}
              disabled={!file || isVerifying || isUploading}
              className="w-full py-3 font-Outfit rounded-md text-white bg-[#0530A1] font-semibold text-base disabled:bg-gray-400 flex justify-center items-center"
            >
              {isVerifying ? (
                <img src={load} className="w-6" alt="loading" />
              ) : (
                "Verify"
              )}
            </button>
          ) : (
            <button
              onClick={handleUpload}
              disabled={!subjectId || !file || isUploading}
              className="w-full py-3 font-Outfit rounded-md text-white bg-[#0530A1] font-semibold text-base disabled:bg-gray-400 flex justify-center items-center"
            >
              {isUploading ? (
                <img src={load} className="w-6" alt="loading" />
              ) : (
                "Confirm Upload"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadRecordsModal;
