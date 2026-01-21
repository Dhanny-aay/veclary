import React from "react";
import cross from "../assets/Button Close.svg";
import nofeed from "../assets/nofeed.svg";

const ViewEarningModal = ({ isOpen, onClose, earning }) => {
  if (!isOpen) return null;

  return (
    <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999]  fixed top-0 md:pb-[120px] -left-[20%] flex justify-center items-center">
      <div className="ml-[20%] h-[90%]  mt-[100px] bg-[#FFFFFF] p-6 rounded-[15px]  w-full md:w-[500px] flex flex-col">
        <span className=" w-full flex items-center justify-between shrink-0 pb-4 border-b border-[#EAEBF0]">
          <p className=" text-lg text-[#272D37] font-semibold font-Outfit">
            Earning Details
          </p>
          <img
            onClick={onClose}
            src={cross}
            className=" cursor-pointer"
            alt="Close"
          />
        </span>

        <div className="w-full flex-1 overflow-y-auto">
          {earning ? (
            <div className="mt-6 flex flex-col space-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-[#5F6D7E] font-Outfit">
                  User Name
                </span>
                <span className="text-[#272D37] font-medium font-Outfit text-base capitalize">
                  {earning.userId?.name || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#5F6D7E] font-Outfit">
                  Book Title
                </span>
                <span className="text-[#272D37] font-medium font-Outfit text-base capitalize">
                  {earning.bookId?.title || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#5F6D7E] font-Outfit">
                  Transaction ID
                </span>
                <span className="text-[#272D37] font-medium font-Outfit text-base">
                  {earning._id}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#5F6D7E] font-Outfit">
                  Amount
                </span>
                <span className="text-[#272D37] font-medium font-Outfit text-base">
                  ₦{earning.price}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#5F6D7E] font-Outfit">Date</span>
                <span className="text-[#272D37] font-medium font-Outfit text-base">
                  {new Date(earning.createdAt).toDateString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-10 text-center flex flex-col items-center justify-center h-[50%]">
              <img
                src={nofeed}
                alt="No details"
                className="w-[100px] h-[100px] mb-4"
              />
              <p className="font-Outfit text-[#272D37] font-semibold text-lg">
                Details Not Found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEarningModal;
