import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import Pagination from "./Pagination";

const PublisherFee = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [modalData, setModalData] = useState(null);

  const handleClick = (page) => {
    setActivePage(page);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReviewClick = (data) => setModalData(data);

  const closeModal = () => setModalData(null);

  const schData = [
    {
      id: "SCI-20-0102",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Pending",
    },
    {
      id: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Pending",
    },
    {
      id: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Pending",
    },
    {
      id: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Done",
    },
    {
      id: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$59000",
      status: "Done",
    },
  ];

  const totalItems = schData.length;

  // Slice the data for the current page
  const currentData = schData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusStyles = {
    Done: "text-[#2D8A39] bg-[#F0FAF0]",
    Pending: "text-[#E2341D] bg-[#FFF2F0]",
    default: "text-gray-600 bg-gray-100",
  };

  const getStatusClass = (status) => {
    return statusStyles[status] || statusStyles.default;
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
            Publisher/Author’s Fee
          </p>
        </span>

        <label
          htmlFor="Class Teacher"
          className="font-Outfit flex flex-col text-[#272D37] mt-6 text-xs font-medium"
        >
          Filter
          <select className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
            <option value="">Sort by Paid</option>
          </select>
        </label>

        <div className="mt-6">
          <div className="border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Name
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Transaction ID
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Amount
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Status
                    </th>

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

                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.id}
                      </td>
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.amount}
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

                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex ">
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
              <strong>Transaction ID:</strong> {modalData.id}
            </p>
            <p>
              <strong>Amount:</strong> {modalData.amount}
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

export default PublisherFee;
