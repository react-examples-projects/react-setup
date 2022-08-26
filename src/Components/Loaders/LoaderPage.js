import css from "styles/Loaders.module.scss";
import Loader from "./Loader";
export default function LoaderPage() {
  return (
    <div className={css.loaderPage}>
      <Loader />
    </div>
  );
}
