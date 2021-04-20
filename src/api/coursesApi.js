import * as utilsApi from "./utils-api";

/**
 * Function to search for a course
 * @param {String} title - substring which needs to be searched in course title
 * @param {Function} successCallback - callback method to be called when API succeeds
 * @param {Function} failureCallback - callback method to be called when API fails
 */
export async function searchCourseByTitle(
  title,
  successCallback,
  failureCallback
) {
  try {
    await utilsApi.sendApiRequest(
      utilsApi.constants.HTTP_METHOD.GET,
      "/tutorials",
      null,
      { title: title },
      null,
      null,
      successCallback,
      failureCallback
    );
  } catch (error) {
    if (failureCallback) {
      failureCallback(error);
    }
  }
}

/**
 * Function to get all courses within a given category
 * @param {String} category - category string corresponding to which courses are to be fetched
 * @param {Function} successCallback - callback method to be called when API succeeds
 * @param {Function} failureCallback - callback method to be called when API fails
 */
export async function getCoursesByCategory(
  category,
  successCallback,
  failureCallback
) {
  try {
    await utilsApi.sendApiRequest(
      utilsApi.constants.HTTP_METHOD.GET,
      "/tutorials",
      ["category"],
      { category: category },
      null,
      null,
      successCallback,
      failureCallback
    );
  } catch (error) {
    if (failureCallback) {
      failureCallback(error);
    }
  }
}
