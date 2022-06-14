import ColoredText from "components/Text/ColoredText";
import css from "styles/Dashboard.module.scss";
import cls from "classnames";
import useCurrentUser from "hooks/useCurrentUser";
import { Text, Grid } from "@geist-ui/core";
import { FiUsers } from "react-icons/fi";

export default function App() {
  const { user } = useCurrentUser();
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

        <img className={css.dashboardImg} alt="dashboard welcome" src="./img/dashboard.svg" />
      </div>

      <Grid.Container gap={1}>
        <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className={cls(css.dashboardCard, css.c1)}>
            <FiUsers className="d-block mb-2" style={{ fontSize: "1.5rem" }} />
            <Text className="mt-0" h5>
              32 Usuarios
            </Text>
            <Text small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              distinctio.
            </Text>
          </div>
        </Grid>

        <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className={cls(css.dashboardCard, css.c2)}>
            <FiUsers className="d-block mb-2" style={{ fontSize: "1.5rem" }} />
            <Text className="mt-0" h5>
              32 Roles
            </Text>
            <Text small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              distinctio.
            </Text>
          </div>
        </Grid>

        <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className={cls(css.dashboardCard, css.c3)}>
            <FiUsers className="d-block mb-2" style={{ fontSize: "1.5rem" }} />
            <Text className="mt-0" h5>
              32 Roles
            </Text>
            <Text small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              distinctio.
            </Text>
          </div>
        </Grid>
      </Grid.Container>
    </>
  );
}
