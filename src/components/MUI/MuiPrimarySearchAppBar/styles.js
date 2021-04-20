import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& p": {
      marginBottom: 0,
    },
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      cursor: "default",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    padding: theme.spacing(0, 1),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "30rem",
      padding: theme.spacing(0, 2),
    },
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: `calc(30rem - ${theme.spacing(4 * 2)}px)`,
    },
  },
  searchButton: {
    height: "100%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0.5),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  categories: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  categoriesLabel: {
    color: "var(--clr-white)",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

export { useStyles };
