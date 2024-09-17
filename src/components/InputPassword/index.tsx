import { FC } from "react";

import styles from "./input-password.module.scss";
import { InputPassWordProps } from "./interface";
import { Eye } from "@/svg";

const InputPassword: FC<InputPassWordProps> = ({ ...rest }) => {
  return (
    <>
      <span className={styles.container}>
        <input type="password" {...rest} />
        <span id="togglePassword" className={styles.toggleIcon}>
          <Eye />
        </span>
      </span>
    </>
  );
};

export default InputPassword;
