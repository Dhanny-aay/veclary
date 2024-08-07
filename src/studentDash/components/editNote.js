import close from "./assets/close.svg";
import edit from "./assets/change.svg";
import { useState, useEffect } from "react";
import load from "./assets/load.gif";
import { handleUpdateNote } from "../../controllers/studentControllers/noteController";
import { useSnackbar } from "notistack";

const EditNote = ({
  noteID,
  setEditComp,
  fetchNote,
  title,
  subtitle,
  content,
}) => {
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteSubtitle, setNoteSubtitle] = useState(subtitle);
  const [noteContent, setNoteContent] = useState(content);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setNoteTitle(title);
    setNoteSubtitle(subtitle);
    setNoteContent(content);
  }, [title, subtitle, content]);

  const onSuccess = (response) => {
    setLoading(false);
    setEditComp(false);
    fetchNote();
    enqueueSnackbar("Note edited successfully!", { variant: "success" });
  };

  const onError = (error) => {
    setLoading(false);
    enqueueSnackbar("Note edit failed. Please try again.", {
      variant: "error",
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      title: noteTitle,
      subtitle: noteSubtitle,
      content: noteContent,
    };
    handleUpdateNote(noteID, userData, onSuccess, onError);
  };

  console.log(noteID);
  console.log(noteTitle);
  console.log(noteSubtitle);
  console.log(noteContent);

  return (
    <>
      <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
        <div className=" w-full h-full flex justify-center items-center">
          <div className="ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[400px]">
            <span className=" w-full flex items-center justify-between">
              <img src={edit} className="" alt="" />
              <img
                onClick={() => {
                  setEditComp(false);
                }}
                src={close}
                className=" w-4"
                alt=""
              />
            </span>
            <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
              Edit your note
            </p>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Title
              <input
                type="text"
                name="title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Enter the title of your note"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Descripition
              <input
                type="text"
                name="subtitle"
                value={noteSubtitle}
                onChange={(e) => setNoteSubtitle(e.target.value)}
                placeholder="Enter the descripition of your note"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
            </label>
            <label
              htmlFor=""
              className=" w-full flex flex-col mt-4 text-[#272D37] font-Outfit font-medium text-sm"
            >
              Content
              <textarea
                type="text"
                name="content"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Enter the content of your note"
                className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
                id=""
              />
            </label>

            <div className=" w-full mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setEditComp(false);
                }}
                className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#0530A1] font-semibold flex justify-center items-center text-base"
              >
                {loading ? (
                  <img src={load} className=" w-6" alt="" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNote;
