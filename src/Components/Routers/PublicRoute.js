import useUserInfo from "hooks/users/useUserInfo";
import { Outlet } from "react-router-dom";

export default function PublicRoute(props) {
  const { isLoading } = useUserInfo();

  if (isLoading) return "cargando...";

  return <Outlet {...props} />;
}
