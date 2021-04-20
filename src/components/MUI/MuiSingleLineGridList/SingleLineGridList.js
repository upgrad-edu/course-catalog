import React from "react";

// imports for components from Material UI library
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

// imports for styles
import { useStyles } from "./styles.js";

const SingleLineGridList = ({ width, newCourses }) => {
  const classes = useStyles();

  const getGridListCols = () => {
    if (isWidthUp("xl", width) || isWidthUp("lg", width)) {
      return 3;
    }

    if (isWidthUp("sm", width)) {
      return 2;
    }

    return 1;
  };

  return (
    <div className={classes.gridListContainer}>
      <GridList className={classes.gridList} cols={getGridListCols()}>
        {newCourses.map((tile) => (
          <GridListTile key={tile._id} className={classes.gridListItem}>
            <img
              src={tile.imageURL}
              alt={tile.title}
              className={classes.gridImage}
            />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export const EnhancedSingleLineGridList = withWidth()(SingleLineGridList);
