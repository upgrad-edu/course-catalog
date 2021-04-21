import React from "react";

// imports for 3rd party libraries
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const { courseDetails, addressDetails } = history.location;

  const placeOrder = () => {
    alert("Your order has been placed successfully!");
    history.push("/");
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
              <span className={classes.bold}>Title: </span>
              {courseDetails.title}
            </Typography>
            <Typography variant="inherit" component="p" gutterBottom>
              <span className={classes.bold}>Author: </span>
              {courseDetails.author}
            </Typography>
            <Typography variant="inherit" component="p" gutterBottom>
              <span className={classes.bold}>Price: </span>
              {courseDetails.priceAfterDiscount}
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
            <Typography variant="inherit" component="p" gutterBottom>
              {`${addressDetails.flatOrBuilding}, ${addressDetails.street}`}
            </Typography>
            <Typography variant="inherit" component="p" gutterBottom>
              {`${addressDetails.city}, ${addressDetails.state}, ${addressDetails.country}`}
            </Typography>
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
              {addressDetails.pin}
            </Typography>
            <Typography
              variant="inherit"
              component="p"
              className={classes.phone}
              gutterBottom
            >
              <PhoneIcon fontSize="small" />
              {addressDetails.phone}
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
