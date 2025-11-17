// silent.js
import config from "../config";

const silentApi = async (method, uri, body = null) => {
  const url = `${config.baseURL}${uri}`;
  const token = localStorage.getItem("veclary_token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      handleSuccess(data);
      return data;
    } else {
      handleError(response, data);
    }
  } catch (err) {
    throw err;
  }
};

const handleSuccess = (data) => {
  if (data.accessToken) {
    localStorage.setItem("veclary_token", data.accessToken);
  }
  if (data.refreshToken) {
    localStorage.setItem("veclary_refresh_token", data.refreshToken);
  }
};

const handleError = (response, data) => {
  const errorMessage =
    data?.error ||
    data?.data?.error ||
    data?.message ||
    response.statusText ||
    "Something went wrong";

  switch (response.status) {
    case 403:
      localStorage.removeItem("veclary_token");
      window.location = "/login";
      break;
    case 409:
      const message =
        errorMessage === "Email Address already Exists"
          ? "This email is already in use. Please use a different email."
          : errorMessage;
      throw new Error(message);
    case 422:
      throw new Error(errorMessage);
    default:
      throw new Error(errorMessage);
  }
};

export default silentApi;
