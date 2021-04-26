import React, { useState } from "react";

// imports for 3rd party libraries
import { useHistory } from "react-router-dom";

// imports for components from MUI library
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";
import { MuiSnackbar } from "../../../components/MUI/MuiSnackbar";

// imports for custom components
import { Footer } from "../../../components/UI/Footer";

// imports for styles
import classes from "./SummaryPage.module.css";

const SummaryPage = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const history = useHistory();
  const { courseDetails, addressDetails } = history.location;

  const placeOrder = () => {
    // show the success message inside Snackbar component
    setSnackbarMessage("Your order has been successfully placed!");
    setIsSnackbarOpen(true);
  };

  // event handler to close Snackbar
  const closeSnackbar = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
    history.push("/");
  };

  return (
    <div className={classes.summaryPage}>
      {/* TODO: Show header */}
      <MuiPrimarySearchAppBar />
      <main className={classes.summaryPageContent}>
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
          <div>
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
          <div>
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
              &nbsp;
              {addressDetails.pin}
            </Typography>
            <Typography
              variant="inherit"
              component="p"
              className={classes.phone}
              gutterBottom
            >
              <PhoneIcon fontSize="small" />
              &nbsp;
              {addressDetails.phone}
            </Typography>
          </div>
        </article>
        <div className={classes.placeOrderBtn}>
          <Button variant="contained" color="secondary" onClick={placeOrder}>
            place order
          </Button>
        </div>
        <MuiSnackbar
          isOpen={isSnackbarOpen}
          message={snackbarMessage}
          handleClose={closeSnackbar}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SummaryPage;
