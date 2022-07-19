import LoaderPage from "components/Loaders/LoaderPage";
import useUserInfo from "hooks/users/useUserInfo";
import { Navigate, Outlet } from "react-router-dom";
import { isValidToken } from "helpers/token";

export default function AdminRoute(props) {
  const { user, isLoading } = useUserInfo();

  if (isLoading) return <LoaderPage />;

  if (user && user.rank === "admin" && isValidToken())
    return <Outlet {...props} />;

  return <Navigate to="/" replace />;
}
