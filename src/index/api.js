// api.js
import config from "../config";
import SnackbarUtils from "../utils/snackbarUtils";

const api = async (method, uri, body = null) => {
  const url = `${config.baseURL}${uri}`;
  const token = localStorage.getItem("veclary_token");

  const headers = {
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      handleSuccess(data);
      return data;
    } else {
      const errorMessage =
        data?.error ||
        data?.data?.error ||
        data?.message ||
        response.statusText ||
        "Something went wrong";

      SnackbarUtils.error(errorMessage);
      handleError(response, data);

      throw new Error(errorMessage);
    }
  } catch (err) {
    if (err.message.startsWith("Fetch error")) {
      handleFetchError(err);
    } else {
      throw err;
    }
  }
};

export const handleSuccess = (data) => {
  if (data.accessToken) {
    localStorage.setItem("veclary_token", data.accessToken);
  }
  if (data.refreshToken) {
    localStorage.setItem("veclary_refresh_token", data.refreshToken);
  }
  if (data.message) {
    SnackbarUtils.success(data.message);
  }
};

export const handleError = (response, data) => {
  switch (response.status) {
    case 403:
      localStorage.removeItem("veclary_token");
      window.location = "/login";
      break;

    case 422:
    case 409:
    default:
  }
};

export const handleFetchError = (err) => {
  SnackbarUtils.error(`Fetch error: ${err.message}`);
  throw err;
};

export default api;
