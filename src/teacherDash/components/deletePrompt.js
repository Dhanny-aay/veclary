import React from "react";

const DeletePrompt = ({ itemId, onConfirm, onCancel }) => (
  <div className="fixed top-0 left-0 w-full h-full bg-[#1212128d] z-[99999] flex justify-center items-center">
    <div className="bg-white p-6 rounded-[15px] w-full max-w-[400px]">
      <p className="font-Outfit text-lg font-semibold text-[#272D37]">
        Confirm Deletion
      </p>
      <p className="font-Outfit text-sm text-[#5F6D7E] mt-2">
        Are you sure you want to delete this announcement?
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={onCancel}
          className="py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(itemId)}
          className="py-3 font-Outfit rounded-md text-white bg-red-500 font-semibold text-base"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeletePrompt;
