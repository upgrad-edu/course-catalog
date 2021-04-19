import React from "react";

// imports for 3rd party libraries
import PropTypes from "prop-types";

// imports for Material UI components
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MuiTabPanel } from "./MuiTabPanel";

// imports for styles
import { useStyles } from "./styles.js";

// adding attributes for accessibility to Tab component
const a11yProps = (id, index) => {
  return {
    id: `${id}-tab-${index}`,
    "aria-controls": `${id}-tabpanel-${index}`,
  };
};

const MuiTabs = ({ tabValue, handleTabChange, tabsDetails }) => {
  const classes = useStyles();

  return (
    <div className={classes.tabsContainer}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="login & signup tabs"
      >
        {tabsDetails.map((tab, index) => {
          return (
            <Tab
              key={tab.id}
              label={tab.label}
              {...a11yProps(tab.id, index)}
              className={classes.tab}
            />
          );
        })}
      </Tabs>

      {tabsDetails.map((tab, index) => {
        return (
          <MuiTabPanel key={tab.id} value={tabValue} index={index} id={tab.id}>
            {tab.children}
          </MuiTabPanel>
        );
      })}
    </div>
  );
};

MuiTabs.propTypes = {
  tabValue: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  tabsDetails: PropTypes.array.isRequired,
};

export { MuiTabs };
