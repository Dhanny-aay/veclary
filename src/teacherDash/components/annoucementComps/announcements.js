import React, { useState } from "react";
import {
  MessageSquare,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import ViewAnnouncement from "./viewAnnouncement";

const Announcements = ({
  userId,
  announcements,
  receivedAnnouncements,
  isFetchingAnnouncements,
  setMakeAnnouncement,
  setEditAnnouncement,
  setDeleteModal,
  triggerFetchAnnounce,
}) => {
  const [activeTab, setActiveTab] = useState("created");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAnnouncement, setViewAnnouncement] = useState(null);
  const itemsPerPage = 3;

  const myAnnouncements = announcements.filter(
    (item) => item.createdBy === userId
  );
  const noMyAnnouncements = myAnnouncements.length === 0;
  const noReceivedAnnouncements = receivedAnnouncements.length === 0;

  const totalPages = Math.ceil(
    activeTab === "created"
      ? myAnnouncements.length / itemsPerPage
      : receivedAnnouncements.length / itemsPerPage
  );
  const paginatedItems =
    activeTab === "created"
      ? myAnnouncements.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : receivedAnnouncements.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full lg:w-[29%] border border-[#EAEBF0] rounded-[10px] p-3  flex flex-col">
      {viewAnnouncement && (
        <ViewAnnouncement
          announcement={viewAnnouncement}
          setViewAnnouncement={setViewAnnouncement}
        />
      )}
      <p className="font-Outfit text-lg font-semibold">Announcements</p>
      <div className="flex space-x-4 mt-2">
        <button
          onClick={() => {
            setActiveTab("created");
            setCurrentPage(1);
          }}
          className={`font-Outfit text-sm font-medium ${
            activeTab === "created"
              ? "text-[#0530A1] border-b-2 border-[#0530A1]"
              : "text-[#5F6D7E]"
          }`}
        >
          Created
        </button>
        <button
          onClick={() => {
            setActiveTab("received");
            setCurrentPage(1);
          }}
          className={`font-Outfit text-sm font-medium ${
            activeTab === "received"
              ? "text-[#0530A1] border-b-2 border-[#0530A1]"
              : "text-[#5F6D7E]"
          }`}
        >
          Received
        </button>
      </div>
      {isFetchingAnnouncements && activeTab === "created" ? (
        <div className="flex-1 flex flex-col p-3">
          <GenericLoadingSkeleton
            count={3}
            width="100%"
            height={25}
            className="mt-1"
          />
        </div>
      ) : (activeTab === "created" && noMyAnnouncements) ||
        (activeTab === "received" && noReceivedAnnouncements) ? (
        <div className="flex-1 flex flex-col items-center justify-between p-3 h-full">
          <div className="flex flex-col items-center justify-center flex-1">
            <img src={nonoti} className="h-16 w-16" alt="no announcements" />
            <p className="font-Outfit text-center font-medium mt-3 text-base">
              No Announcements
            </p>
            <p className="font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
              When you have an announcement, you’ll see them here
            </p>
          </div>
          {activeTab === "created" && (
            <div className="w-full px-3">
              <button
                onClick={() => setMakeAnnouncement(true)}
                className="w-full py-2 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
              >
                <img src={add} className="h-4 w-4" alt="add" />
                <p className="font-Outfit text-sm text-white font-medium">
                  Make an Announcement
                </p>
              </button>
            </div>
          )}
          {totalPages > 0 && (
            <div className="flex justify-between items-center mt-2 px-3">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5 text-[#0530A1]" />
              </button>
              <p className="font-Outfit text-sm text-[#272D37]">
                Showing {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5 text-[#0530A1]" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-3 h-full">
          <div className="flex flex-col space-y-2 flex-1 overflow-y-auto scrollbar-hide">
            {paginatedItems.map((item) => (
              <div
                key={item._id}
                className="w-full py-2 border-b border-[#EAEBF0] flex flex-row items-center justify-between"
              >
                <div className="flex flex-row space-x-3">
                  <MessageSquare className="h-5 w-5 text-[#0530A1]" />
                  <div>
                    <p className="font-Outfit font-medium text-[#272D37] text-xs capitalize">
                      {item.title || "Untitled"}
                    </p>
                    <p className="font-Outfit text-[10px] text-[#5F6D7E] capitalize">
                      {item.subtitle || "No subtitle"}
                    </p>
                  </div>
                </div>
                <span className="flex space-x-3">
                  <Eye
                    onClick={() => setViewAnnouncement(item)}
                    className="h-4 w-4 cursor-pointer text-[#0530A1] hover:text-[#021a6e]"
                  />
                  {activeTab === "created" && item.createdBy === userId && (
                    <>
                      <Edit
                        onClick={() => setEditAnnouncement(item)}
                        className="h-4 w-4 cursor-pointer text-[#0530A1] hover:text-[#021a6e]"
                      />
                      <Trash2
                        onClick={() => setDeleteModal(item._id)}
                        className="h-4 w-4 cursor-pointer text-red-500 hover:text-red-600"
                      />
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
          {activeTab === "created" && (
            <div className="w-full px-3 mt-2">
              <button
                onClick={() => setMakeAnnouncement(true)}
                className="w-full py-2 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
              >
                <img src={add} className="h-4 w-4" alt="add" />
                <p className="font-Outfit text-sm text-white font-medium">
                  Make an Announcement
                </p>
              </button>
            </div>
          )}
          {totalPages > 0 && (
            <div className="flex justify-between items-center mt-2 px-3">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5 text-[#0530A1]" />
              </button>
              <p className="font-Outfit text-sm text-[#272D37]">
                Showing {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5 text-[#0530A1]" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Announcements;
