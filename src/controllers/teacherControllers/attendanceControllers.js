import silentApi from "../../index/silent";
import api from "../../index/api";
import apiMultipart from "../../index/apiMultipart";

// GET /teachers/attendance
export const handleGetAttendance = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await silentApi(
      "GET",
      `/teachers/attendance?${queryString}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// POST /teachers/attendance
export const handleCreateAttendance = async (
  attendanceData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("POST", "/teachers/attendance", attendanceData);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// POST /teachers/attendance/bulk
export const handleBulkAttendance = async (formData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/teachers/attendance/bulk", formData);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// GET /teachers/attendance/summary
export const handleGetAttendanceSummary = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await silentApi(
      "GET",
      `/teachers/attendance/summary?${queryString}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// GET /teachers/attendance/export
export const handleExportAttendance = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await silentApi(
      "GET",
      `/teachers/attendance/export?${queryString}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
