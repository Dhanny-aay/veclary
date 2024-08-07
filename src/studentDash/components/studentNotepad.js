import arrowBlue from "./assets/arrowblue.svg";
import bin from "./assets/delete.svg";
import edit from "./assets/change.svg";
import { useContext, useState } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSnackbar } from "notistack";
import DeleteNoteWarn from "./deleteNoteWarn";
import EditNote from "./editNote";

const StudentNotepad = ({ note, setNewNote, loading, fetchNote }) => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [noteID, setNoteID] = useState("");
  const [deleteComp, setDeleteComp] = useState(false);
  const [editComp, setEditComp] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleClick = (page) => {
    setActivePage(page);
  };

  const sortedNotes = [...note].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const handleDeleteIconClick = (noteId) => {
    setNoteID(noteId);
    setDeleteComp(true);
  };

  const handleEditIconClick = (noteId, title, subtitle, content) => {
    setNoteID(noteId);
    setEditTitle(title);
    setEditSubtitle(subtitle);
    setEditContent(content);
    setEditComp(true);
  };

  return (
    <>
      {deleteComp && (
        <DeleteNoteWarn
          noteID={noteID}
          setDeleteComp={setDeleteComp}
          fetchNote={fetchNote}
        />
      )}
      {editComp && (
        <EditNote
          noteID={noteID}
          setEditComp={setEditComp}
          fetchNote={fetchNote}
          title={editTitle}
          subtitle={editSubtitle}
          content={editContent}
        />
      )}
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <div className="p-6 w-full flex justify-between items-center">
          <span
            onClick={() => handleClick("Home")}
            className="flex cursor-pointer flex-row items-center"
          >
            <img src={arrowBlue} alt="Back" />
            <p className="font-Outfit text-[#0530A1] text-sm font-medium">
              Back
            </p>
            <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
              Notepad
            </p>
          </span>
          <button
            onClick={() => {
              setNewNote(true);
            }}
            className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-6 rounded-[10px]"
          >
            Add New Note
          </button>
        </div>

        {loading ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-[#F8F8F8] p-4 rounded-[15px]"
              >
                <div className="w-full flex justify-between items-center pb-4 border-b border-[#000000]">
                  <div>
                    <Skeleton width={150} height={24} />
                    <Skeleton
                      width={100}
                      height={16}
                      style={{ marginTop: "0.5rem" }}
                    />
                  </div>
                  <span className="flex flex-row items-center space-x-3">
                    <Skeleton circle width={16} height={16} />
                    <Skeleton circle width={16} height={16} />
                  </span>
                </div>
                <Skeleton count={3} height={16} style={{ marginTop: "1rem" }} />
              </div>
            ))}
          </div>
        ) : note.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-center py-10">
            <p className="font-Outfit text-xl font-medium text-[#929292]">
              Your mind is full - let's empty it
            </p>
            <button
              onClick={() => {
                setNewNote(true);
              }}
              className="mt-4 text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-6 rounded-[10px]"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
            {sortedNotes.map((item) => (
              <div
                key={item._id}
                className="w-full bg-[#F8F8F8] p-4 rounded-[15px]"
              >
                <div className="w-full flex justify-between items-center pb-4 border-b border-[#000000]">
                  <div>
                    <p className="font-Outfit text-lg font-medium text-[#272D37]">
                      {item.title}
                    </p>
                    <p className="font-Outfit mt-1 text-xs font-normal text-[#272D37]">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="flex flex-row items-center space-x-3">
                    <img
                      src={edit}
                      className="w-4 cursor-pointer"
                      onClick={() =>
                        handleEditIconClick(
                          item._id,
                          item.title,
                          item.subtitle,
                          item.content
                        )
                      }
                      alt="Edit"
                    />
                    <img
                      src={bin}
                      className="w-4 cursor-pointer"
                      onClick={() => handleDeleteIconClick(item._id)}
                      alt="Delete"
                    />
                  </span>
                </div>
                <p className="mt-4 font-Outfit text-sm text-[#12121299]">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StudentNotepad;
