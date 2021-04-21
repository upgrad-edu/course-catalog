import React from "react";

// imports for components from MUI library
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";

// imports for custom components
import { Footer } from "../../../components/UI/Footer";

// imports for styles
import classes from "./SummaryPage.module.css";

const SummaryPage = () => {
  const placeOrder = () => {
    alert("Your order has been placed successfully!");
  };

  return (
    <div className={classes.summaryPage}>
      {/* TODO: Show header */}
      <MuiPrimarySearchAppBar />
      <section className={classes.summaryContainer}>
        {/* Summary Heading */}
        <Typography
          variant="inherit"
          component="h3"
          color="textSecondary"
          className={classes.summaryPageHeading}
        >
          Summary
        </Typography>
        {/* Summary Content */}
        <article className={classes.summary}>
          {/* Course Summary */}
          <div className={classes.courseSummary}>
            <Typography
              variant="inherit"
              component="h4"
              color="secondary"
              gutterBottom
            >
              Course:
            </Typography>
            <Typography variant="inherit" component="p" gutterBottom>
              <span>Title:</span>
            </Typography>
            <Typography variant="inherit" component="p" gutterBottom>
              <span>Author:</span>
            </Typography>
            <Typography variant="inherit" component="p" gutterBottom>
              <span>Price:</span>
            </Typography>
          </div>

          {/* Address Summary */}
          <div className={classes.addressSummary}>
            <Typography
              variant="inherit"
              component="h4"
              color="secondary"
              gutterBottom
            >
              Address:
            </Typography>
            <Typography
              variant="inherit"
              component="p"
              gutterBottom
            ></Typography>
            <Typography
              variant="inherit"
              component="p"
              gutterBottom
            ></Typography>
            <Typography
              variant="inherit"
              component="p"
              gutterBottom
            ></Typography>
            <Typography
              variant="inherit"
              component="p"
              className={classes.pin}
              gutterBottom
            >
              <RoomIcon fontSize="small" />
            </Typography>
            <Typography
              variant="inherit"
              component="p"
              className={classes.phone}
              gutterBottom
            >
              <PhoneIcon fontSize="small" />
            </Typography>
          </div>
        </article>
        <div className={classes.placeOrderBtn}>
          <Button variant="contained" color="secondary" onClick={placeOrder}>
            place order
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SummaryPage;
