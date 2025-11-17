import { useState, useEffect, useMemo } from "react";
import {
  format,
  parseISO,
  eachDayOfInterval,
  eachWeekOfInterval,
  getDay, // To determine the day of the week (0 for Sunday)
  isSameMonth,
} from "date-fns";
import SnackbarUtils from "../../../utils/snackbarUtils";
import { useMarkAttendance } from "./useAttendance";
import nofeed from "../assets/nofeed.svg";

const MarkAttendance = ({ classes, dashboard, loading }) => {
  const [selectedClassId, setSelectedClassId] = useState(
    () => localStorage.getItem("selectedClassId_mark") || ""
  );
  const [selectedTermId, setSelectedTermId] = useState("");
  const [students, setStudents] = useState([]);
  // The state now holds a nested object: { studentId: { 'YYYY-MM-DD': 'present'/'absent' } }
  const [records, setRecords] = useState({});
  const { isSubmitting, markAttendance } = useMarkAttendance();

  useEffect(() => {
    localStorage.setItem("selectedClassId_mark", selectedClassId);
    const selectedClass = classes.find((c) => c.classId === selectedClassId);
    const studentList = selectedClass?.students || [];
    setStudents(studentList);

    // Initialize records
    setRecords({});
  }, [selectedClassId, classes]);

  // Generate the weeks and days for the table header
  const { weeks, days } = useMemo(() => {
    const selectedTerm = dashboard?.terms?.find(
      (term) => term._id === selectedTermId
    );

    if (!selectedTerm) {
      return { weeks: [], days: [] };
    }

    const termStart = parseISO(selectedTerm.startDate);
    const termEnd = parseISO(selectedTerm.endDate);

    // Get the start of each week (Sunday) within the term interval
    const weekStarts = eachWeekOfInterval(
      { start: termStart, end: termEnd },
      { weekStartsOn: 0 } // Sunday
    );

    const weeksData = weekStarts.map((weekStart, index) => {
      const weekNumber = index + 1;
      const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000); // Add 6 days to get the full week

      const allDaysInWeek = eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
      });

      // Create a more descriptive label
      const startDay = format(weekStart, "d");
      const endDay = format(weekEnd, "d");
      const startMonth = format(weekStart, "MMM");
      const endMonth = format(weekEnd, "MMM");
      const year = format(weekStart, "yyyy");

      const monthDisplay = isSameMonth(weekStart, weekEnd)
        ? startMonth
        : `${startMonth}/${endMonth}`;

      const label = `Week ${weekNumber} (${startDay}-${endDay} ${monthDisplay} ${year})`;

      return {
        label: label,
        days: allDaysInWeek,
      };
    });

    return {
      weeks: weeksData,
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  }, [selectedTermId, dashboard?.terms]);

  const handleStatusChange = (studentId, date, currentStatus) => {
    const newStatus = currentStatus === "present" ? "absent" : "present";
    setRecords((prev) => {
      const studentRecords = prev[studentId] || {};
      return {
        ...prev,
        [studentId]: {
          ...studentRecords,
          [format(date, "yyyy-MM-dd")]: newStatus,
        },
      };
    });
  };

  const handleSubmit = () => {
    if (!selectedClassId || !selectedTermId) {
      SnackbarUtils.warning("Please select a class with students.");
      return;
    }

    // Flatten the records state into the required payload format
    const payloadRecords = Object.entries(records).flatMap(
      ([studentId, dateStatuses]) =>
        Object.entries(dateStatuses).map(([date, status]) => ({
          studentId,
          status,
          date,
        }))
    );

    if (payloadRecords.length === 0) {
      SnackbarUtils.warning("No attendance has been marked.");
      return;
    }

    const payload = {
      classId: selectedClassId,
      termId: selectedTermId,
      date: format(new Date(), "yyyy-MM-dd"), // Reference date, backend might ignore this
      records: payloadRecords,
    };

    markAttendance(
      payload,
      () => SnackbarUtils.success("Attendance submitted successfully!"),
      (err) => SnackbarUtils.error(err.message || "Submission failed.")
    );
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Class and Term Selection */}
      {loading ? (
        <div className="bg-white p-4 rounded-lg border border-[#EAEBF0] text-center">
          <p className="font-Outfit text-[#5F6D7E]">Loading classes...</p>
        </div>
      ) : classes.length === 0 || !dashboard?.terms?.length ? (
        <div className="bg-white p-4 rounded-lg border border-[#EAEBF0] text-center">
          <p className="font-Outfit text-[#5F6D7E]">
            {classes.length === 0
              ? "No classes available to mark attendance."
              : "No terms available to mark attendance."}
          </p>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg border border-[#EAEBF0] flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2">
            <label className="font-Outfit text-sm font-medium text-[#5F6D7E]">
              Select Class
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full mt-1 p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
            >
              <option value="">-- Select a Class --</option>
              {classes.map((cls) => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <label className="font-Outfit text-sm font-medium text-[#5F6D7E]">
              Select Term
            </label>
            <select
              value={selectedTermId}
              onChange={(e) => setSelectedTermId(e.target.value)}
              className="w-full mt-1 p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm capitalize"
            >
              <option value="">-- Select a Term --</option>
              {dashboard?.terms?.map((term) => (
                <option key={term._id} value={term._id}>
                  {term.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2: Student List and Marking Grid */}
      {selectedClassId && selectedTermId ? (
        <>
          <div className="border border-[#EAEBF0] rounded-[10px] w-full">
            {students.length > 0 ? (
              <div className="overflow-x-auto px-3">
                <table className="table-auto border-collapse font-Outfit text-[#5F6D7E]">
                  <thead>
                    <tr>
                      <th className="border-b border-[#EAEBF0] px-4 py-2">
                        S/N
                      </th>
                      <th className="border-b border-[#EAEBF0] px-8 py-2">
                        Student Name
                      </th>
                      {weeks.map(({ label, days: weekDays }) => (
                        <th
                          key={label}
                          className="border-b border-[#EAEBF0] px-4 py-2"
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-xs whitespace-nowrap">
                              {label}
                            </span>
                            <div className="flex flex-row">
                              {days.map((dayName, dayIndex) => (
                                <span
                                  key={dayIndex}
                                  className="w-10 text-center text-xs text-[#929292]"
                                >
                                  {dayName}
                                </span>
                              ))}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student._id}>
                        <td className="border-y border-[#EAEBF0] px-4 py-2">
                          {(index + 1).toString().padStart(2, "0")}
                        </td>
                        <td className="border-y border-[#EAEBF0] text-sm text-[#272D37] font-medium px-8 py-2">
                          <div className="flex flex-row items-center space-x-3">
                            <span className="w-10 h-10 rounded-md bg-[#f8f8f8]"></span>
                            <p className="text-xs">
                              {student.userId?.name || "N/A"}
                            </p>
                          </div>
                        </td>
                        {weeks.map(({ label, days: weekDays }) => (
                          <td
                            key={`${student._id}-${label}`}
                            className="border-y border-[#EAEBF0] px-4 py-2"
                          >
                            <div className="flex flex-row justify-center">
                              {Array(7)
                                .fill(0)
                                .map((_, dayIndex) => {
                                  const dayOfMonth = weeks
                                    .find((w) => w.label === label)
                                    ?.days.find((d) => getDay(d) === dayIndex);
                                  if (!dayOfMonth) {
                                    return (
                                      <div
                                        key={dayIndex}
                                        className="w-10 h-5"
                                      ></div>
                                    );
                                  }
                                  const dateString = format(
                                    dayOfMonth,
                                    "yyyy-MM-dd"
                                  );
                                  const status =
                                    records[student._id]?.[dateString] ||
                                    "absent";
                                  return (
                                    <label
                                      key={dayIndex}
                                      className="flex flex-col items-center w-10"
                                    >
                                      <span className="text-xs text-[#929292]">
                                        {format(dayOfMonth, "d")}
                                      </span>
                                      <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        checked={status === "present"}
                                        onChange={() =>
                                          handleStatusChange(
                                            student._id,
                                            dayOfMonth,
                                            status
                                          )
                                        }
                                      />
                                    </label>
                                  );
                                })}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 font-Outfit text-[#5F6D7E]">
                No students found in this class.
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#0530A1] text-white font-semibold py-2 px-6 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Attendance"}
            </button>
          </div>
        </>
      ) : (
        <div className="py-20 text-center">
          <img src={nofeed} alt="Empty" className="w-24 h-24 mx-auto" />
          <p className="font-Outfit text-[#5F6D7E] mt-4">
            Please select a class and term to mark attendance.
          </p>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
