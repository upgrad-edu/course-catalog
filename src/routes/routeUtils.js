import * as routeConstants from "./routeConstants";

export const getDetailsPageRouteUrl = (courseId) => {
  const regex = /:ID/i;
  return routeConstants.ROUTE_URL.DETAILS.replace(regex, courseId);
};
