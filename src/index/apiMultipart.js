// apiMultipart.js
import config from "../config";
import SnackbarUtils from "../utils/snackbarUtils";
import { handleSuccess, handleError, handleFetchError } from "./api";

const apiMultipart = async (method, uri, formData = null) => {
  const url = `${config.baseURL}${uri}`;
  const token = localStorage.getItem("veclary_token");

  // For multipart/form-data, we let the browser set the Content-Type header.
  // We only need to set Authorization and Accept.
  const headers = {
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options = {
    method,
    headers,
    ...(formData && { body: formData }), // Body is the FormData object
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
    handleFetchError(err);
  }
};

export default apiMultipart;
