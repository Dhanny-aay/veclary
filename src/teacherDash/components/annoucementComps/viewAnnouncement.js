import React from "react";
import close from "./assets/clos.svg";
import announce from "./assets/announce.svg";

const ViewAnnouncement = ({ announcement, setViewAnnouncement }) => {
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const targetStudents =
    announcement.targets?.find((t) => t.role === "Student")?.users || [];
  const targetTeachers =
    announcement.targets?.find((t) => t.role === "Teacher")?.users || [];

  return (
    <div className="w-full h-full bg-[#1212128d] z-[99999] fixed top-0 left-0 p-6 flex justify-center items-center">
      <div className="w-full max-w-[600px] max-h-[80vh] flex justify-center items-center">
        <div className="bg-[#FFFFFF] p-6 rounded-[15px] w-full h-full overflow-y-auto">
          <span className="w-full flex items-center justify-between">
            <img src={announce} alt="announcement icon" />
            <img
              onClick={() => setViewAnnouncement(null)}
              src={close}
              className="w-4 cursor-pointer"
              alt="close icon"
            />
          </span>
          <p className="text-lg text-[#272D37] font-semibold mt-6 font-Outfit">
            Announcement Details
          </p>
          <div className="mt-4">
            <p className="font-Outfit text-sm font-medium text-[#272D37]">
              Title
            </p>
            <p className="font-Outfit text-sm text-[#5F6D7E] mt-1 capitalize">
              {announcement.title || "Untitled"}
            </p>
          </div>
          <div className="mt-4">
            <p className="font-Outfit text-sm font-medium text-[#272D37]">
              Subtitle
            </p>
            <p className="font-Outfit text-sm text-[#5F6D7E] mt-1 capitalize">
              {announcement.subtitle || "No subtitle"}
            </p>
          </div>
          <div className="mt-4">
            <p className="font-Outfit text-sm font-medium text-[#272D37]">
              Content
            </p>
            <p className="font-Outfit text-sm text-[#5F6D7E] mt-1">
              {announcement.content || "No content"}
            </p>
          </div>
          <div className="mt-4">
            <p className="font-Outfit text-sm font-medium text-[#272D37]">
              Schedule Time
            </p>
            <p className="font-Outfit text-sm text-[#5F6D7E] mt-1">
              {announcement.scheduleTime
                ? formatDate(announcement.scheduleTime)
                : "Not scheduled"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnnouncement;
