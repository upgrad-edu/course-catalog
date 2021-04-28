import React, { useState, Fragment } from "react";

// imports for MUI components
import { MuiTabs } from "../../components/MUI/MuiTabs";

// imports for custom components
import { LoginForm, SignupForm } from "./forms";

// imports for custom hooks
import useLoader from "../../hooks/useLoader";
import useNotification from "../../hooks/useNotification";
import { useAuth } from "../../contexts/AuthContext";

// imports for assets
import logo from "../../assets/logo.png";

// imports for styles
import { useStyles } from "./styles.js";

const OnboardPage = () => {
  const classes = useStyles();
  const { loader, isLoading } = useLoader();
  const { notification } = useNotification();
  const { currentUser, login, signup } = useAuth();

  const [tabValue, setCurrentTabIndex] = useState(0);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isSignupSucccessful, setIsSignupSuccessful] = useState(false);

  // Event handler triggered when a tab is changed
  const handleTabChange = (_, newTabValue) => {
    setCurrentTabIndex(newTabValue);
  };

  // array consisting of details of tabs to be displayed
  const tabsDetails = [
    {
      id: "login",
      label: "login",
      children: (
        <LoginForm
          successHandler={(values) => login(values)}
          isLoginSuccessful={currentUser ? true : false}
        />
      ),
    },
    {
      id: "signup",
      label: "signup",
      children: (
        <SignupForm
          successHandler={(values) => signup(values)}
          isSignupSucccessful={isSignupSucccessful}
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
