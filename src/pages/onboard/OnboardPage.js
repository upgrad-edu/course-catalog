import React from "react";

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

  const tabsDetails = [
    { id: "login", label: "login", children: <LoginForm /> },
    { id: "signup", label: "signup", children: <SignupForm /> },
  ];

  return (
    <div className={classes.loginPage}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="upGrad Logo" className={classes.logo} />
      </div>
      <div className={classes.loginPageTabs}>
        <MuiTabs tabsDetails={tabsDetails}></MuiTabs>
      </div>
    </div>
  );
};

export { OnboardPage };
