import api from "../../index/api";

// Function to handle teacher creation
export const handleAddTeacher = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/teachers", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get School teachers
export const handleGetSchoolTeachers = async () => {
  try {
    const response = await api("GET", "/schools/teachers");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to delete teacher
// export const handleDeleteTeacher = async (teacherID, onSuccess, onError) => {
//   try {
//     const response = await api("DELETE", `/schools/teachers/${teacherID}`);
//     if (onSuccess) {
//       onSuccess(response);
//     }
//   } catch (error) {
//     if (onError) {
//       onError(error);
//     }
//   }
// };

// Function to get teacher by ID
export const handleGetTeacherById = async (teacherID) => {
  try {
    const response = await api("GET", `/schools/teachers/${teacherID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to update teacher by ID
export const handleUpdateTeacherById = async (
  teacherID,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/schools/teachers/${teacherID}`,
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
