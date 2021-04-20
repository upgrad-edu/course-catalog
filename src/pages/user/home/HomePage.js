import React from "react";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";

// imports for styles
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.app}>
      <MuiPrimarySearchAppBar />
    </div>
  );
};

export { HomePage };
