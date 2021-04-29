import React, { useState, useEffect, Fragment } from "react";

// imports for 3rd party libraries
import { useHistory } from "react-router";

// imports for routes
import { routeUtils } from "../../../routes";

// imports for utils
import * as constants from "../../../utils/constants";

// imports for components from Material UI library
import Typography from "@material-ui/core/Typography";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";
import { EnhancedSingleLineGridList } from "../../../components/MUI/MuiSingleLineGridList";
import { MuiCard } from "../../../components/MUI/MuiCard";

// imports for custom components
import { Footer } from "../../../components/UI/Footer";

// imports for custom hooks
import useLoader from "../../../hooks/useLoader";
import useNotification from "../../../hooks/useNotification";

// imports for APIs
import * as coursesApi from "../../../api/coursesApi";

// imports for styles
import classes from "./HomePage.module.css";

const HomePage = () => {
  const history = useHistory();
  const { loader, isLoading, showLoader, hideLoader } = useLoader();
  const { notification, showNotification } = useNotification();

  const [newCoursesList, setNewCoursesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  const {
    searchCourseByTitle,
    getCoursesByCategory,
    getAllPublishedCourses,
  } = coursesApi;

  const handleTitleSearch = (title) => {
    showLoader();
    searchCourseByTitle(
      title,
      // success callback
      (response) => {
        setCoursesList(response.data);
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
  };

  const handleCategorySearch = (category) => {
    showLoader();
    getCoursesByCategory(
      category,
      // success callback
      (response) => {
        setCoursesList(response.data);
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
  };

  const showCourseDetailsPage = (id) => {
    history.push(routeUtils.getDetailsPageRouteUrl(id)); // redirect to course details page on click of course card
  };

  // get all NEW courses
  useEffect(() => {
    showLoader();
    getAllPublishedCourses(
      // success callback
      (response) => {
        const nNewCourses = response.data.slice(
          0,
          constants.SHOW_NEW_COURSES_LIMIT
        );
        setNewCoursesList(nNewCourses);
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

  // get all courses
  useEffect(() => {
    showLoader();
    getAllPublishedCourses(
      // success callback
      (response) => {
        setCoursesList(response.data);
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

  return (
    <div className={classes.homePage}>
      {/* Header */}
      <MuiPrimarySearchAppBar
        isSearchVisible={true}
        isCategoriesVisible={true}
        handleTitleSearch={handleTitleSearch}
        handleCategorySearch={handleCategorySearch}
      />
      {/* Main Content */}
      <main className={classes.homePageContent}>
        {isLoading ? (
          loader
        ) : (
          // TODO: API pending; pass new courses instead of published courses
          <Fragment>
            {/* New Courses */}
            <section>
              <div className={classes.titleBar}>
                <h4>New Courses</h4>
              </div>
              {newCoursesList.length > 0 ? (
                <EnhancedSingleLineGridList data={newCoursesList} />
              ) : (
                <Typography
                  variant="inherit"
                  component="h4"
                  className={classes.noCourseFoundText}
                >
                  No new course
                </Typography>
              )}
            </section>

            {/* Course Cards */}
            {coursesList.length > 0 ? (
              <section className={classes.courseCardsContainer}>
                {coursesList.map((course) => (
                  <MuiCard
                    key={course._id}
                    data={course}
                    handleClick={() => showCourseDetailsPage(course._id)}
                  />
                ))}
              </section>
            ) : (
              <Typography
                variant="inherit"
                component="h4"
                className={classes.noCourseFoundText}
              >
                No course found
              </Typography>
            )}
          </Fragment>
        )}
        {notification}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
