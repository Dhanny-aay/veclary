import React from "react";
import logo from "../assets/logo.svg";

const TransactionReceipt = React.forwardRef(({ transaction }, ref) => {
  if (!transaction) return null;

  return (
    <div
      ref={ref}
      className="p-8 bg-white font-Outfit"
      style={{ width: "800px" }}
    >
      <div className="flex justify-between items-center border-b pb-4">
        <img src={logo} alt="Veclary Logo" className="h-10" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Transaction Receipt
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Reference:</span>
          <span className="font-semibold text-gray-800">
            {transaction.reference}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Date:</span>
          <span className="font-semibold text-gray-800">
            {new Date(transaction.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Type:</span>
          <span className="font-semibold text-gray-800 capitalize">
            {transaction.type}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Method:</span>
          <span className="font-semibold text-gray-800 capitalize">
            {transaction.method}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Status:</span>
          <span className="font-semibold text-gray-800 capitalize">
            {transaction.status}
          </span>
        </div>
      </div>

      <div className="mt-8 border-t pt-4">
        <p className="font-medium text-gray-500 text-sm">Description:</p>
        <p className="text-gray-800 mt-1">{transaction.description}</p>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="w-1/2">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-500">Amount:</span>
            <span className="font-semibold text-gray-800">
              ${transaction.amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="font-bold text-lg text-gray-800">Total Paid:</span>
            <span className="font-bold text-lg text-[#0530A1]">
              ${transaction.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-4 text-center text-xs text-gray-500">
        <p className="text-center">Veclary Inc. | support@veclary.com</p>
      </div>
    </div>
  );
});

export default TransactionReceipt;
