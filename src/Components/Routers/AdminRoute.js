import LoaderPage from "loaders/LoaderPage";
import useUserInfo from "hooks/users/useUserInfo";
import { Navigate, Outlet } from "react-router-dom";
import { isValidToken } from "helpers/token";
import { USER_RANKS } from "Config";

export default function AdminRoute(props) {
  const { user, isLoading } = useUserInfo();

  if (isLoading) return <LoaderPage />;

  if (user && user.rank === USER_RANKS.ADMIN.name && isValidToken())
    return <Outlet {...props} />;

  return <Navigate to="/" replace />;
}
