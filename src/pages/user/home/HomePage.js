import React, { useState, useEffect, Fragment } from "react";

// imports for utils
import * as constants from "../../../utils/constants";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";
import { Typography } from "@material-ui/core";

// imports for custom components
import { Loader } from "../../../components/UI/Loader";
import { EnhancedSingleLineGridList } from "../../../components/MUI/MuiSingleLineGridList";
import { Course } from "../../../components/Course";
import { Footer } from "../../../components/UI/Footer";

// imports for APIs
import * as coursesApi from "../../../api/coursesApi";

// imports for styles
import classes from "./HomePage.module.css";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newCoursesList, setNewCoursesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  const {
    searchCourseByTitle,
    getCoursesByCategory,
    getAllPublishedCourses,
  } = coursesApi;

  const handleTitleSearch = (title) => {
    setIsLoading(true);
    searchCourseByTitle(
      title,
      // success callback
      (response) => {
        setCoursesList(response.data);
        setIsLoading(false);
      },
      // failure callback
      (_, errorMessage) => {
        console.error(errorMessage);
        setIsLoading(false);
      }
    );
  };

  const handleCategorySearch = (category) => {
    setIsLoading(true);
    getCoursesByCategory(
      category,
      // success callback
      (response) => {
        setCoursesList(response.data);
        setIsLoading(false);
      },
      // failure callback
      (_, errorMessage) => {
        console.error(errorMessage);
        setIsLoading(false);
      }
    );
  };

  // get all NEW courses
  useEffect(() => {
    setIsLoading(true);
    getAllPublishedCourses(
      // success callback
      (response) => {
        const nNewCourses = response.data.slice(
          0,
          constants.SHOW_NEW_COURSES_LIMIT
        );
        setNewCoursesList(nNewCourses);
        setIsLoading(false);
      },
      // failure callback
      (_, errorMessage) => {
        console.error(errorMessage);
        setIsLoading(false);
      }
    );
  }, []);

  // get all courses
  useEffect(() => {
    setIsLoading(true);
    getAllPublishedCourses(
      // success callback
      (response) => {
        setCoursesList(response.data);
        setIsLoading(false);
      },
      // failure callback
      (_, errorMessage) => {
        console.error(errorMessage);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <div className={classes.homePage}>
      <div className={classes.app}>
        <MuiPrimarySearchAppBar
          handleTitleSearch={handleTitleSearch}
          handleCategorySearch={handleCategorySearch}
        />
        <div className={classes.titleBar}>
          <h4>New Courses</h4>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          // TODO: API pending; pass new courses instead of published courses
          <Fragment>
            <EnhancedSingleLineGridList newCourses={newCoursesList} />

            {coursesList.length > 0 ? (
              <div className={classes.courseCardsContainer}>
                {coursesList.map((course) => (
                  <Course key={course._id} data={course} />
                ))}
              </div>
            ) : (
              <Typography variant="subtitle1" gutterBottom>
                No course found
              </Typography>
            )}
          </Fragment>
        )}
        <Footer />
      </div>
    </div>
  );
};

export { HomePage };
