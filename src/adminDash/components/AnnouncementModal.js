import React, { useState, useEffect, useCallback } from "react";
import cross from "./assets/Button Close.svg";
import { SchoolService } from "../../services/adminService";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";

const AnnouncementModal = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("schools"); // schools, teachers, students

  // Data State with Pagination and Search
  const [recipientStates, setRecipientStates] = useState({
    schools: { data: [], page: 1, search: "", loading: false, hasMore: true },
    teachers: { data: [], page: 1, search: "", loading: false, hasMore: true },
    students: { data: [], page: 1, search: "", loading: false, hasMore: true },
  });

  // Selection State
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const limit = 20;

  const fetchCategoryData = useCallback(
    async (category, page, search, append = false) => {
      // Update loading state
      setRecipientStates((prev) => ({
        ...prev,
        [category]: { ...prev[category], loading: true },
      }));

      try {
        let response;
        const params = { page, limit, search };

        if (category === "schools") {
          response = await SchoolService.getSchools(params);
        } else if (category === "teachers") {
          response = await SchoolService.getTeachers(params);
        } else if (category === "students") {
          response = await SchoolService.getStudents(params);
        }

        const newData =
          category === "schools" ? response.data || [] : response.data || [];
        // Note: Check API response structure consistency. Assuming response.data is the array for all now based on previous fixes.

        setRecipientStates((prev) => {
          const currentData = append ? prev[category].data : [];
          // Filter out duplicates if any (just in case)
          const existingIds = new Set(currentData.map((d) => d._id));
          const filteredNewData = newData.filter(
            (d) => !existingIds.has(d._id)
          );

          return {
            ...prev,
            [category]: {
              ...prev[category],
              data: [...currentData, ...filteredNewData],
              loading: false,
              hasMore: newData.length === limit, // Simple check: if we got less than limit, no more pages
              page: page,
            },
          };
        });
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
        setRecipientStates((prev) => ({
          ...prev,
          [category]: { ...prev[category], loading: false },
        }));
      }
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      // Initial fetch for all categories
      fetchCategoryData("schools", 1, "");
      fetchCategoryData("teachers", 1, "");
      fetchCategoryData("students", 1, "");
    }
  }, [isOpen, fetchCategoryData]);

  const handleSearchChange = (category, value) => {
    setRecipientStates((prev) => ({
      ...prev,
      [category]: { ...prev[category], search: value },
    }));
  };

  const handleSearchSubmit = (e, category) => {
    e.preventDefault(); // Prevent form submission
    const search = recipientStates[category].search;
    fetchCategoryData(category, 1, search, false);
  };

  const handleLoadMore = (category) => {
    const currentState = recipientStates[category];
    if (!currentState.loading && currentState.hasMore) {
      fetchCategoryData(
        category,
        currentState.page + 1,
        currentState.search,
        true
      );
    }
  };

  const handleSelectAll = (category) => {
    const currentState = recipientStates[category];
    // Select all CURRENTLY LOADED items
    const allIds = currentState.data.map((item) => item._id);

    if (category === "schools") {
      // If all currently loaded are selected, deselect them. Otherwise, select them.
      const allLoadedSelected = allIds.every((id) =>
        selectedSchools.includes(id)
      );
      if (allLoadedSelected) {
        setSelectedSchools((prev) => prev.filter((id) => !allIds.includes(id)));
      } else {
        // Add any that aren't already selected
        setSelectedSchools((prev) => [...new Set([...prev, ...allIds])]);
      }
    } else if (category === "teachers") {
      const allLoadedSelected = allIds.every((id) =>
        selectedTeachers.includes(id)
      );
      if (allLoadedSelected) {
        setSelectedTeachers((prev) =>
          prev.filter((id) => !allIds.includes(id))
        );
      } else {
        setSelectedTeachers((prev) => [...new Set([...prev, ...allIds])]);
      }
    } else if (category === "students") {
      const allLoadedSelected = allIds.every((id) =>
        selectedStudents.includes(id)
      );
      if (allLoadedSelected) {
        setSelectedStudents((prev) =>
          prev.filter((id) => !allIds.includes(id))
        );
      } else {
        setSelectedStudents((prev) => [...new Set([...prev, ...allIds])]);
      }
    }
  };

  const handleSelectOne = (category, id) => {
    if (category === "schools") {
      setSelectedSchools((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else if (category === "teachers") {
      setSelectedTeachers((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else if (category === "students") {
      setSelectedStudents((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      selectedSchools.length === 0 &&
      selectedTeachers.length === 0 &&
      selectedStudents.length === 0
    ) {
      alert("Please select at least one recipient.");
      return;
    }

    setIsSubmitting(true);
    const announcement = {
      title,
      subtitle,
      content,
      schoolIds: selectedSchools,
      studentIds: selectedStudents,
      teacherIds: selectedTeachers,
      scheduleTime: scheduleTime
        ? new Date(scheduleTime).toUTCString()
        : undefined,
    };

    if (announcement.schoolIds.length === 0) delete announcement.schoolIds;
    if (announcement.studentIds.length === 0) delete announcement.studentIds;
    if (announcement.teacherIds.length === 0) delete announcement.teacherIds;
    if (!announcement.scheduleTime) delete announcement.scheduleTime;

    try {
      await onSubmit(announcement);
      onClose();
      // Reset form
      setTitle("");
      setSubtitle("");
      setContent("");
      setScheduleTime("");
      setSelectedSchools([]);
      setSelectedStudents([]);
      setSelectedTeachers([]);
      setRecipientStates({
        schools: {
          data: [],
          page: 1,
          search: "",
          loading: false,
          hasMore: true,
        },
        teachers: {
          data: [],
          page: 1,
          search: "",
          loading: false,
          hasMore: true,
        },
        students: {
          data: [],
          page: 1,
          search: "",
          loading: false,
          hasMore: true,
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderSelectionList = (category, nameKey, selectedIds) => {
    const currentState = recipientStates[category];
    const items = currentState.data;

    return (
      <div className="flex flex-col h-64 border rounded-md bg-gray-50">
        {/* Search Bar */}
        <div className="p-2 border-b bg-white sticky top-0 z-10">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${category}...`}
              value={currentState.search}
              onChange={(e) => handleSearchChange(category, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit(e, category);
                }
              }}
              className="w-full text-sm border rounded-md p-2 pr-8 focus:outline-none focus:border-[#0530A1]"
            />
            {/* Search Icon or Button could go here */}
            <button
              type="button"
              onClick={(e) => handleSearchSubmit(e, category)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0530A1]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {items.length > 0 && (
            <label className="flex items-center space-x-2 p-2 border-b mb-2 cursor-pointer hover:bg-gray-100 rounded">
              <input
                type="checkbox"
                // Check if all *currently loaded* items are selected
                checked={
                  items.length > 0 &&
                  items.every((i) => selectedIds.includes(i._id))
                }
                onChange={() => handleSelectAll(category)}
                className="accent-[#0530A1]"
              />
              <span className="font-Outfit text-sm font-semibold text-[#272D37]">
                Select All Loaded
              </span>
            </label>
          )}

          {items.map((item) => (
            <label
              key={item._id}
              className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 rounded"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item._id)}
                onChange={() => handleSelectOne(category, item._id)}
                className="accent-[#0530A1]"
              />
              <span className="font-Outfit text-sm text-[#5F6D7E]">
                {category === "schools"
                  ? item.schoolName || "Unknown School"
                  : item.userId?.name || item[nameKey] || "Unknown"}
              </span>
            </label>
          ))}

          {currentState.loading && (
            <div className="py-2">
              <GenericLoadingSkeleton count={3} height={20} />
            </div>
          )}

          {!currentState.loading && items.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No data found
            </p>
          )}

          {!currentState.loading && currentState.hasMore && (
            <button
              type="button"
              onClick={() => handleLoadMore(category)}
              className="w-full py-2 text-xs text-[#0530A1] font-medium hover:bg-blue-50 rounded mt-2"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999]  fixed top-0 md:pb-[120px] -left-[20%] flex justify-center items-center">
      <div className="ml-[20%] h-[90%]  mt-[100px] bg-[#FFFFFF] p-6 rounded-[15px]  w-full md:w-[600px] flex flex-col">
        <span className=" w-full flex items-center justify-between shrink-0 pb-4 border-b border-[#EAEBF0]">
          <p className=" text-lg text-[#272D37] font-semibold font-Outfit">
            Make an Announcement
          </p>
          <img
            onClick={onClose}
            src={cross}
            className=" cursor-pointer"
            alt="Close"
          />
        </span>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden mt-6"
        >
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                />
              </label>
              <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
                Subtitle
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
                />
              </label>
            </div>

            <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
              Content
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                required
                className="text-[#272D37] font-normal font-Outfit text-sm mt-1 border p-2 rounded-md resize-none"
              ></textarea>
            </label>

            {/* Recipient Selection */}
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-[#272D37] font-Outfit">
                Select Recipients
              </span>
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-md mb-2">
                {["schools", "teachers", "students"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-sm font-medium font-Outfit rounded-md capitalize transition-colors ${
                      activeTab === tab
                        ? "bg-white text-[#0530A1] shadow-sm"
                        : "text-[#5F6D7E] hover:text-[#272D37]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "schools" &&
                renderSelectionList("schools", "schoolName", selectedSchools)}
              {activeTab === "teachers" &&
                renderSelectionList("teachers", "name", selectedTeachers)}
              {activeTab === "students" &&
                renderSelectionList("students", "name", selectedStudents)}

              <p className="text-xs font-Outfit text-gray-400 mt-1">
                Selected: {selectedSchools.length} Schools,{" "}
                {selectedTeachers.length} Teachers, {selectedStudents.length}{" "}
                Students
              </p>
            </div>

            <label className="flex flex-col text-sm text-[#5F6D7E] font-Outfit">
              Schedule Time
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="text-[#272D37] font-medium font-Outfit text-base border p-2 rounded-md mt-1"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#EAEBF0] shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="text-center text-sm font-Outfit font-medium text-gray-700 bg-gray-200 py-3 rounded-[10px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-3 rounded-[10px] disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
