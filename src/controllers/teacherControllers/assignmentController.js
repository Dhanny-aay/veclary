import api from "../../index/api";
import silentApi from "../../index/silent";

// POST /teachers/assignments: Create  Assignment
export const handleCreateAssignment = async (
  assignmentData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("POST", "/teachers/assignments", assignmentData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// GET /teachers/assignments/{id}: Get Assignment by id
export const handleGetAssignmentById = async (assignmentId) => {
  try {
    const response = await silentApi(
      "GET",
      `/teachers/assignments/${assignmentId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// PATCH /teachers/assignments/{id}: update assignment by id
export const handleUpdateAssignment = async (
  assignmentId,
  assignmentData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/teachers/assignments/${assignmentId}`,
      assignmentData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// DELETE /teachers/assignments/{id}: delete assignment by id
export const handleDeleteAssignment = async (
  assignmentId,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "DELETE",
      `/teachers/assignments/${assignmentId}`
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// GET /teachers/assignments/{teacherId}: Get assignments by teacher id
export const handleGetAssignmentsByTeacher = async (teacherId) => {
  try {
    const response = await silentApi(
      "GET",
      `/teachers/assignments/${teacherId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// GET /teachers/assignments/{classId}: Get assignments by class id
export const handleGetAssignmentsByClass = async (classId) => {
  try {
    const response = await silentApi("GET", `/teachers/assignments/${classId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
