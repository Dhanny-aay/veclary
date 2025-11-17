import { useState } from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";

const AttendanceFilters = ({
  classes,
  dashboard,
  onFetch,
  onFilterChange,
  initialFilters,
}) => {
  const [filters, setFilters] = useState(initialFilters);

  const today = new Date();
  const minDate = format(startOfMonth(today), "yyyy-MM-dd");
  const maxDate = format(endOfMonth(today), "yyyy-MM-dd");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // Notify parent of change for localStorage persistence
  };

  const handleReset = () => {
    const defaultFilters = {
      classId: "",
      termId: "",
      dateRange: "this_week",
      customStart: "",
      customEnd: "",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-[#EAEBF0] flex flex-col md:flex-row items-center gap-4">
      {/* Class Dropdown */}
      <div className="w-full md:w-1/4">
        <label className="font-Outfit text-sm font-medium text-[#5F6D7E]">
          Class
        </label>
        <select
          name="classId"
          value={filters.classId}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.classId} value={cls.classId}>
              {cls.className}
            </option>
          ))}
        </select>
      </div>

      {/* Term Dropdown */}
      <div className="w-full md:w-1/4">
        <label className="font-Outfit text-sm font-medium text-[#5F6D7E]">
          Term
        </label>
        <select
          name="termId"
          value={filters.termId}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm capitalize"
        >
          <option value="">Select a term</option>
          {dashboard?.terms?.map((term) => (
            <option key={term._id} value={term._id}>
              {term.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Dropdown */}
      <div className="w-full md:w-1/4">
        <label className="font-Outfit text-sm font-medium text-[#5F6D7E]">
          Date Range
        </label>
        <select
          name="dateRange"
          value={filters.dateRange}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
        >
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {/* Custom Date Inputs */}
      {filters.dateRange === "custom" && (
        <div className="w-full md:w-1/2 flex items-end gap-2">
          <div>
            <label className="font-Outfit text-sm font-medium text-[#5F6D7E]">
              Start
            </label>
            <input
              type="date"
              name="customStart"
              value={filters.customStart}
              onChange={handleChange}
              min={minDate}
              max={maxDate}
              className="w-full mt-1 p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
            />
          </div>
          <div>
            <label className="font-Outfit text-sm font-medium text-[#5F6D7E]">
              End
            </label>
            <input
              type="date"
              name="customEnd"
              value={filters.customEnd}
              onChange={handleChange}
              min={minDate}
              max={maxDate}
              className="w-full mt-1 p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="w-full md:w-auto flex items-end gap-2">
        <button
          onClick={handleReset}
          className="w-full md:w-auto bg-gray-200 text-gray-800 font-Outfit text-sm font-medium py-2 px-4 rounded-md"
        >
          Reset
        </button>
        <button
          onClick={() => onFetch(filters)}
          className="w-full md:w-auto bg-[#0530A1] text-white font-Outfit text-sm font-medium py-2 px-6 rounded-md"
        >
          View Records
        </button>
      </div>
    </div>
  );
};

export default AttendanceFilters;
