import React from "react";

// imports for styles
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <section className={classes.loaderContainer}>
      <div className={classes.loader}>Loading...</div>
    </section>
  );
};

export default Loader;
