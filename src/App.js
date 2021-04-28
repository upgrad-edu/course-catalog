// imports for Material UI components
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  /* change suggested to overcome the error of Material UI in Menu component inside MuiPrimarySearchAppBar component
  https://stackoverflow.com/a/64135466/7452548; 
  TODO: REVERT TO STABLE WITH UPDATED VERSION OF MATERIAL UI where error is fixed
   */
  ThemeProvider,
} from "@material-ui/core";

// imports for 3rd party libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// imports for custom components
import { OnboardPage } from "./pages/onboard";
import { HomePage } from "./pages/user/home";
import { DetailsPage } from "./pages/user/details";
import { CheckoutPage } from "./pages/user/checkout";
import { SummaryPage } from "./pages/user/summary";
import { NotFoundPage } from "./pages/notfound";

// imports for contexts
import { AuthProvider } from "./contexts/AuthContext";

// overriding default Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d32f2f" /* dark red color */,
      light: "#ffcdd2" /* light pink color */,
    },
    secondary: {
      main: "#6d9c90" /* turquoise color */,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/login" component={OnboardPage}></Route>
            <Route exact path={["/home", "/"]} component={HomePage}></Route>
            <Route exact path="/courses/:id" component={DetailsPage}></Route>
            <Route exact path="/checkout" component={CheckoutPage}></Route>
            <Route exact path="/summary" component={SummaryPage}></Route>
            <Route path="*" component={NotFoundPage}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
