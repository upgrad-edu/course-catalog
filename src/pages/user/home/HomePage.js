import React, { useState, useEffect, Fragment } from "react";

// imports for 3rd party libraries
import { useHistory } from "react-router";

// imports for utils
import * as constants from "../../../utils/constants";

// imports for components from Material UI library
import Typography from "@material-ui/core/Typography";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";
import { EnhancedSingleLineGridList } from "../../../components/MUI/MuiSingleLineGridList";
import { MuiCard } from "../../../components/MUI/MuiCard";

// imports for custom components
import { Loader } from "../../../components/UI/Loader";
import { Footer } from "../../../components/UI/Footer";

// imports for APIs
import * as coursesApi from "../../../api/coursesApi";

// imports for styles
import classes from "./HomePage.module.css";

const HomePage = () => {
  const history = useHistory();

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

  const showCourseDetailsPage = (id) => {
    history.push(`/courses/${id}`); // redirect to course details page on click of course card
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
      {/* Header */}
      <MuiPrimarySearchAppBar
        handleTitleSearch={handleTitleSearch}
        handleCategorySearch={handleCategorySearch}
      />
      {/* Main Content */}
      <main className={classes.homePageContent}>
        {isLoading ? (
          <Loader />
        ) : (
          // TODO: API pending; pass new courses instead of published courses
          <Fragment>
            {/* New Courses */}
            <section>
              <div className={classes.titleBar}>
                <h4>New Courses</h4>
              </div>
              <EnhancedSingleLineGridList data={newCoursesList} />
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
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
