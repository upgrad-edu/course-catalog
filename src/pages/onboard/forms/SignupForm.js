import React, { useState } from "react";

// import for utils
import * as utils from "../../../utils";

// imports for MUI components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

// imports for custom hook
import useForm from "./useForm";
import validateSignupForm from "./validateSignupForm";

// imports for styles
import { useStyles } from "./styles.js";

const SignupForm = () => {
  const initialFormValues = {
    // the keys are similar to `name` attribute provided to form controls
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const submitCallback = () => {
    // reset all API errors when the Submit button is clicked
    setApiErrorMessage("");
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialFormValues,
    validateSignupForm,
    submitCallback,
    doSignup
  );
  const { firstName, lastName, email, password, confirmPassword } = values;

  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordMouseDown = (event) => {
    event.preventDefault();
  };

  async function doSignup() {
    if (email && password) {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const successCallback = (response) => {
        console.log("Signed up successfully!", response);
      };

      const failureCallback = (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
      };

      try {
        await utils.sendApiRequest(
          "POST",
          "/sign-up",
          null,
          userData,
          null,
          successCallback,
          failureCallback
        );
      } catch (error) {
        setApiErrorMessage("Some error occurred. Please retry.");
      }
    }
  }

  return (
    <form
      id="signupForm"
      noValidate
      autoComplete="off"
      className={classes.form}
    >
      <div className={classes.formControlsContainer}>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupFirstName" color="secondary">
            First Name
          </InputLabel>
          <FilledInput
            id="signupFirstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            autoComplete="on"
            color="secondary"
          />
          {errors.firstName && (
            <div className={classes.error}>{errors.firstName}</div>
          )}
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupLastName" color="secondary">
            Last Name
          </InputLabel>
          <FilledInput
            id="signupLastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            autoComplete="on"
            color="secondary"
          />
          {errors.lastName && (
            <div className={classes.error}>{errors.lastName}</div>
          )}
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupEmail" color="secondary">
            Email
          </InputLabel>
          <FilledInput
            id="signupEmail"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            autoComplete="on"
            color="secondary"
          />
          {errors.email && <div className={classes.error}>{errors.email}</div>}
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupPassword" color="secondary">
            Password
          </InputLabel>
          <FilledInput
            id="signupPassword"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            autoComplete="on"
            color="secondary"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPasswordChange}
                  onMouseDown={handleShowPasswordMouseDown}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <div className={classes.error}>{errors.password}</div>
          )}
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupConfirmPassword" color="secondary">
            Confirm Password
          </InputLabel>
          <FilledInput
            id="signupConfirmPassword"
            name="confirmPassword"
            type={"password"}
            value={confirmPassword}
            onChange={handleChange}
            autoComplete="on"
            color="secondary"
          />
          {errors.confirmPassword && (
            <div className={classes.error}>{errors.confirmPassword}</div>
          )}
        </FormControl>
        {apiErrorMessage && (
          <div className={classes.error}>{apiErrorMessage}</div>
        )}
      </div>
      <Button
        variant="contained"
        color="secondary"
        fullWidth={true}
        size="large"
        className={classes.formButton}
        onClick={handleSubmit}
      >
        register me
      </Button>
    </form>
  );
};

export { SignupForm };
