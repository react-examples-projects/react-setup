import { lazy } from "react";
import { privateRoute, redirectRoute, route } from "helpers/utils";
import Layout from "components/Layout";

const App = lazy(() => import("pages/App"));
const Users = lazy(() => import("pages/Users"));
const NotFound = lazy(() => import("pages/NotFound"));

const options = { layout: Layout };

const routers = [
  route(App, "/", options),
  route(Users, "users", options),
  route(NotFound),
];

export default routers;
