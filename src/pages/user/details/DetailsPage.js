import React, { useState, useEffect, Fragment } from "react";

// imports for utils
import * as utils from "../../../utils";

// imports for 3rd party libraries
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// imports for routes
import * as routeConstants from "../../../routes/routeConstants";

// imports for custom components
import { Footer } from "../../../components/UI/Footer";

// imports for components from MUI library
import Typography from "@material-ui/core/Typography";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TodayIcon from "@material-ui/icons/Today";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";

// imports for custom hooks
import useLoader from "../../../hooks/useLoader";
import useNotification from "../../../hooks/useNotification";

// imports for APIs
import * as coursesApi from "../../../api/coursesApi";

// imports for styles
import classes from "./DetailsPage.module.css";

const DetailsPage = (props) => {
  const history = useHistory();
  const { loader, isLoading, showLoader, hideLoader } = useLoader();
  const { notification, showNotification } = useNotification();

  const [courseDetails, setCourseDetails] = useState({});

  const { getCourseById } = coursesApi;

  // get all data of course with given id
  useEffect(() => {
    showLoader();
    const courseId = props.match.params.id;
    getCourseById(
      courseId,
      // success callback
      (response) => {
        setCourseDetails(response.data);
        hideLoader();
      },
      // failure callback
      (error, errorMessage) => {
        // show errors from specific to generic
        if (errorMessage) {
          showNotification(errorMessage);
        } else {
          showNotification(error.toString());
        }
        hideLoader();
      }
    );
  }, []);

  const navigateToCheckoutPage = () => {
    history.push({
      pathname: routeConstants.ROUTE_URL.CHECKOUT,
      courseDetails: courseDetails, // pass course details to checkout page
    });
  };

  const renderSkills =
    courseDetails &&
    courseDetails.skills &&
    JSON.parse(courseDetails.skills).map((skill, index) => {
      return (
        <div key={index} className={classes.skill}>
          <Typography variant="inherit">{skill}</Typography>
        </div>
      );
    });

  const renderChapters =
    courseDetails &&
    courseDetails.chapters &&
    JSON.parse(courseDetails.chapters).map((chapter, index) => {
      return (
        <div key={index} className={classes.chapter}>
          <Typography variant="inherit">{`${
            index + 1
          }. ${chapter}`}</Typography>
        </div>
      );
    });

  return (
    <div className={classes.detailsPage}>
      <MuiPrimarySearchAppBar isLogoClickable={true} />

      <div className={classes.detailsPageContent}>
        {isLoading ? (
          loader
        ) : (
          /* Left Column (on large screens only) */
          <Fragment>
            <section>
              {/* Course Text Details */}
              <article>
                <Typography variant="inherit" component="h3" gutterBottom>
                  {courseDetails.title}
                </Typography>
                <Typography
                  variant="inherit"
                  component="p"
                  color="secondary"
                  gutterBottom
                >
                  Course Instructor:{" "}
                  <span className={classes.subtitleContent}>
                    {courseDetails.author}
                  </span>
                </Typography>
                <div className={classes.durationAndDateContainer}>
                  <div className={classes.durationContainer}>
                    <ScheduleIcon color="primary" className={classes.icon} />
                    <Typography variant="inherit" component="p">
                      {utils.getFormattedTimeInHoursAndMinutes(
                        courseDetails.duration
                      )}
                    </Typography>
                  </div>
                  <div className={classes.dateContainer}>
                    <TodayIcon color="primary" className={classes.icon} />
                    <Typography variant="inherit" component="p">
                      {utils.getFormattedDate(courseDetails.createdAt)}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="inherit"
                  component="p"
                  color="textSecondary"
                  gutterBottom
                >
                  Category:{" "}
                  <span className={classes.subtitleContent}>
                    {courseDetails.category}
                  </span>
                </Typography>
                <Typography
                  variant="inherit"
                  component="p"
                  color="textSecondary"
                >
                  Price:{" "}
                  <span className={classes.originalPrice}>
                    {courseDetails.priceInRupees}
                  </span>
                  &nbsp;
                  <span
                    className={`${classes.discountedPrice} ${classes.subtitleContent}`}
                  >
                    {courseDetails.priceAfterDiscount}
                  </span>
                </Typography>

                {/* Button for preview on YouTube */}
                <div
                  className={`${classes.btnContainer} ${classes.previewBtnContainer}`}
                >
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon color="primary" />}
                    className={classes.previewButton}
                  >
                    Preview
                  </Button>
                </div>
              </article>

              {/* Skills */}
              <article>
                <div className={classes.skillsContainer}>
                  <Typography
                    variant="inherit"
                    component="h4"
                    color="secondary"
                    gutterBottom
                  >
                    Skills Covered:
                  </Typography>
                  <div className={classes.skills}>{renderSkills}</div>
                </div>
              </article>
            </section>

            {/* Right Column (on large screens only) */}
            <section className={classes.rightColumn}>
              {/* Button for Enrolment */}
              <div
                className={`${classes.btnContainer} ${classes.enrolMeBtnContainer}`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={navigateToCheckoutPage}
                >
                  Enrol Me
                </Button>
              </div>

              {/* Chapters */}
              <article className={classes.chaptersContainer}>
                <Typography
                  variant="inherit"
                  component="p"
                  className={classes.chaptersHeading}
                >
                  Chapters
                </Typography>
                <div className={classes.chapters}>{renderChapters}</div>
              </article>
            </section>
          </Fragment>
        )}
        {notification}
      </div>
      <Footer />
    </div>
  );
};

DetailsPage.propTypes = {
  props: PropTypes.object,
};

export default DetailsPage;
