import { useState } from "react";
import { handleDeleteAssignment } from "../../../controllers/teacherControllers/assignmentController";
import SnackbarUtils from "../../../utils/snackbarUtils";
import close from "./assets/clos.svg";
import load from "./assets/load.gif";

const DeleteAssignment = ({ assignmentId, onCancel, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await handleDeleteAssignment(
      assignmentId,
      () => {
        SnackbarUtils.success("Assignment deleted successfully!");
        onSuccess(); // This will close the modal and refetch assignments
      },
      (error) => {
        SnackbarUtils.error(error.message || "Failed to delete assignment.");
        setIsDeleting(false);
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-[#1212128d] z-[99999] flex justify-center items-center">
      <div className="bg-white p-6 rounded-[15px] w-full max-w-[400px]">
        <div className="w-full flex items-center justify-between">
          <p className="text-lg text-[#272D37] font-semibold font-Outfit">
            Confirm Deletion
          </p>
          <img
            onClick={onCancel}
            src={close}
            className="w-4 cursor-pointer"
            alt="close"
          />
        </div>
        <p className="text-base text-[#5F6D7E] font-normal mt-4 font-Outfit">
          Are you sure you want to delete this assignment? This action cannot be
          undone.
        </p>
        <div className="w-full mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full py-3 font-Outfit rounded-md text-white bg-red-600 hover:bg-red-700 font-semibold text-base disabled:bg-gray-400 flex justify-center items-center"
          >
            {isDeleting ? (
              <img src={load} className="w-6" alt="loading" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAssignment;
