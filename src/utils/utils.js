import axios from "../axiosConfig";

/**
 * Function to check if datatype of a given value is of reference type
 * @param {*} value - value to be checked
 * @returns {Boolean} - true if the given value is reference type; false otherwise
 */
const isReferenceType = (value) => {
  if (value) {
    return typeof value === "object" || typeof value === "function";
  }
  return false;
};

/**
 * Function to build URL parameters and append them to the given URL
 * @param {String} requestUrl - string containing the request URL
 * @param {Object} urlParameters - object containing the key-value pairs of the URL parameters
 * @returns {String} URI-encoded string representing complete URL along with the URL parameters
 */
const buildUrlWithParameters = (requestUrl, urlParameters) => {
  if (!requestUrl) {
    return ""; // DOES NOT calculate & append urlParameters string if requestUrl is not present
  } else {
    if (urlParameters) {
      let parametersString = "";
      for (let key in urlParameters) {
        if (parametersString !== "") {
          parametersString += "&";
        }
        parametersString += key + "=" + encodeURIComponent(urlParameters[key]);
      }
      requestUrl += "?" + parametersString;
    }
    return requestUrl;
  }
};

/**
 * Function to send an API request via Axios
 * @param {String} requestMethod - HTTP method
 * @param {String} requestUrl - URL to send request to
 * @param {Object} urlParameters - URL parameters to be attached to request URL
 * @param {Object} requestDataBody - Data to be sent as body along with request
 * @param {Object} requestHeaders - Request headers to be sent along with request
 * @param {Function} successCallback - callback function to be invoked if the request succeeds
 * @param {Function} failureCallback - callback function to be invoked if the request fails
 */
export const sendApiRequest = async (
  requestMethod,
  requestUrl,
  urlParameters,
  requestDataBody,
  requestHeaders,
  successCallback,
  failureCallback
) => {
  const url = buildUrlWithParameters(requestUrl, urlParameters);
  try {
    const response = await axios({
      method: requestMethod,
      url: url,
      data: requestDataBody,
      headers: requestHeaders,
    });
    if (response && response.statusText === "OK") {
      if (successCallback) {
        successCallback(response);
      }
    }
  } catch (error) {
    // control comes here when a request was made and the server responded with a status code that falls out of the range of 2xx
    if (failureCallback) {
      if (error && error.request && error.request.responseText) {
        const errorMessage = JSON.parse(error.request.responseText).message;
        failureCallback(error, errorMessage);
      } else {
        failureCallback(error);
      }
      return;
    }
    throw error;
  }
};

/**
 * Function to set local storage with given key-value pair
 * @param {*} key - unique identifier (datatype is not reference type)
 * @param {*} value - value corresponding to the key
 */
export const setLocalStorage = (key, value) => {
  if (!isReferenceType(key) && value) {
    if (isReferenceType(value)) {
      localStorage.setItem(key.toString(), JSON.stringify(value));
    } else {
      localStorage.setItem(key.toString(), value.toString());
    }
  }
};
