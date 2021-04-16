// imports for Material UI components
import { Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
      <Typography variant="h1" color="primary" gutterBottom>
        Hello World
      </Typography>
    </ThemeProvider>
  );
};

export default App;
