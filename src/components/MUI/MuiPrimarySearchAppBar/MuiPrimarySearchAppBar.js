import React, { useState } from "react";

// imports from Material UI library
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

// imports for styles
import { useStyles } from "./styles";

const MuiPrimarySearchAppBar = ({
  handleTitleSearch,
  handleCategorySearch,
}) => {
  const classes = useStyles();
  const [categoriesAnchorEl, setCategoriesAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [profileMobileAnchorEl, setProfileForMobileAnchorEl] = useState(null);

  const [searchInputText, setSearchInputText] = useState("");

  const isCategoriesMenuOpen = Boolean(categoriesAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isProfileMobileMenuOpen = Boolean(profileMobileAnchorEl);

  const handleCategoriesMenuOpen = (event) => {
    setCategoriesAnchorEl(event.currentTarget);
  };

  const handleCategoriesMenuClose = () => {
    setCategoriesAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleProfileMobileMenuOpen = (event) => {
    setProfileForMobileAnchorEl(event.currentTarget);
  };

  const handleProfileMobileMenuClose = () => {
    setProfileForMobileAnchorEl(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchInputText(event.target.value);
  };

  const handleSearchSubmitClick = () => {
    handleTitleSearch(searchInputText);
  };

  const handleCategoryClick = (event) => {
    {
      /* TODO: API pending; replace innerText with data fetched from server */
    }
    const category = event.target.innerText;
    handleCategorySearch(category);
    handleCategoriesMenuClose();
  };

  // visible as categories menu
  const categoriesMenuId = "categories-menu";
  const renderCategoriesMenu = (
    <Menu
      anchorEl={categoriesAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={categoriesMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isCategoriesMenuOpen}
      onClose={handleCategoriesMenuClose}
      className={classes.root}
    >
      {/* TODO: API pending; fetch categories data from server */}
      <MenuItem onClick={handleCategoryClick}>Frontend Development</MenuItem>
      <MenuItem onClick={handleCategoryClick}>Backend Development</MenuItem>
      <MenuItem onClick={handleCategoryClick}>DevOps</MenuItem>
    </Menu>
  );

  // visible as profile menu on large screen sizes (desktop)
  const profileMenuId = "profile-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
      className={classes.root}
    >
      <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
    </Menu>
  );

  // visible as more icon's menu on small screen sizes (mobile)
  const profileMobileMenuId = "profile-menu-mobile";
  const renderProfileMobileMenu = (
    <Menu
      anchorEl={profileMobileAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={profileMobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMobileMenuOpen}
      onClose={handleProfileMobileMenuClose}
      className={classes.root}
    >
      <MenuItem>
        <IconButton
          aria-label="profile of current user"
          aria-controls={profileMenuId}
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={`${classes.root} ${classes.grow}`}>
      <AppBar position="static">
        <Toolbar>
          {/* upGrad Logo */}
          <Typography className={classes.logo} variant="h6">
            upGrad
          </Typography>

          <div className={classes.grow} />

          {/* Search Bar */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchInputChange}
            />
            <IconButton
              className={classes.searchButton}
              aria-label="search course"
              aria-controls={profileMenuId}
              aria-haspopup="false"
              color="inherit"
              onClick={handleSearchSubmitClick}
            >
              <SendIcon />
            </IconButton>
          </div>

          <div className={classes.grow} />

          {/* Categories */}
          <div className={classes.categories}>
            <IconButton
              aria-label="course categories"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleCategoriesMenuOpen}
            >
              <AppsOutlinedIcon />
            </IconButton>
            <p className={classes.categoriesLabel}>Categories</p>
          </div>

          {renderCategoriesMenu}

          <div className={classes.grow} />

          {/* Profile Menu - large screens (desktop) */}
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="profile of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

          {/* More Button - small screens (mobile) */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={profileMobileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderProfileMobileMenu}
      {renderProfileMenu}
    </div>
  );
};

export default MuiPrimarySearchAppBar;
