import api from "../../index/api";

// Function to handle user login
export const handleUserLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/users/login", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get logged in user
export const handleGetLoggedinUser = async () => {
  try {
    const response = await api("GET", "/users/current-user");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle change user current password
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

// Function to update avatar
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
