import LoaderPage from "loaders/LoaderPage";
import useUserInfo from "hooks/users/useUserInfo";
import { Navigate, Outlet } from "react-router-dom";
import { isValidToken } from "helpers/token";

export default function RedirectRoute() {
  const { user, isLoading } = useUserInfo();

  if (isLoading) return <LoaderPage />;

  if (user && isValidToken()) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
