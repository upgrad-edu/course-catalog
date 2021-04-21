import React, { useState, useEffect } from "react";

// imports for utils
import * as utils from "../../../utils";

// imports for custom components
import { Loader } from "../../../components/UI/Loader";
import { Footer } from "../../../components/UI/Footer";

// imports for components from MUI library
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TodayIcon from "@material-ui/icons/Today";
import YouTubeIcon from "@material-ui/icons/YouTube";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";

// imports for APIs
import * as coursesApi from "../../../api/coursesApi";

// imports for styles
import classes from "./DetailsPage.module.css";

const DetailsPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});

  const { getCourseById } = coursesApi;

  // get all data of course with given id
  useEffect(() => {
    setIsLoading(true);
    const courseId = props.match.params.id;
    getCourseById(
      courseId,
      // success callback
      (response) => {
        setCourseDetails(response.data);
        setIsLoading(false);
      },
      // failure callback
      (_, errorMessage) => {
        console.error(errorMessage);
        setIsLoading(false);
      }
    );
  }, []);

  const renderSkills =
    courseDetails && courseDetails.skills
      ? JSON.parse(courseDetails.skills).map((skill, index) => {
          return (
            <div key={index} className={classes.skill}>
              <Typography variant="inherit">{skill}</Typography>
            </div>
          );
        })
      : null;

  const renderChapters =
    courseDetails && courseDetails.chapters
      ? JSON.parse(courseDetails.chapters).map((chapter, index) => {
          return (
            <div key={index} className={classes.chapter}>
              <Typography variant="inherit">{`${
                index + 1
              }. ${chapter}`}</Typography>
            </div>
          );
        })
      : null;

  return (
    <div className={classes.detailsPage}>
      {/* TODO: Show header */}
      <MuiPrimarySearchAppBar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.detailsContainer}>
          {/* Left Column (on large screens only) */}
          <section className={classes.leftColumn}>
            {/* Course Textual Details */}
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
                    {courseDetails.duration} hours
                  </Typography>
                </div>
                <div className={classes.dateContainer}>
                  <TodayIcon color="primary" className={classes.icon} />
                  <Typography variant="inherit" component="p">
                    {utils.getFormattedDate(courseDetails.createdAt)}
                  </Typography>
                </div>
              </div>
              <Typography variant="inherit" component="p" color="textSecondary">
                Category:{" "}
                <span className={classes.subtitleContent}>
                  {courseDetails.category}
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
              <Button variant="contained" color="primary">
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
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DetailsPage;
