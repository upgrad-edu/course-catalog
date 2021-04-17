import React, { useState } from "react";

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

const SignupForm = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordMouseDown = (event) => {
    event.preventDefault();
  };

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
            value={firstName}
            onChange={handleFirstNameChange}
            autoComplete="on"
            color="secondary"
          />
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupLastName" color="secondary">
            Last Name
          </InputLabel>
          <FilledInput
            id="signupLastName"
            value={lastName}
            onChange={handleLastNameChange}
            autoComplete="on"
            color="secondary"
          />
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupEmail" color="secondary">
            Email
          </InputLabel>
          <FilledInput
            id="signupEmail"
            type="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="on"
            color="secondary"
          />
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="signupPassword" color="secondary">
            Password
          </InputLabel>
          <FilledInput
            id="signupPassword"
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
        <FormControl variant="filled">
          <InputLabel htmlFor="signupConfirmPassword" color="secondary">
            Confirm Password
          </InputLabel>
          <FilledInput
            id="signupConfirmPassword"
            type={"password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            autoComplete="on"
            color="secondary"
          />
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="secondary"
        fullWidth={true}
        size="large"
        className={classes.formButton}
      >
        register me
      </Button>
    </form>
  );
};

export { SignupForm };
