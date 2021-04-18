import * as utils from "../../../utils";

const validateSignupForm = (values) => {
  let errors = {};

  /*
   Rule 1: firstName is required
   */
  if (!values.firstName.trim()) {
    errors.firstName = "Required";
  }

  /*
   Rule 2: lastName is required
   */
  if (!values.lastName.trim()) {
    errors.lastName = "Required";
  }

  /*
   Rule 3: email is required
   Rule 4: email should be valid
   */
  if (!values.email.trim()) {
    errors.email = "Required";
  } else if (!utils.checkValidEmail(values.email)) {
    errors.email = "Invalid email";
  }

  /*
   Rule 5: password is required
   Rule 6: password should be atleast 6 characters long
   */
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password should be atleast 6 characters long";
  }

  /*
   Rule 7: confirm password is required
   Rule 8: confirm password should be equal to password
   */
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default validateSignupForm;
