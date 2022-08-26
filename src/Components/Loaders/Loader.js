import styles from "styles/Loader.module.scss";

export default function Loader(props) {
  return (
    <svg viewBox="25 25 50 50" className={styles.loader} {...props}>
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  );
}
