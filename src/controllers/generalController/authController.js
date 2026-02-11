import silentApi from "../../index/silent";
import api from "../../index/api";
const token = localStorage.getItem("veclary_token");

// Function to handle user logout
export const handleUserLogout = () => {
  localStorage.removeItem("veclary_token");
  localStorage.removeItem("veclary_refresh_token");
  window.location.href = "/";
};

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
    const response = await silentApi("GET", "/users/current-user");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle change user current password
export const handleChangeCurrPassword = async (
  userData,
  onSuccess,
  onError,
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

// // Function to update avatar
// export const handleAvatarUpload = async (userData, onSuccess, onError) => {
//   try {
//     const response = await api("PATCH", "/users/avatar", userData);
//     onSuccess(response);
//   } catch (error) {
//     if (onError) {
//       onError(error);
//     }
//   }
// };

export const handleAvatarUpload = async (formData, onSuccess, onError) => {
  try {
    const response = await fetch(
      "https://backend-pil9.onrender.com/api/v1/users/avatar",
      {
        method: "PATCH",
        body: formData, // Send formData, not a JSON object
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    onError(error);
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
    const response = await silentApi("POST", "/users/refresh-token", {
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

// Function to verify email
export const handleVerifyEmail = async (token, onSuccess, onError) => {
  try {
    const response = await api("GET", `/users/verify-email/${token}`);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to resend email verification
export const handleResendEmailVerification = async (
  userData,
  onSuccess,
  onError,
) => {
  try {
    const response = await api(
      "POST",
      "/users/resend-email-verification",
      userData,
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to verify reset password token
export const handleVerifyResetToken = async (token, onSuccess, onError) => {
  try {
    const response = await api("GET", `/users/verify-token/${token}`);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to reset password
export const handleResetPassword = async (
  token,
  userData,
  onSuccess,
  onError,
) => {
  try {
    const response = await api(
      "POST",
      `/users/reset-password/${token}`,
      userData,
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
