import React from "react";

// imports for components from Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

// imports for styles
import { useStyles } from "./styles.js";

const Course = ({ data, handleClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardMedia
        className={classes.media}
        image={data.imageURL}
        title={data.title}
      />
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {data.title}
        </Typography>
        <div className={classes.flex}>
          <Typography color="textSecondary">{data.author}</Typography>
          <div className={`${classes.flex} ${classes.popularity}`}>
            <StarIcon fontSize="inherit" />
            &nbsp;
            <Typography color="textSecondary">
              {data.popularity.toFixed(1)}
            </Typography>
          </div>
        </div>
        <div className={classes.flex}>
          <Typography color="textPrimary" variant="body2">
            {data.duration} hours
          </Typography>
          <Typography color="textPrimary" variant="body2">
            INR{" "}
            <span className={classes.originalPrice}>{data.priceInRupees}</span>
            &nbsp;
            <span className={classes.discountedPrice}>
              {data.priceAfterDiscount}
            </span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
