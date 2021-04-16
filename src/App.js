// imports for Material UI components
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

// imports for custom components
import { OnboardPage } from "./pages/onboard";

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
      <OnboardPage />
    </ThemeProvider>
  );
};

export default App;
