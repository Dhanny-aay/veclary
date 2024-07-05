import trash from "./assets/trash.svg";
import file from "./assets/file.svg";

const Information = () => {
  const Uploaded = [
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
    { name: "CAC document", size: "1.69 mb" },
  ];
  return (
    <>
      <div className=" w-full flex mt-3 justify-between items-end">
        <label
          htmlFor="Email"
          className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
        >
          School Name
          <input
            type="email"
            placeholder=""
            className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
          />
        </label>

        <label
          htmlFor="Email"
          className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
        >
          School Email
          <input
            type="email"
            placeholder=""
            className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
          />
        </label>
      </div>

      <div className=" w-full flex justify-between items-end">
        <label
          htmlFor="Email"
          className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
        >
          Phone Number
          <input
            type="email"
            placeholder=""
            className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
          />
        </label>

        <label
          htmlFor="Email"
          className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
        >
          Email
          <input
            type="email"
            placeholder=""
            className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
          />
        </label>
      </div>

      <label
        htmlFor="Email"
        className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
      >
        Address
        <input
          type="email"
          placeholder=""
          className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
        />
      </label>

      <div className=" w-full flex justify-between items-end">
        <label
          htmlFor="Email"
          className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
        >
          Admin Name
          <input
            type="email"
            placeholder=""
            className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
          />
        </label>

        <label
          htmlFor="Email"
          className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
        >
          Admin Email
          <input
            type="email"
            placeholder=""
            className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[8px] mt-2"
          />
        </label>
      </div>

      <p className=" mt-6 text-sm font-Outfit font-medium text-[#344054]">
        Uploaded Document
      </p>
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
    </>
  );
};

export default Information;
