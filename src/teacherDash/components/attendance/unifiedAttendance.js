import { useState, useEffect, useMemo } from "react";

// Date utility functions (replacing date-fns)
const dateUtils = {
  format: (date, formatStr) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (formatStr === "yyyy-MM-dd") return `${year}-${month}-${day}`;
    if (formatStr === "MMM d")
      return `${monthNames[d.getMonth()]} ${d.getDate()}`;
    if (formatStr === "MMM d, yyyy")
      return `${monthNames[d.getMonth()]} ${d.getDate()}, ${year}`;
    if (formatStr === "EEE") return dayNames[d.getDay()];
    if (formatStr === "d") return d.getDate();
    if (formatStr === "w") return Math.ceil((d.getDate() + 6 - d.getDay()) / 7);
    if (formatStr === "yyyy") return year;
    return d.toISOString();
  },

  startOfWeek: (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
    return new Date(d.setDate(diff));
  },

  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  addWeeks: (date, weeks) => dateUtils.addDays(date, weeks * 7),
  subWeeks: (date, weeks) => dateUtils.addDays(date, -weeks * 7),

  isSameDay: (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  },

  isBefore: (date1, date2) => new Date(date1) < new Date(date2),
  isAfter: (date1, date2) => new Date(date1) > new Date(date2),

  getWeekDays: (startDate) => {
    return Array.from({ length: 7 }, (_, i) => dateUtils.addDays(startDate, i));
  },
};

