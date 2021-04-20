import React from "react";

// imports for styles
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      {/* copyright text */}
      <p className={classes.copyright}>
        copyright &copy;&nbsp;
        <a
          href="https://www.upgrad.com/"
          target="_blank"
          rel="noreferrer"
          className={classes.company}
          style={{ textTransform: "none" }}
        >
          upGrad Education
        </a>
      </p>

      {/* social media links */}
      <div className={classes.socialLinks}>
        <a
          href="https://www.facebook.com/upGradGlobal"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com/upGrad_edu"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/ueducation/"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>

      {/* creator details */}
      <p className={classes.creator}>
        created by{" "}
        <a href="https://www.srishtigupta.in" target="_blank" rel="noreferrer">
          srishti gupta
        </a>
      </p>
    </footer>
  );
};

export default Footer;
