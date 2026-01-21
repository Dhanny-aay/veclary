import React, { useState, useEffect, useCallback } from "react";
import AnnouncementModal from "./AnnouncementModal";
import nonoti from "./assets/nonoti.svg";
import add from "./assets/add.svg";
import { AnnouncementService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";

const AnnouncementSection = ({ submitAnnouncement, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AnnouncementService.getAnnouncement();
      const data = response.data || response;
      if (Array.isArray(data)) {
        setAnnouncements(data);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreate = async (data) => {
    if (submitAnnouncement) {
      await submitAnnouncement(data);
    } else {
      await AnnouncementService.createAnnouncement(data);
    }
    fetchAnnouncements();
  };

  return (
    <div
      className={`w-full ${
        className ? className : "lg:w-[34%]"
      } border border-[#EAEBF0] rounded-[10px] p-4 relative flex flex-col`}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="font-Outfit text-lg font-semibold text-[#272D37]">
          Announcements
        </p>
        <button onClick={handleOpenModal} className="p-2">
          <img src={add} alt="Add" className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[300px]">
        {loading ? (
          <GenericLoadingSkeleton count={3} height={60} />
        ) : announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={nonoti} className="mt-4" alt="" />
            <p className="font-Outfit text-center font-medium mt-3 text-base">
              No Announcements
            </p>
            <p className="font-Outfit text-xs text-[#9E9E9E] mt-2 text-center">
              When you have an announcement you’ll see them here
            </p>
            <button
              onClick={handleOpenModal}
              className="w-full mt-6 py-3 flex justify-center items-center space-x-3 bg-[#0530A1] rounded-[10px]"
            >
              <img src={add} alt="" />
              <p className="font-Outfit text-sm text-white font-medium">
                Make an Announcement
              </p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {announcements.map((item, index) => (
              <div
                key={item._id || index}
                className="p-3 border border-[#EAEBF0] rounded-[8px]"
              >
                <p className="font-Outfit font-medium text-[#272D37] text-sm">
                  {item.title}
                </p>
                <p className="font-Outfit text-[#5F6D7E] text-xs mt-1 line-clamp-2">
                  {item.message}
                </p>
                <p className="font-Outfit text-[#9E9E9E] text-[10px] mt-2 text-right">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default AnnouncementSection;
