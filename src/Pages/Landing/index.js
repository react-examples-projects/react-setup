import css from "./landing.module.scss";
import cls from "classnames";
import reactImg from "assets/react.png";
import nodeImg from "assets/nodejs.png";
import expressImg from "assets/expressjs.png";
import mongoImg from "assets/mongodb.png";
import mongooseImg from "assets/mongoose.png";
import { Button, Text, Grid, Image } from "@geist-ui/core";
import { Link } from "react-router-dom";
import {
  FiDatabase,
  FiGrid,
  FiLayout,
  FiMail,
  FiSettings,
  FiShield,
} from "react-icons/fi";

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

      <section className={css.banner}>
        <h2 className="fw-bold mb-3">React App Dashboard</h2>

        <p className={cls("mt-2 text-muted", css.lead)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          veritatis magnam veniam ducimus sint odit doloribus aspernatur eius,
          non inventore corrupti magni tempora.
        </p>

        <Grid.Container className="mt-5" gap={2}>
          <Grid
            xs={24}
            sm={24}
            md={12}
            lg={8}
            className="flex-column text-start"
            width="100%"
          >
            <FiDatabase className={css.feactureSvg} />
            <h4 className={cls("mt-2", css.feactureTitle)}>Base de Datos</h4>
            <p className="text-muted mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quod tenetur totam vero, dolores saepe facilis soluta explicabo
              ratione delectus modi,
            </p>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={12}
            lg={8}
            className="flex-column text-start"
            width="100%"
          >
            <FiGrid className={css.feactureSvg} />
            <h4 className={cls("mt-2", css.feactureTitle)}>
              Basado en Componentes
            </h4>
            <p className="text-muted mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quod tenetur totam vero, dolores saepe facilis soluta explicabo
              ratione delectus modi,
            </p>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={12}
            lg={8}
            className="flex-column text-start"
            width="100%"
          >
            <FiLayout className={css.feactureSvg} />
            <h4 className={cls("mt-2", css.feactureTitle)}>Diseño Adaptable</h4>
            <p className="text-muted mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quod tenetur totam vero, dolores saepe facilis soluta explicabo
              ratione delectus modi,
            </p>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={12}
            lg={8}
            className="flex-column text-start"
            width="100%"
          >
            <FiMail className={css.feactureSvg} />
            <h4 className={cls("mt-2", css.feactureTitle)}>
              Sistema de Emails
            </h4>
            <p className="text-muted mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quod tenetur totam vero, dolores saepe facilis soluta explicabo
              ratione delectus modi,
            </p>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={12}
            lg={8}
            className="flex-column text-start"
            width="100%"
          >
            <FiSettings className={css.feactureSvg} />
            <h4 className={cls("mt-2", css.feactureTitle)}>Configurable</h4>
            <p className="text-muted mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quod tenetur totam vero, dolores saepe facilis soluta explicabo
              ratione delectus modi,
            </p>
          </Grid>

          <Grid
            xs={24}
            sm={24}
            md={12}
            lg={8}
            className="flex-column text-start"
            width="100%"
          >
            <FiShield className={css.feactureSvg} />
            <h4 className={cls("mt-2", css.feactureTitle)}>Seguro y Rápido</h4>
            <p className="text-muted mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quod tenetur totam vero, dolores saepe facilis soluta explicabo
              ratione delectus modi,
            </p>
          </Grid>
        </Grid.Container>
      </section>

      <section className={css.technologies}>
        <h3 className="text-center">
          Tecnologías usadas para la creación de este
          <Text type="success" className="ms-2 text-capitalize" b>
            proyecto
          </Text>
        </h3>

        <Grid.Container className="mt-4" gap={2}>
          <Grid xs={24} sm={24} md={12}>
            <div className={css.technologiesItem}>
              <h4>
                ReactJS para la interacción de la intefaz de usuario y la
                reactividad entre componentes
              </h4>
              <Link to="#">Saber más...</Link>
              <Image
                src={reactImg}
                alt="React Logo"
                width="125px"
                height="115px"
              />
            </div>
          </Grid>

          <Grid xs={24} sm={24} md={12}>
            <div className={css.technologiesItem}>
              <h4>
                Entorno NodeJS para la construcción del servidor y la gestión de
                rutas de una API Rest
              </h4>
              <Link to="#">Saber más...</Link>
              <Image
                src={nodeImg}
                alt="NodeJS Logo"
                width="125px"
                height="115px"
              />
            </div>
          </Grid>

          <Grid xs={24} sm={24} md={8}>
            <div className={css.technologiesItem}>
              <h4>
                ExpressJS para gestionar las rutas de un servidor de API Rest
              </h4>
              <Link to="#">Saber más...</Link>
              <Image
                src={expressImg}
                alt="ExpressJS Logo"
                width="80px"
                height="90px"
              />
            </div>
          </Grid>

          <Grid xs={24} sm={24} md={8}>
            <div className={css.technologiesItem}>
              <h4>MongoDB para el almacenamiento de información</h4>
              <Link to="#">Saber más...</Link>
              <Image
                src={mongoImg}
                alt="MongoDB Logo"
                width="80px"
                height="90px"
              />
            </div>
          </Grid>

          <Grid xs={24} sm={24} md={8}>
            <div className={css.technologiesItem}>
              <h4>Mongoose para la gestión más comoda de la API de MongoDB</h4>
              <Link to="#">Saber más...</Link>
              <Image
                src={mongooseImg}
                alt="Mongoose Logo"
                width="100px"
                height="90px"
              />
            </div>
          </Grid>
        </Grid.Container>
      </section>
    </div>
  );
}
