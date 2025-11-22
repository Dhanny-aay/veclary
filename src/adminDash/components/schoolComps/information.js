import trash from "../assets/trash.svg";
import file from "../assets/file.svg";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";

const Information = ({ school, loading }) => {
  const Uploaded = [
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
  ];

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
      {loading ? (
        <GenericLoadingSkeleton count={2} height={50} className="mt-2" />
      ) : (
        <div className=" w-full mt-2 border border-[#EAEBF0] rounded-[10px] px-2">
          {Uploaded.map((item, index) => (
            <div
              key={index}
              className=" py-3 flex flex-row justify-between items-center border-b border-[#EAEBF0]"
            >
              <div className=" flex space-x-4">
                <img src={file} alt="" />
                <span className=" flex flex-col">
                  <p className=" text-[#272D37] font-Outfit text-sm font-medium">
                    {item.name}
                  </p>
                  <p className=" text-[#5F6D7E] text-xs font-Outfit font-medium">
                    {item.size}
                  </p>
                </span>
              </div>
              <img src={trash} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Information;
