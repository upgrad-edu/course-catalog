import React, { useState, Fragment } from "react";

// imports for 3rd party libraries
import { useHistory } from "react-router-dom";

// imports for utils
import * as utils from "../../utils";

// imports for API methods
import * as userApi from "../../api/userApi";

// imports for MUI components
import { MuiTabs } from "../../components/MUI/MuiTabs";

// imports for custom components
import { LoginForm, SignupForm } from "./forms";

// imports for custom hooks
import useLoader from "../../hooks/useLoader";
import useNotification from "../../hooks/useNotification";

// imports for assets
import logo from "../../assets/logo.png";

// imports for styles
import { useStyles } from "./styles.js";

const OnboardPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { loader, isLoading, showLoader, hideLoader } = useLoader();
  const { notification, showNotification } = useNotification();

  const [tabValue, setCurrentTabIndex] = useState(0);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isSignupSucccessful, setIsSignupSuccessful] = useState(false);

  // Event handler triggered when a tab is changed
  const handleTabChange = (_, newTabValue) => {
    setCurrentTabIndex(newTabValue);
  };

  const { doLogin, doSignup } = userApi;

  // Function to call login API and pass success and failure callbacks to it
  const handleLogin = (values) => {
    showLoader();
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
        hideLoader();
        history.push("/home"); // redirect to home page on successful login
      },
      // failure callback
      (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
        hideLoader();
      }
    );
  };

  // Function to call signup API and pass success and failure callbacks to it
  const handleSignup = (values) => {
    showLoader();
    doSignup(
      values,
      // success callback
      (response) => {
        setCurrentTabIndex(0); // redirect to login tab when signup is successful
        hideLoader();

        // show the success message as notification to user
        showNotification("Signed up successfully!");

        setIsSignupSuccessful(true);
      },
      // failure callback
      (_, errorMessage) => {
        setApiErrorMessage(errorMessage);
        hideLoader();
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
          successHandler={(values) => handleLogin(values)}
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
          successHandler={(values) => handleSignup(values)}
          apiErrorMessage={apiErrorMessage}
          isSignupSucccessful={isSignupSucccessful}
          submitCallback={submitCallback}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <header className={classes.onboardPageHeader}>
        <img src={logo} alt="upGrad Logo" className={classes.logo} />
      </header>
      <main className={classes.onboardPageContent}>
        {isLoading ? (
          loader
        ) : (
          <div className={classes.onboardPageTabsContainer}>
            <MuiTabs
              tabValue={tabValue}
              handleTabChange={handleTabChange}
              data={tabsDetails}
            ></MuiTabs>
          </div>
        )}
        {notification}
      </main>
    </Fragment>
  );
};

export default OnboardPage;
