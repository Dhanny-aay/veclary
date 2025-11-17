import { useState, useEffect } from "react";
import {
  handleGetAttendance,
  handleCreateAttendance,
  handleBulkAttendance,
} from "../../../controllers/teacherControllers/attendanceControllers";
import SnackbarUtils from "../../../utils/snackbarUtils";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

export const useAttendanceFetch = (
  classId,
  termId,
  dateRange,
  customStart,
  customEnd
) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchAttendance = async () => {
    if (!classId) {
      SnackbarUtils.warning("Please select a class to view records.");
      return;
    }
    setLoading(true);
    setInitialLoad(false);

    const params = { classId, termId };

    switch (dateRange) {
      case "this_week":
        params.startDate = format(startOfWeek(new Date()), "yyyy-MM-dd");
        params.endDate = format(endOfWeek(new Date()), "yyyy-MM-dd");
        break;
      case "this_month":
        params.startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
        params.endDate = format(endOfMonth(new Date()), "yyyy-MM-dd");
        break;
      case "custom":
        if (customStart && customEnd) {
          params.startDate = customStart;
          params.endDate = customEnd;
        }
        break;
      default:
        break;
    }

    try {
      const response = await handleGetAttendance(params);
      setAttendance(response?.attendance || []); // Extract the 'attendance' array from the response
    } catch (error) {
      SnackbarUtils.error("Failed to fetch attendance records.");
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  return { attendance, loading, initialLoad, fetchAttendance };
};

export const useMarkAttendance = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const markAttendance = async (payload, onSuccess, onError) => {
    setIsSubmitting(true);
    try {
      await handleBulkAttendance(payload, onSuccess, onError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, markAttendance };
};
