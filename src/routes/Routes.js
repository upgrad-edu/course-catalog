// imports for 3rd party libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// imports for custom components
import { OnboardPage } from "../pages/onboard";
import { HomePage } from "../pages/user/home";
import { DetailsPage } from "../pages/user/details";
import { CheckoutPage } from "../pages/user/checkout";
import { SummaryPage } from "../pages/user/summary";
import { ListPage } from "../pages/admin/list";
import { EditPage } from "../pages/admin/edit";
import { NotFoundPage } from "../pages/notfound";

// imports for contexts
import { AuthProvider } from "../contexts/AuthContext";

// imports for routes
import ProtectedRoute from "./ProtectedRoute";
import * as routeConstants from "./routeConstants";

const Routes = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* User Routes */}
          <Route
            exact
            path={routeConstants.ROUTE_URL.ONBOARD}
            component={OnboardPage}
          ></Route>
          <Route
            exact
            path={[
              routeConstants.ROUTE_URL.HOME,
              routeConstants.ROUTE_URL.ROOT,
            ]}
            component={HomePage}
          ></Route>
          <Route
            exact
            path={routeConstants.ROUTE_URL.DETAILS}
            component={DetailsPage}
          ></Route>
          <ProtectedRoute
            exact
            path={routeConstants.ROUTE_URL.CHECKOUT}
            component={CheckoutPage}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path={routeConstants.ROUTE_URL.SUMMARY}
            component={SummaryPage}
          ></ProtectedRoute>

          {/* Admin Routes */}
          <Route
            exact
            path={routeConstants.ROUTE_URL.COURSES_LIST}
            component={ListPage}
          ></Route>
          <Route
            exact
            path={routeConstants.ROUTE_URL.EDIT_COURSE}
            component={EditPage}
          ></Route>

          {/* Not Found Page Route */}
          <Route
            path={routeConstants.ROUTE_URL.ANY}
            component={NotFoundPage}
          ></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default Routes;
