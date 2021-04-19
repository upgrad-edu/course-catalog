// imports for Material UI components
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

// imports for 3rd party libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// imports for custom components
import { OnboardPage } from "./pages/onboard";
import { HomePage } from "./pages/user/home";

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
        <Switch>
          <Route exact path="/login" component={OnboardPage}></Route>
        </Switch>
        <Switch>
          <Route exact path={["/home", "/"]} component={HomePage}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
