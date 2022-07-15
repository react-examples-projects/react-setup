import { lazy } from "react";
import { privateRoute, redirectRoute, route, adminRoute } from "helpers/utils";
import Layout from "components/Layout";

const App = lazy(() => import("pages/App"));
const Users = lazy(() => import("pages/Users"));
const NotFound = lazy(() => import("pages/NotFound"));
const Signup = lazy(() => import("pages/Signup"));
const Login = lazy(() => import("pages/Login"));
const options = { layout: Layout };

const routers = [
  redirectRoute(Login, "/"),
  redirectRoute(Signup, "/signup"),
  privateRoute(App, "/dashboard", options),
  adminRoute(Users, "/users", options),
  route(NotFound),
];

export default routers;