const UnifiedAttendance = ({
  dashboard,
  onGetClasses,
  onGetAttendance,
  onSaveAttendance,
}) => {
  // State
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedTermId, setSelectedTermId] = useState("");
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dateUtils.startOfWeek(new Date())
  );
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState({});
  const [savingStates, setSavingStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [terms, setTerms] = useState(dashboard?.terms || []);

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await onGetClasses();
        if (response?.classes) {
          setClasses(response.classes);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [onGetClasses]);

  useEffect(() => {
    setTerms(dashboard?.terms || []);
  }, []);

  // Calculate week days
  const weekDays = useMemo(() => {
    return dateUtils.getWeekDays(currentWeekStart);
  }, [currentWeekStart]);

  // Load students when class changes
  useEffect(() => {
    if (!selectedClassId) {
      setStudents([]);
      return;
    }
    const selectedClass = classes.find((c) => c.classId === selectedClassId);
    setStudents(selectedClass?.students || []);
  }, [selectedClassId, classes]);

  // Fetch attendance when filters change
  useEffect(() => {
    if (!selectedClassId || !selectedTermId) return;

    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await onGetAttendance({
          classId: selectedClassId,
          termId: selectedTermId,
          startDate: dateUtils.format(weekDays[0], "yyyy-MM-dd"),
          endDate: dateUtils.format(weekDays[6], "yyyy-MM-dd"),
        });

        const records = {};
        if (response?.attendance) {
          response.attendance.forEach((studentAttendance) => {
            studentAttendance.weeks.forEach((week) => {
              week.days.forEach((day) => {
                const key = `${
                  studentAttendance.studentId
                }-${day.date.substring(0, 10)}`;
                records[key] = day.status;
              });
            });
          });
        }
        setAttendanceRecords(records || {});
        setUnsavedChanges({});
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [
    selectedClassId,
    selectedTermId,
    currentWeekStart,
    onGetAttendance,
    weekDays,
  ]);

  // Get status for a student on a specific date
  const getStatus = (studentId, date) => {
    const dateStr = dateUtils.format(date, "yyyy-MM-dd");
    const key = `${studentId}-${dateStr}`;

    if (unsavedChanges[key] !== undefined) {
      return unsavedChanges[key];
    }

    return attendanceRecords[key] || null;
  };

  // Check if a date-student combination is being saved
  const isSaving = (studentId, date) => {
    const dateStr = dateUtils.format(date, "yyyy-MM-dd");
    const key = `${studentId}-${dateStr}`;
    return savingStates[key] === true;
  };

  // Check if there are unsaved changes for a student-date
  const hasUnsavedChange = (studentId, date) => {
    const dateStr = dateUtils.format(date, "yyyy-MM-dd");
    const key = `${studentId}-${dateStr}`;
    return unsavedChanges[key] !== undefined;
  };

  // Toggle attendance status
  const handleToggleStatus = async (studentId, date) => {
    const dateStr = dateUtils.format(date, "yyyy-MM-dd");
    const key = `${studentId}-${dateStr}`;
    const currentStatus = getStatus(studentId, date);
    const newStatus = currentStatus === "present" ? "absent" : "present";

    // Optimistically update UI
    setUnsavedChanges((prev) => ({
      ...prev,
      [key]: newStatus,
    }));

    // Auto-save
    setSavingStates((prev) => ({ ...prev, [key]: true }));

    try {
      await onSaveAttendance({
        classId: selectedClassId,
        termId: selectedTermId,
        date: dateStr,
        records: [{ studentId, status: newStatus }],
      });

      // Move from unsaved to saved
      setAttendanceRecords((prev) => ({
        ...prev,
        [key]: newStatus,
      }));
      setUnsavedChanges((prev) => {
        const newUnsaved = { ...prev };
        delete newUnsaved[key];
        return newUnsaved;
      });
    } catch (error) {
      console.error("Failed to save attendance:", error);
      // Revert on error
      setUnsavedChanges((prev) => {
        const newUnsaved = { ...prev };
        delete newUnsaved[key];
        return newUnsaved;
      });
    } finally {
      setSavingStates((prev) => {
        const newSaving = { ...prev };
        delete newSaving[key];
        return newSaving;
      });
    }
  };

  // Navigate weeks
  const goToPreviousWeek = () => {
    const selectedTerm = terms.find((t) => t._id === selectedTermId);
    if (!selectedTerm) return;

    const newWeekStart = dateUtils.subWeeks(currentWeekStart, 1);
    const termStart = new Date(selectedTerm.startDate);

    if (!dateUtils.isBefore(newWeekStart, termStart)) {
      setCurrentWeekStart(newWeekStart);
    }
  };

  const goToNextWeek = () => {
    const selectedTerm = terms.find((t) => t._id === selectedTermId);
    if (!selectedTerm) return;

    const newWeekStart = dateUtils.addWeeks(currentWeekStart, 1);
    const termEnd = new Date(selectedTerm.endDate);

    if (!dateUtils.isAfter(newWeekStart, termEnd)) {
      setCurrentWeekStart(newWeekStart);
    }
  };

  const canGoToPrevious = () => {
    const selectedTerm = terms.find((t) => t._id === selectedTermId);
    if (!selectedTerm) return false;
    const termStart = new Date(selectedTerm.startDate);
    const prevWeek = dateUtils.subWeeks(currentWeekStart, 1);
    return !dateUtils.isBefore(prevWeek, termStart);
  };

  const canGoToNext = () => {
    const selectedTerm = terms.find((t) => t._id === selectedTermId);
    if (!selectedTerm) return false;
    const termEnd = new Date(selectedTerm.endDate);
    const nextWeek = dateUtils.addWeeks(currentWeekStart, 1);
    return !dateUtils.isAfter(nextWeek, termEnd);
  };

  // Check if date is today
  const isToday = (date) => dateUtils.isSameDay(date, new Date());

  return (
    <div className=" gap-6 flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between">
        {Object.keys(unsavedChanges).length > 0 && (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span>Auto-saving changes...</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-[#EAEBF0] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-Outfit text-sm font-medium text-[#5F6D7E] mb-2">
              Select Class
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setAttendanceRecords({});
                setUnsavedChanges({});
              }}
              className="w-full p-3 border border-[#DAE0E6] rounded-md font-Outfit text-sm focus:outline-none focus:ring-2 focus:ring-[#0530A1] focus:border-transparent"
            >
              <option value="">-- Select a Class --</option>
              {classes.map((cls) => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-Outfit text-sm font-medium text-[#5F6D7E] mb-2">
              Select Term
            </label>
            <select
              value={selectedTermId}
              onChange={(e) => {
                setSelectedTermId(e.target.value);
                setAttendanceRecords({});
                setUnsavedChanges({});
              }}
              className="w-full p-3 border border-[#DAE0E6] rounded-md font-Outfit text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#0530A1] focus:border-transparent"
            >
              <option value="">-- Select a Term --</option>
              {terms.map((term) => (
                <option key={term._id} value={term._id}>
                  {term.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      {selectedClassId && selectedTermId && (
        <div className="bg-white p-4 rounded-lg border border-[#EAEBF0] shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousWeek}
              disabled={!canGoToPrevious()}
              className="px-4 py-2 text-sm font-medium text-[#0530A1] hover:bg-[#F8F9FB] rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous Week
            </button>

            <div className="text-center">
              <p className="font-Outfit text-lg font-semibold text-[#272D37]">
                {dateUtils.format(weekDays[0], "MMM d")} -{" "}
                {dateUtils.format(weekDays[6], "MMM d, yyyy")}
              </p>
              <p className="font-Outfit text-sm text-[#5F6D7E]">
                Week {dateUtils.format(currentWeekStart, "w")} of{" "}
                {dateUtils.format(currentWeekStart, "yyyy")}
              </p>
            </div>

            <button
              onClick={goToNextWeek}
              disabled={!canGoToNext()}
              className="px-4 py-2 text-sm font-medium text-[#0530A1] hover:bg-[#F8F9FB] rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next Week →
            </button>
          </div>
        </div>
      )}

      {/* Attendance Grid */}
      {selectedClassId && selectedTermId ? (
        <div className="bg-white rounded-lg border border-[#EAEBF0] shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-[#0530A1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-Outfit text-[#5F6D7E]">
                Loading attendance...
              </p>
            </div>
          ) : students.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-Outfit text-[#5F6D7E]">
                No students in this class
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F9FB]">
                  <tr>
                    <th className="sticky left-0 bg-[#F8F9FB] px-6 py-3 text-left z-10">
                      <span className="font-Outfit text-sm font-semibold text-[#272D37]">
                        Student
                      </span>
                    </th>
                    {weekDays.map((day) => (
                      <th
                        key={day.toString()}
                        className="px-4 py-3 text-center min-w-[100px]"
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-Outfit text-xs font-medium text-[#5F6D7E]">
                            {dateUtils.format(day, "EEE")}
                          </span>
                          <span
                            className={`font-Outfit text-sm font-semibold mt-1 ${
                              isToday(day) ? "text-[#0530A1]" : "text-[#272D37]"
                            }`}
                          >
                            {dateUtils.format(day, "d")}
                          </span>
                          {isToday(day) && (
                            <span className="text-xs text-[#0530A1] font-medium">
                              Today
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEBF0]">
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-[#F8F9FB] transition-colors"
                    >
                      <td className="sticky left-0 bg-white px-4 py-2 z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br capitalize from-[#0530A1] to-[#0742C9] flex items-center justify-center text-white font-semibold text-xs">
                            {student.userId?.name?.charAt(0) || "?"}
                          </div>
                          <span className="font-Outfit text-xs font-medium text-[#272D37]">
                            {student.userId?.name || "N/A"}
                          </span>
                        </div>
                      </td>
                      {weekDays.map((day) => {
                        const status = getStatus(student._id, day);
                        const saving = isSaving(student._id, day);
                        const unsaved = hasUnsavedChange(student._id, day);

                        return (
                          <td
                            key={day.toString()}
                            className="px-2 py-2 text-center"
                          >
                            <button
                              onClick={() =>
                                handleToggleStatus(student._id, day)
                              }
                              disabled={saving}
                              className="relative group"
                            >
                              <div
                                className={`w-10 h-10 mx-auto rounded-lg border-2 flex items-center justify-center transition-all ${
                                  status === "present"
                                    ? "bg-green-50 border-green-500"
                                    : status === "absent"
                                    ? "bg-red-50 border-red-500"
                                    : "bg-gray-50 border-gray-300 hover:border-gray-400"
                                } ${
                                  saving
                                    ? "opacity-50 cursor-wait"
                                    : "cursor-pointer"
                                } ${
                                  unsaved
                                    ? "ring-2 ring-amber-400 ring-offset-1"
                                    : ""
                                }`}
                              >
                                {saving ? (
                                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : status === "present" ? (
                                  <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                ) : status === "absent" ? (
                                  <svg
                                    className="w-6 h-6 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                ) : (
                                  <span className="text-gray-400 text-xs">
                                    —
                                  </span>
                                )}
                              </div>

                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {status === "present"
                                  ? "Mark Absent"
                                  : status === "absent"
                                  ? "Mark Present"
                                  : "Mark Attendance"}
                                {unsaved && (
                                  <span className="text-amber-300">
                                    {" "}
                                    (unsaved)
                                  </span>
                                )}
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#EAEBF0] shadow-sm p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F8F9FB] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#5F6D7E]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="font-Outfit text-[#5F6D7E] text-lg">
              Select a class and term to view and mark attendance
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      {selectedClassId && selectedTermId && students.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-[#EAEBF0] shadow-sm">
          <div className="flex flex-wrap items-center gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-50 border-2 border-green-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-Outfit text-sm text-[#5F6D7E]">
                Present
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-50 border-2 border-red-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <span className="font-Outfit text-sm text-[#5F6D7E]">Absent</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-50 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">—</span>
              </div>
              <span className="font-Outfit text-sm text-[#5F6D7E]">
                Not Marked
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white border-2 border-amber-400 ring-2 ring-amber-400 ring-offset-1 rounded-lg"></div>
              <span className="font-Outfit text-sm text-[#5F6D7E]">
                Auto-saving
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedAttendance;
