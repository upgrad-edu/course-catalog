import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loginPage: {
    height: "100vh",
  },
  logoContainer: {
    boxShadow: "var(--light-shadow)",
    height: "3rem",
    [theme.breakpoints.up("sm")]: {
      height: "4rem",
    },
  },
  logo: {
    width: "auto",
    height: "100%",
    margin: "0 auto",
  },
  loginPageTabs: {
    height: "calc(100vh - 3rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 4rem)",
    },
  },
}));

export { useStyles };
