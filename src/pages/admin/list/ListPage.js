import React, { useState, useEffect } from "react";

// imports for components from MUI library
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// imports for MUI components
import { MuiPrimarySearchAppBar } from "../../../components/MUI/MuiPrimarySearchAppBar";

// imports for custom components
import { Footer } from "../../../components/UI/Footer";

// imports for custom hooks
import useLoader from "../../../hooks/useLoader";
import useNotification from "../../../hooks/useNotification";

// imports for utils
import * as utils from "../../../utils";

// imports for APIs
import * as coursesApi from "../../../api/coursesApi";

// imports for styles
import classes from "./ListPage.module.css";

const ListPage = () => {
  const { loader, isLoading, showLoader, hideLoader } = useLoader();
  const { notification, showNotification } = useNotification();

  const { getAllPublishedCourses } = coursesApi;

  const [coursesList, setCoursesList] = useState([]);

  // TODO: API pending; get all (published as well as unpublished) courses
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
    <div className={classes.listPage}>
      {/* Header */}
      <MuiPrimarySearchAppBar isProfileVisible={true} />

      {/* Main Content */}
      <main className={classes.listPageContent}>
        {isLoading ? (
          loader
        ) : (
          <TableContainer>
            <Table aria-label="customized table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Course ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell align="right">
                    Duration <br />
                    (in h)
                  </TableCell>
                  <TableCell>Published</TableCell>
                  <TableCell align="right">
                    Price <br />
                    (in INR)
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesList.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell component="th" scope="row">
                      {course._id}
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.author}</TableCell>
                    <TableCell align="right">
                      {utils.getFormattedTimeInHoursAndMinutes(course.duration)}
                    </TableCell>
                    <TableCell>{course.published ? "Yes" : "No"}</TableCell>
                    <TableCell align="right">
                      {course.priceAfterDiscount.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit course"
                        aria-controls="admin actions"
                        aria-haspopup="false"
                        color="inherit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete course"
                        aria-controls="admin actions"
                        aria-haspopup="false"
                        color="inherit"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {notification}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ListPage;
