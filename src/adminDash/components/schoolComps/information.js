import { useState, useEffect } from "react";
import trash from "../assets/trash.svg";
import file from "../assets/file.svg";
import nofeed from "../assets/nofeed.svg";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { SchoolService } from "../../../services/adminService";
import SnackbarUtils from "../../../utils/snackbarUtils";

const Information = ({ school, loading, refreshKey }) => {
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (school?._id) {
        setDocumentsLoading(true);
        try {
          const response = await SchoolService.getVerificationDocuments(
            school._id
          );
          setDocuments(response?.documents || []);
        } catch (error) {
          SnackbarUtils.error("Failed to fetch school documents.");
        } finally {
          setDocumentsLoading(false);
        }
      }
    };

    fetchDocuments();
  }, [school?._id, refreshKey]);

  const renderInput = (label, value) => (
    <label className="flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4">
      {label}
      {loading ? (
        <GenericLoadingSkeleton height={40} className="mt-2" />
      ) : (
        <input
          type="text"
          readOnly
          value={value || ""}
          className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2 bg-[#F8F9FA]"
        />
      )}
    </label>
  );

  return (
    <>
      <div className=" w-full flex mt-3 justify-between items-end ">
        {renderInput("School Name", school?.schoolName)}
        {renderInput("School Email", school?.schoolEmail)}
      </div>

      <div className=" w-full flex justify-between items-end">
        {renderInput("Phone Number", school?.schoolPhone)}
        {renderInput("Registration Number", school?.schoolReg)}
      </div>

      <div className=" w-full flex justify-between items-end">
        {renderInput("CAC Number", school?.schoolCAC)}
        {renderInput("Website", school?.website)}
      </div>

      <div className=" w-full flex justify-between items-end">
        <div className="flex flex-col w-full font-Outfit text-sm font-medium mt-4">
          <p>Address</p>
          {loading ? (
            <GenericLoadingSkeleton height={40} className="mt-2" />
          ) : (
            <input
              type="text"
              readOnly
              value={school?.address || ""}
              className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2 bg-[#F8F9FA]"
            />
          )}
        </div>
      </div>

      <div className=" w-full flex justify-between items-end">
        {renderInput("Admin Name", school?.admin?.name)}
        {renderInput("Admin Email", school?.admin?.email)}
      </div>

      <p className=" mt-6 text-sm font-Outfit font-medium text-[#344054]">
        Uploaded Document
      </p>
      {loading || documentsLoading ? (
        <GenericLoadingSkeleton count={2} height={50} className="mt-2" />
      ) : (
        <>
          {documents.length > 0 ? (
            <div className=" w-full mt-2 border border-[#EAEBF0] rounded-[10px] px-2">
              {documents.map((item, index) => (
                <div
                  key={index}
                  className=" py-3 flex flex-row justify-between items-center border-b border-[#EAEBF0]"
                >
                  <div className=" flex space-x-4">
                    <img src={file} alt="" />
                    <span className=" flex flex-col">
                      <p className=" text-[#272D37] font-Outfit text-sm font-medium">
                        {item.title || "Document"}
                      </p>
                      <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                        {item.size
                          ? `${(item.size / 1024 / 1024).toFixed(2)} mb`
                          : ""}
                      </p>
                    </span>
                  </div>
                  {/* <img src={trash} alt="" /> */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border border-[#EAEBF0] rounded-[10px] mt-2">
              <img src={nofeed} alt="No documents found" className="mx-auto" />
              <p className="font-Outfit text-lg mt-4 font-semibold">
                No Documents Found
              </p>
              <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
                Uploaded documents will appear here.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Information;
