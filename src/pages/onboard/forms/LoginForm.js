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
import validateLoginForm from "./validateLoginForm";

// imports for styles
import { useStyles } from "./styles.js";

const LoginForm = () => {
  const initialFormValues = {
    // the keys are similar to `name` attribute provided to form controls
    email: "",
    password: "",
  };
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const submitCallback = () => {
    // reset all API errors when the Submit button is clicked
    setApiErrorMessage("");
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialFormValues,
    validateLoginForm,
    submitCallback,
    doLogin
  );
  const { email, password } = values;

  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordMouseDown = (event) => {
    event.preventDefault();
  };

  async function doLogin() {
    if (email && password) {
      const userData = {
        email: email,
        password: password,
      };

      const successCallback = (response) => {
        console.log("Logged in successfully!");
        utils.setLocalStorage(
          utils.CONSTANTS.USER_KEY_LOCAL_STORAGE,
          response.data
        );
      };

      const failureCallback = (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
      };

      try {
        await utils.sendApiRequest(
          "POST",
          "/login",
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
    <form id="loginForm" noValidate autoComplete="off" className={classes.form}>
      <div className={classes.formControlsContainer}>
        <FormControl variant="filled">
          <InputLabel htmlFor="loginEmail" color="secondary">
            Email
          </InputLabel>
          <FilledInput
            id="loginEmail"
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
          <InputLabel htmlFor="loginPassword" color="secondary">
            Password
          </InputLabel>
          <FilledInput
            id="loginPassword"
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
        {apiErrorMessage && (
          <div className={`${classes.error} ${classes.centerAlignedText}`}>
            {apiErrorMessage}
          </div>
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
        log me in
      </Button>
    </form>
  );
};

export { LoginForm };
