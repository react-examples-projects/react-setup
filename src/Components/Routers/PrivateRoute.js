import LoaderPage from "components/Loaders/LoaderPage";
import useUserInfo from "hooks/useUserInfo";
import { Navigate, Outlet } from "react-router-dom";
import { isValidToken } from "helpers/token";

export default function PrivateRoute({ ...props }) {
  const { user, isLoading } = useUserInfo();

  if (isLoading) return <LoaderPage />;

  if (user && isValidToken()) return <Outlet {...props} />;

  return <Navigate to="/" replace />;
}