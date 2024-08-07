import api from "../../index/api";

// Function to handle user registration
export const handleStudentRegister = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/students/register", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle user login
export const handleStudentLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/students/login", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get user profile
export const handleGetStudentProfile = async () => {
  try {
    const response = await api("GET", "/students/profile");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle user profile update
export const handleStudentProfileUpdate = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("PATCH", "/students/profile", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle change current password
export const handleChangeCurrPassword = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("POST", "/users/change-password", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle forgot password
export const handleForgotPassword = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/users/forgot-password", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle forgot password
export const handleAvatarUpload = async (userData, onSuccess, onError) => {
  try {
    const response = await api("PATCH", "/users/avatar", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// refreshTokenController
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("veclary_refresh_token");

  if (!refreshToken) {
    window.location = "/login";
    return;
  }

  try {
    const response = await api("POST", "/users/refresh-token", {
      refreshToken: refreshToken,
    });

    if (response.accessToken && response.refreshToken) {
      const { accessToken, refreshToken: newRefreshToken } = response;
      localStorage.setItem("veclary_token", accessToken);
      localStorage.setItem("veclary_refresh_token", newRefreshToken);
    } else {
      console.error("Failed to refresh token: Invalid response structure");
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
  }
};
