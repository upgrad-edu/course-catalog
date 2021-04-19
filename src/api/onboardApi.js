import * as utilsApi from "./utils-api";

/**
 * Function to log into the application
 * @param {Object}
 * 		email key
 * 		password key
 */
export async function doLogin(
  { email, password },
  successCallback,
  failureCallback
) {
  if (email && password) {
    const userData = {
      email: email,
      password: password,
    };

    try {
      await utilsApi.sendApiRequest(
        utilsApi.constants.HTTP_METHOD.POST,
        "/login",
        null,
        null,
        userData,
        null,
        successCallback,
        failureCallback
      );
    } catch (error) {
      failureCallback(error);
    }
  }
}

/**
 * Function to sign up in the application
 * @param {Object}
 * 		firstName key
 * 		lastName key
 * 		email key
 * 		password key
 */
export async function doSignup(
  { firstName, lastName, email, password },
  successCallback,
  failureCallback
) {
  if (email && password) {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      await utilsApi.sendApiRequest(
        utilsApi.constants.HTTP_METHOD.POST,
        "/sign-up",
        null,
        null,
        userData,
        null,
        successCallback,
        failureCallback
      );
    } catch (error) {
      failureCallback(error);
    }
  }
}
