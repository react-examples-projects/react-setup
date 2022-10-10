import css from "./landing.module.scss";
import cls from "classnames";
import { Button, Text, Grid } from "@geist-ui/core";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <div className={css.logo}>
          <h1>
            <Text type="success" b>
              ReactDashboard
            </Text>
          </h1>
        </div>

        <nav className={css.nav}>
          <Link to="#whatis" className={cls(css.navItem, "text-muted")}>
            ¿Qué es?
          </Link>
          <Link to="#feactures" className={cls(css.navItem, "text-muted")}>
            Carácteristicas
          </Link>
          <Link to="#technologies" className={cls(css.navItem, "text-muted")}>
            Tecnologías
          </Link>
          <Link to="#contribute" className={cls(css.navItem, "text-muted")}>
            Contribuir
          </Link>

          <Button
            scale={0.7}
            type="success-light"
            className={cls(css.btnLogin)}
          >
            Iniciar Sesión
          </Button>
        </nav>
      </header>
      <div className={css.banner}>
        <h2 className="fw-bold mb-3">React App Dashboard</h2>

        <p className={cls("mt-2 text-muted", css.lead)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          veritatis magnam veniam ducimus sint odit doloribus aspernatur eius,
          non inventore corrupti magni tempora.
        </p>
      </div>
    </div>
  );
}
