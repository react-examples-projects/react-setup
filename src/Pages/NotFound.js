import useBody from "hooks/useBody";
import { Link } from "react-router-dom";
import { Button, Text } from "@geist-ui/core";
import useUserInfo from "hooks/useUserInfo";

export default function NotFound() {
  useBody({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  });
  const { user, isLoading } = useUserInfo();
  const link = user !== null ? "/dashboard" : "/";
  if (isLoading) return null;

  return (
    <>
      <div
        className="text-center mx-auto mt-5 d-flex flex-column align-content-center justify-content-center"
        style={{ maxWidth: "600px" }}
      >
        <Text style={{ fontSize: "2rem" }} h1>
          Página o recurso no encontrado
        </Text>
        <Text className="text-muted" p>
          La página o recurso que intentas acceder fue eliminado o no fue
          encontrado en nuestro servidores.
        </Text>

        <div className="d-flex w-100 justify-content-center">
          <Link to={link}>
            <Button type="success">Ir al inicio</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
