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

const MuiPrimarySearchAppBar = ({ handleSearch }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchInputText, setSearchInputText] = useState("");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchInputText(event.target.value);
  };

  const handleSearchSubmitClick = () => {
    handleSearch(searchInputText);
  };

  // visible as profile icon on large screen sizes (desktop)
  const menuId = "profile-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.root}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  // visible as more icon on small screen sizes (mobile)
  const mobileMenuId = "profile-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.root}
    >
      <MenuItem>
        <IconButton
          aria-label="profile of current user"
          aria-controls={menuId}
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
              aria-controls={menuId}
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
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AppsOutlinedIcon />
            </IconButton>
            <p className={classes.categoriesLabel}>Categories</p>
          </div>

          <div className={classes.grow} />

          {/* Profile Menu - large screens (desktop) */}
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="profile of current user"
              aria-controls={menuId}
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
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default MuiPrimarySearchAppBar;
