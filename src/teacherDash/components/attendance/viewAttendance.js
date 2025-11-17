import { useState } from "react";
import { useAttendanceFetch } from "./useAttendance";
import AttendanceFilters from "./attendanceFilters";
import AttendanceTable from "./attendanceTable";
// import AttendanceFilters from "./attendanceFilters";
// import AttendanceTable from "./attendanceTable";

const ViewAttendance = ({ classes, dashboard }) => {
  // State to hold filter values from the child component
  const [filters, setFilters] = useState({
    classId: localStorage.getItem("selectedClassId_view") || "",
    termId: localStorage.getItem("selectedTermId_view") || "",
    dateRange: localStorage.getItem("dateRange_view") || "this_week",
    customStart: "",
    customEnd: "",
  });

  const { attendance, loading, initialLoad, fetchAttendance } =
    useAttendanceFetch(
      filters.classId,
      filters.termId,
      filters.dateRange,
      filters.customStart,
      filters.customEnd
    );

  const handleFetch = (newFilters) => {
    setFilters(newFilters);
    // The actual fetch is triggered by the useEffect in the hook,
    // but we call this to ensure the state is updated and to be explicit.
    // The hook will re-run when its dependencies (the filters) change.
    // We need a slight delay to allow state to update before fetching.
    setTimeout(() => fetchAttendance(), 0);
  };

  // Persist filters to localStorage whenever they change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem("selectedClassId_view", newFilters.classId);
    localStorage.setItem("selectedTermId_view", newFilters.termId);
    localStorage.setItem("dateRange_view", newFilters.dateRange);
  };

  return (
    <div className="space-y-6">
      <AttendanceFilters
        classes={classes}
        dashboard={dashboard}
        onFetch={handleFetch}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />
      <AttendanceTable
        attendance={attendance}
        loading={loading}
        initialLoad={initialLoad}
      />
    </div>
  );
};

export default ViewAttendance;
