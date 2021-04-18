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

// imports for styles
import { useStyles } from "./styles.js";

const LoginForm = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordMouseDown = (event) => {
    event.preventDefault();
  };

  const doLogin = async () => {
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
        console.error(errorMessage);
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
        console.error(error);
      }
    }
  };

  return (
    <form id="loginForm" noValidate autoComplete="off" className={classes.form}>
      <div className={classes.formControlsContainer}>
        <FormControl variant="filled">
          <InputLabel htmlFor="loginEmail" color="secondary">
            Email
          </InputLabel>
          <FilledInput
            id="loginEmail"
            type="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="on"
            color="secondary"
          />
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="loginPassword" color="secondary">
            Password
          </InputLabel>
          <FilledInput
            id="loginPassword"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
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
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="secondary"
        fullWidth={true}
        size="large"
        className={classes.formButton}
        onClick={doLogin}
      >
        log me in
      </Button>
    </form>
  );
};

export { LoginForm };
