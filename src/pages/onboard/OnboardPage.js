import React, { useState, Fragment } from "react";

// imports for 3rd party libraries
import { useHistory } from "react-router-dom";

// imports for utils
import * as utils from "../../utils";

// imports for API methods
import * as onboardApi from "../../api/onboardApi";

// imports for MUI components
import { MuiTabs } from "../../components/MUI/MuiTabs";

// imports for custom components
import { LoginForm, SignupForm } from "./forms";
import { Loader } from "../../components/UI/Loader";

// imports for assets
import logo from "../../assets/logo.png";

// imports for styles
import { useStyles } from "./styles.js";

const OnboardPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [tabValue, setCurrentTabIndex] = useState(0);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isSignupSucccessful, setIsSignupSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Event handler triggered when a tab is changed
  const handleTabChange = (_, newTabValue) => {
    setCurrentTabIndex(newTabValue);
  };

  const { doLogin, doSignup } = onboardApi;

  // Function to call login API and pass success and failure callbacks to it
  const handleLogin = (values) => {
    setIsLoading(true);
    doLogin(
      values,
      // success callback
      (response) => {
        setIsLoginSuccessful(true);
        // set logged-in user's details in local storage
        utils.setLocalStorage(
          utils.constants.USER_KEY_LOCAL_STORAGE,
          response.data
        );
        setIsLoading(false);
        history.push("/home"); // redirect to home page on successful login
      },
      // failure callback
      (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
        setIsLoading(false);
      }
    );
  };

  // Function to call signup API and pass success and failure callbacks to it
  const handleSignup = (values) => {
    setIsLoading(true);
    doSignup(
      values,
      // success callback
      (response) => {
        console.log("Signed up successfully!", response);
        setCurrentTabIndex(0); // redirect to login tab when signup is successful
        setIsLoading(false);
        setIsSignupSuccessful(true);
      },
      // failure callback
      (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
        setIsLoading(false);
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
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </div>
  );
};

export { OnboardPage };
