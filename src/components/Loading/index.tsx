import { FC } from "react";
import styles from "./Loading.module.scss";

const Loading1: FC = () => {
  return (
    <div className={styles.center}>
      <div className={styles.ring}></div>
      <span className={styles.loading}>loading...</span>
    </div>
  );
};

const Loading: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}></div>
    </div>
  );
};

export { Loading1, Loading };
