import React, { useState } from "react";

// imports for utils
import * as utils from "../../utils";

// imports for API methods
import * as onboardApi from "../../api/onboardApi";

// imports for MUI components
import { MuiTabs } from "../../components/MUI/MuiTabs";

// imports for custom components
import { LoginForm, SignupForm } from "./forms";

// imports for assets
import logo from "../../assets/logo.png";

// imports for styles
import { useStyles } from "./styles.js";

const OnboardPage = () => {
  const classes = useStyles();

  const [tabValue, setCurrentTabIndex] = useState(0);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isSignupSucccessful, setIsSignupSuccessful] = useState(false);

  // Event handler triggered when a tab is changed
  const handleTabChange = (_, newTabValue) => {
    setCurrentTabIndex(newTabValue);
  };

  const { doLogin, doSignup } = onboardApi;

  // Function to call login API and pass success and failure callbacks to it
  const handleLogin = (values) => {
    doLogin(
      values,
      // success callback
      (response) => {
        console.log("Logged in successfully!");
        setIsLoginSuccessful(true);
        utils.setLocalStorage(
          utils.constants.USER_KEY_LOCAL_STORAGE,
          response.data
        );
      },
      // failure callback
      (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
      }
    );
  };

  // Function to call signup API and pass success and failure callbacks to it
  const handleSignup = (values) => {
    doSignup(
      values,
      // success callback
      (response) => {
        console.log("Signed up successfully!", response);
        setCurrentTabIndex(0); // redirect to login tab when signup is successful
        setIsSignupSuccessful(true);
      },
      // failure callback
      (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
      }
    );
  };

  // Function to be invoked after the Submit button is clicked on form
  const submitCallback = () => {
    // reset all API errors when the Submit button is clicked
    setApiErrorMessage("");
  };

  // array consisting of details of tabs to be displayed
  const tabsDetails = [
    {
      id: "login",
      label: "login",
      children: (
        <LoginForm
          success={(values) => handleLogin(values)}
          apiErrorMessage={apiErrorMessage}
          isLoginSuccessful={isLoginSuccessful}
          submitCallback={submitCallback}
        />
      ),
    },
    {
      id: "signup",
      label: "signup",
      children: (
        <SignupForm
          success={(values) => handleSignup(values)}
          apiErrorMessage={apiErrorMessage}
          isSignupSucccessful={isSignupSucccessful}
          submitCallback={submitCallback}
        />
      ),
    },
  ];

  return (
    <div className={classes.loginPage}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="upGrad Logo" className={classes.logo} />
      </div>
      <div className={classes.loginPageTabs}>
        <MuiTabs
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          tabsDetails={tabsDetails}
        ></MuiTabs>
      </div>
    </div>
  );
};

export { OnboardPage };
