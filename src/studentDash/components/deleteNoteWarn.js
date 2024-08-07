import { useSnackbar } from "notistack";
import { handleDeleteNote } from "../../controllers/studentControllers/noteController";
import load from "./assets/load.gif";
import { useState } from "react";

const DeleteNoteWarn = ({ setDeleteComp, noteID, fetchNote }) => {
  const [loading, setLoading] = useState(false);

  const onSuccess = (response) => {
    setLoading(false);

    setDeleteComp(false);
    fetchNote();
  };

  const onError = (error) => {
    setDeleteComp(false);
    setLoading(false);
  };

  const handleDelete = (e) => {
    setLoading(true);
    const noteID = noteID;
    handleDeleteNote(noteID, onSuccess, onError);
  };

  return (
    <>
      <div className=" w-full md:w-[120%] h-full bg-[#1212128d] z-[99999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className=" w-full h-full flex justify-center items-center">
          <div className=" md:ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[400px]">
            <p className=" font-Outfit text-lg text-[#000000a6] font-medium text-center">
              Are you sure you want to delete this note?
            </p>

            <div className=" mt-6 w-full flex items-center justify-between">
              <button
                onClick={() => {
                  setDeleteComp(false);
                }}
                className=" w-[48%] py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className=" w-[48%] py-3 font-Outfit rounded-md text-[#fff] font-semibold bg-[#d83131] text-base flex justify-center items-center"
              >
                {loading ? (
                  <img src={load} className=" w-6" alt="" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteNoteWarn;
