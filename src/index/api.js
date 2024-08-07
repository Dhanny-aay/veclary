// api.js
import config from "../config";
import SnackbarUtils from "../utils/snackbarUtils";

const api = async (method, uri, body = null) => {
  const url = config.baseURL + uri;
  const token = localStorage.getItem("veclary_token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    const res = await response.json();

    if (response.ok) {
      if (res.accessToken) {
        localStorage.setItem("veclary_token", res.accessToken);
      }
      if (res.refreshToken) {
        localStorage.setItem("veclary_refresh_token", res.refreshToken);
      }
      if (res.message) {
        SnackbarUtils.success(res.message);
      }
      return res;
    } else {
      if (response.status === 403) {
        localStorage.removeItem("veclary_token");
        window.location = "/login";
      } else if (response.status === 409) {
        SnackbarUtils.error(
          res?.data ? res.data.error : "Something went wrong"
        );
        throw new Error(res?.data ? res.data.error : "Something went wrong");
      } else if (response.status === 422) {
        SnackbarUtils.error(
          res?.message ? res.message : "Something went wrong"
        );
        throw new Error(res?.message ? res.message : "Something went wrong");
      } else {
        SnackbarUtils.error(res?.message ? res.message : response.statusText);
        throw new Error(res?.message ? res.message : response.statusText);
      }
    }
  } catch (err) {
    SnackbarUtils.error("Fetch error: " + err.message);
    throw err;
  }
};

export default api;
