// imports for 3rd party libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// imports for custom components
import { OnboardPage } from "../pages/onboard";
import { HomePage } from "../pages/user/home";
import { DetailsPage } from "../pages/user/details";
import { CheckoutPage } from "../pages/user/checkout";
import { SummaryPage } from "../pages/user/summary";
import { NotFoundPage } from "../pages/notfound";

// imports for contexts
import { AuthProvider } from "../contexts/AuthContext";

// imports for routes
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={OnboardPage}></Route>
          <Route exact path={["/home", "/"]} component={HomePage}></Route>
          <Route exact path="/courses/:id" component={DetailsPage}></Route>
          <ProtectedRoute
            exact
            path="/checkout"
            component={CheckoutPage}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/summary"
            component={SummaryPage}
          ></ProtectedRoute>
          <Route path="*" component={NotFoundPage}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default Routes;
