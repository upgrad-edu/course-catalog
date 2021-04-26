import React from "react";

// imports for 3rd party libraries
import { useHistory } from "react-router-dom";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";

// imports for components from MUI library
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import Button from "@material-ui/core/Button";

// imports for custom components
import { Footer } from "../../../components/UI/Footer";

// imports for custom hook
import { useForm } from "../../../hooks";
import validateCheckoutForm from "./validateCheckoutForm";

// imports for styles
import classes from "./CheckoutPage.module.css";
import { useStyles } from "../../../styles/formStyles.js";

const CheckoutPage = () => {
  // merging all styles imported
  const cssClasses = { ...classes, ...useStyles() };

  const history = useHistory();

  const initialFormValues = {
    // the keys are similar to `name` attribute provided to form controls
    flatOrBuilding: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    phone: "",
  };

  const navigateToSummaryPage = () => {
    history.push({
      pathname: "/summary",
      courseDetails: history.location.courseDetails, // pass course details received from details page to summary page
      addressDetails: values, // pass address details to summary page
    });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialFormValues,
    false, // determining if values of form control should be cleared
    validateCheckoutForm,
    null,
    navigateToSummaryPage
  );

  const { flatOrBuilding, street, city, state, country, pin, phone } = values;

  return (
    <div className={cssClasses.checkoutPage}>
      {/* TODO: Show header */}
      <MuiPrimarySearchAppBar isLogoClickable={true} />
      <main className={cssClasses.checkoutPageContent}>
        <Typography
          variant="inherit"
          component="h3"
          color="secondary"
          className={classes.checkoutPageHeading}
        >
          Address Form
        </Typography>
        <form
          id="addressForm"
          noValidate
          autoComplete="off"
          className={`${cssClasses.form} ${cssClasses.addressForm}`}
        >
          <div
            className={`${cssClasses.formControlsContainer} ${cssClasses.addressFormControlsContainer}`}
          >
            <FormControl variant="filled">
              <InputLabel htmlFor="flatOrBuilding" color="secondary">
                Flat / Building No.
              </InputLabel>
              <FilledInput
                id="flatOrBuilding"
                name="flatOrBuilding"
                type="text"
                value={flatOrBuilding}
                onChange={handleChange}
                autoComplete="on"
                color="secondary"
              />
              {errors.flatOrBuilding && (
                <div className={cssClasses.error}>{errors.flatOrBuilding}</div>
              )}
            </FormControl>
            <FormControl variant="filled">
              <InputLabel htmlFor="street" color="secondary">
                Street
              </InputLabel>
              <FilledInput
                id="street"
                name="street"
                type="text"
                value={street}
                onChange={handleChange}
                autoComplete="on"
                color="secondary"
              />
              {errors.street && (
                <div className={cssClasses.error}>{errors.street}</div>
              )}
            </FormControl>
            <FormControl variant="filled">
              <InputLabel htmlFor="city" color="secondary">
                City
              </InputLabel>
              <FilledInput
                id="city"
                name="city"
                type="text"
                value={city}
                onChange={handleChange}
                autoComplete="on"
                color="secondary"
              />
              {errors.city && (
                <div className={cssClasses.error}>{errors.city}</div>
              )}
            </FormControl>
            <FormControl variant="filled">
              <InputLabel htmlFor="state" color="secondary">
                State
              </InputLabel>
              <FilledInput
                id="state"
                name="state"
                type="text"
                value={state}
                onChange={handleChange}
                autoComplete="on"
                color="secondary"
              />
              {errors.state && (
                <div className={cssClasses.error}>{errors.state}</div>
              )}
            </FormControl>
            <FormControl variant="filled">
              <InputLabel htmlFor="country" color="secondary">
                Country
              </InputLabel>
              <FilledInput
                id="country"
                name="country"
                type="text"
                value={country}
                onChange={handleChange}
                autoComplete="on"
                color="secondary"
              />
              {errors.country && (
                <div className={cssClasses.error}>{errors.country}</div>
              )}
            </FormControl>
            <FormControl variant="filled">
              <InputLabel htmlFor="pin" color="secondary">
                Pin Code
              </InputLabel>
              <FilledInput
                id="pin"
                name="pin"
                type="text"
                value={pin}
                onChange={handleChange}
                autoComplete="on"
                color="secondary"
              />
              {errors.pin && (
                <div className={cssClasses.error}>{errors.pin}</div>
              )}
            </FormControl>
            <FormControl variant="filled">
              <InputLabel htmlFor="phone" color="secondary">
                Phone No.
              </InputLabel>
              <FilledInput
                id="phone"
                name="phone"
                type="text"
                value={phone}
                onChange={handleChange}
                autoComplete="on"
                color="secondary"
              />
              {errors.phone && (
                <div className={cssClasses.error}>{errors.phone}</div>
              )}
            </FormControl>
          </div>

          <Button
            variant="contained"
            color="secondary"
            fullWidth={true}
            size="large"
            className={cssClasses.formButton}
            onClick={handleSubmit}
          >
            show summary
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
