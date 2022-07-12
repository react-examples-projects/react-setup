import styles from "styles/Alerts.module.scss";
import cls from "classnames";
import { FiAlertCircle } from "react-icons/fi";

export default function Alert({ title, content, className, visible, ...args }) {
  if (!visible) return null;
  
  return (
    <div className={cls(styles.alert, className)} {...args}>
      <FiAlertCircle className={styles.alertIcon} />
      <div className={styles.alertBody}>
        <strong className="d-block">{title}</strong>
        <p className={styles.alertContent}>{content}</p>
      </div>
    </div>
  );
}
