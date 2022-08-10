import ColoredText from "components/Text/ColoredText";
import css from "styles/Dashboard.module.scss";
import cls from "classnames";
import useCurrentUser from "hooks/users/useCurrentUser";
import useDashboardInfo from "hooks/dashboard/useDashboardData";
import { Text, Grid, Spinner } from "@geist-ui/core";
import { FiUsers, FiStar } from "react-icons/fi";
import ErrorText from "components/Text/ErrorText";

export default function App() {
  const { user } = useCurrentUser();
  const { isLoading, data, isError } = useDashboardInfo();
  const ErrorTextContrast = (
    <ErrorText
      text="Error de red"
      style={{
        backgroundColor: "#0000004d",
        padding: "0.4rem",
        borderRadius: "4px",
      }}
      isVisible
    />
  );

  return (
    <>
      <ColoredText className="fw-bold" h3>
        Dashboard
      </ColoredText>
      <div className={css.dashboardHero}>
        <Text className="my-0 mb-1" p>
          Bienvenido de nuevo, {user.name}
        </Text>
        <Text className="my-0 fw-bold" h3>
          12 de enero, 2022
        </Text>

        <img
          className={css.dashboardImg}
          alt="dashboard welcome"
          src="./img/dashboard.svg"
        />
      </div>

      <Grid.Container gap={1}>
        <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className={cls(css.dashboardCard, css.c1)}>
            {isError ? (
              ErrorTextContrast
            ) : (
              <>
                <FiUsers
                  className="d-block mb-2"
                  style={{ fontSize: "1.5rem" }}
                />
                <Text className="mt-0 d-flex align-items-center" h5>
                  {isLoading ? <Spinner className="me-2" /> : data.users + " "}
                  Usuarios
                </Text>
              </>
            )}

            <Text small>Total de usuarios registrado en el sistema</Text>
          </div>
        </Grid>

        <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className={cls(css.dashboardCard, css.c2)}>
            {isError ? (
              ErrorTextContrast
            ) : (
              <>
                <FiUsers
                  className="d-block mb-2"
                  style={{ fontSize: "1.5rem" }}
                />
                <Text className="mt-0 d-flex align-items-center" h5>
                  {isLoading ? <Spinner className="me-2" /> : data.admins + " "}
                  Administradores
                </Text>
              </>
            )}

            <Text small>
              Total de usuarios con el rango de administrador registrados en el
              sistema
            </Text>
          </div>
        </Grid>

        <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className={cls(css.dashboardCard, css.c3)}>
            {isError ? (
              ErrorTextContrast
            ) : (
              <>
                <FiStar
                  className="d-block mb-2"
                  style={{ fontSize: "1.5rem" }}
                />
                <Text className="mt-0 d-flex align-items-center" h5>
                  {isLoading ? <Spinner className="me-2" /> : data.roles + " "}
                  Roles
                </Text>
              </>
            )}
            <Text small>
              Total de roles asignables a los usuarios del sistema
            </Text>
          </div>
        </Grid>
      </Grid.Container>
    </>
  );
}
