import { React, useEffect, useState } from "react";
import { TransactionService } from "../../services/adminService";
// import { AdminActivePageContext } from "../contexts/AdminActivePageContext";

const RecentTransactions = ({ handleClick }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await TransactionService.getTransactions();
        if (response.data && response.data.length > 0) {
          const latestTransactions = response.data.slice(-4).reverse();
          setTransactions(latestTransactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const statusStyles = {
    Done: "text-[#2D8A39] bg-[#F0FAF0]",
    Failed: "text-[#E2341D] bg-[#FFF2F0]",
    default: "text-gray-600 bg-gray-100", // Default style for other statuses
  };

  const getStatusClass = (status) => {
    return statusStyles[status] || statusStyles.default;
  };

  return (
    <div className="w-full lg:w-[64%] border border-[#EAEBF0] rounded-[10px] p-4">
      <p className="font-Outfit font-semibold text-lg text-[#272D37]">
        Recent Transactions
      </p>

      <div className="mt-2 grid grid-cols-1 w-full border-b border-[#EAEBF0]">
        {transactions.length > 0 ? (
          transactions?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full py-3"
            >
              <span className="flex flex-col">
                <p className="font-Outfit font-medium text-[#272D37] text-[15px]">
                  {item.name}
                </p>
                <p className="font-Outfit text-[#5F6D7E] text-sm font-medium">
                  {item.date}
                </p>
              </span>

              <span className="flex flex-row items-center space-x-3">
                <p className="font-Outfit text-[#000000] font-semibold text-base">
                  {item.price}
                </p>
                <p
                  className={`-mt-0 font-Outfit font-medium text-[13px] px-2 py-[2px] ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </p>
              </span>
            </div>
          ))
        ) : (
          <p className="font-Outfit text-center font-medium py-16 text-base">
            No transactions available
          </p>
        )}
      </div>

      <button
        onClick={() => handleClick("Transaction")}
        className="w-full mt-8 lg:mt-6 py-3 flex justify-center items-center bg-[#0530A1] rounded-[10px]"
      >
        <p className="font-Outfit text-sm text-white font-medium">View All</p>
      </button>
    </div>
  );
};

export default RecentTransactions;
