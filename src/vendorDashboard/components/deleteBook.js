import { useState } from "react";
import close from "./assets/clos.svg";
import load from "./assets/load.gif";
import { handleDeleteBook } from "../../controllers/authorController/generalContoller";

const DeleteBook = ({ bookID, setMakeDelete, triggerFetch }) => {
  const [loading, setLoading] = useState(false);

  const onSuccess = (response) => {
    setLoading(false);
    setMakeDelete(false);
    triggerFetch();
  };

  const onError = (error) => {
    setMakeDelete(false);
    setLoading(false);
  };

  const handleDelete = (e) => {
    setLoading(true);
    handleDeleteBook(bookID, onSuccess, onError);
  };

  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[400px]">
          <div className="w-full h-full bg-[#fff] overflow-auto ">
            <span className=" w-full flex items-center justify-between">
              <p></p>
              <img
                onClick={() => {
                  setMakeDelete(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-center font-Outfit text-lg font-medium">
              Are you sure you want to delete this Book?
            </p>
            <div className=" w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setMakeDelete(false);
                }}
                className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleDelete}
                className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#e43737] font-semibold text-base flex items-center justify-center"
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

export default DeleteBook;
