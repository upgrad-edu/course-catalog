import React from "react";

// imports for 3rd party libraries
import PropTypes from "prop-types";

// imports for styles
import { useStyles } from "./styles.js";

const MuiTabPanel = (props) => {
  const { children, value, index, id, ...other } = props;

  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-tabpanel-${index}`}
      aria-labelledby={`${id}-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classes.tabPanel}>{children}</div>}
    </div>
  );
};

MuiTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export { MuiTabPanel };
