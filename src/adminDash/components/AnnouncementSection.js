import React, { useState } from "react";
import AnnouncementModal from "./AnnouncementModal";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";

const AnnouncementSection = ({ submitAnnouncement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="w-full lg:w-[34%] border border-[#EAEBF0] rounded-[10px] p-4 relative">
      <p className="font-Outfit text-lg font-semibold text-[#272D37]">
        Announcements
      </p>
      <div className="flex flex-col items-center">
        <img src={nonoti} className="mt-7" alt="" />
        <p className="font-Outfit text-center font-medium mt-3 text-base">
          No Announcements
        </p>
        <p className="font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
          When you have an announcement you’ll see them here
        </p>
        <div className="w-full px-4 lg:absolute bottom-4">
          <button
            onClick={handleOpenModal}
            className="w-full mt-8 lg:mt-0 py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
          >
            <img src={add} alt="" />
            <p className="font-Outfit text-sm text-white font-medium">
              Make an Announcement
            </p>
          </button>

          <AnnouncementModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={submitAnnouncement}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSection;
