import React from "react";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <p
          key={i}
          onClick={() => onPageChange(i)}
          className={`font-Outfit text-sm cursor-pointer h-8 w-8 flex items-center justify-center rounded-full mt-0 ${
            currentPage === i ? "bg-[#0530A1] text-white" : "text-[#5F6D7E]"
          }`}
        >
          {i}
        </p>
      );
    }

    if (start > 1)
      pageNumbers.unshift(
        <p
          key="start-ellipsis"
          className="h-8 w-8 flex items-center justify-center text-[#5F6D7E]"
        >
          ...
        </p>
      );

    if (end < totalPages)
      pageNumbers.push(
        <p
          key="end-ellipsis"
          className="h-8 w-8 flex items-center justify-center text-[#5F6D7E]"
        >
          ...
        </p>
      );

    return pageNumbers;
  };

  return (
    <div className="w-full py-3 px-3 flex justify-between items-center">
      <span
        className={`flex space-x-1 items-center ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={currentPage > 1 ? handlePrevClick : null}
      >
        <img src={backArr} alt="Previous" />
        <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">Prev</p>
      </span>

      <span className="flex items-center justify-center gap-2">
        {renderPageNumbers()}
      </span>

      <span
        className={`flex space-x-1 items-center ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={currentPage < totalPages ? handleNextClick : null}
      >
        <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">Next</p>
        <img src={fwdArr} alt="Next" />
      </span>
    </div>
  );
};

export default Pagination;
