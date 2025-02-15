import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import Pagination from "./Pagination";
// import backArr from "./assets/backArr.svg";
// import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import down from "./assets/download.svg";

const PaidSalaryCEO = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [selectedOption, setSelectedOption] = useState("schData");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [modalData, setModalData] = useState(null);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const schData = [
    {
      regNo: "SCI-20-0102",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
  ];
  const bookData = [
    {
      regNo: "SCI-20-0102",
      name: "Broomfield",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
  ];
  const subData = [
    {
      regNo: "SCI-20-0102",
      name: "Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
    {
      regNo: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$2000",
      status: "Done",
    },
  ];

  const columns = {
    schData: ["S/N", "Name", "Amount", "Transaction ID", "Status"],
    bookData: ["S/N", "Name", "Amount", "Transaction ID", "Status"],
    subData: ["S/N", "Name", "Amount", "Transaction ID", "Status"],
  };

  const statusStyles = {
    Done: "text-[#2D8A39] bg-[#F0FAF0]",
    Pending: "text-[#E2341D] bg-[#FFF2F0]",
    default: "text-gray-600 bg-gray-100",
  };

  const getStatusClass = (status) => {
    return statusStyles[status] || statusStyles.default;
  };

  const handleReviewClick = (data) => setModalData(data);

  const closeModal = () => setModalData(null);

  const dataToRender =
    selectedOption === "schData"
      ? schData
      : selectedOption === "bookData"
      ? bookData
      : subData;

  const totalItems = dataToRender.length;

  // Slice the data for the current page
  const currentData = dataToRender.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Paid Salary
          </p>
        </span>

        <div className="mt-6">
          <div className="border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    {columns[selectedOption].map((column, index) => (
                      <th
                        key={index}
                        className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"
                      >
                        {column}
                      </th>
                    ))}
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data, index) => (
                    <tr key={index}>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                        0{index + 1}
                      </td>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.name}
                      </td>
                      {selectedOption === "schData" ? (
                        <>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.amount}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.regNo}
                          </td>
                          <td
                            className={`font-Outfit text-sm text-[#5F6D7E] py-4 border-t  border-[#EAEBF0] text-center`}
                          >
                            <p
                              className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px]  w-[67px] mx-auto py-[2px] ${getStatusClass(
                                data.status
                              )}`}
                            >
                              {data.status}
                            </p>
                          </td>
                        </>
                      ) : selectedOption === "bookData" ? (
                        <>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.amount}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.regNo}
                          </td>
                          <td
                            className={`font-Outfit text-sm text-[#5F6D7E] py-4 border-t  border-[#EAEBF0] text-center`}
                          >
                            <p
                              className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px]  w-[67px] mx-auto py-[2px] ${getStatusClass(
                                data.status
                              )}`}
                            >
                              {data.status}
                            </p>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.amount}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.regNo}
                          </td>
                          <td
                            className={`font-Outfit text-sm text-[#5F6D7E] py-4 border-t  border-[#EAEBF0] text-center`}
                          >
                            <p
                              className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px]  w-[67px] mx-auto py-[2px] ${getStatusClass(
                                data.status
                              )}`}
                            >
                              {data.status}
                            </p>
                          </td>
                        </>
                      )}
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex">
                        <button
                          onClick={() => handleReviewClick(data)}
                          className=" py-2 px-3 rounded-[10px] bg-[#0530A1] text-[#FFFFFF] font-Outfit font-medium text-xs"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <p>
              <strong>Name:</strong> {modalData.name}
            </p>
            <p>
              <strong>Amount:</strong> {modalData.amount}
            </p>
            <p>
              <strong>Reg No:</strong> {modalData.regNo}
            </p>
            <p>
              <strong>Status:</strong> {modalData.status}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-[#0530A1] text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaidSalaryCEO;
