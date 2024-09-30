import { FC } from "react";
import clsx from "clsx";

import { ButtonProps } from "./interface";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({
  label = "",
  children,
  className = "",
  style,
  type = "button",
  icon,
  disabled = false,
  variant = "text",
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={clsx(styles.button, className, {
        [styles.disabled]: disabled,
        [styles.buttonText]: variant === "text",
        [styles.buttonContainer]: variant === "contained",
        [styles.buttonOutline]: variant === "outlined",
        [styles.buttonDanger]: variant === "danger",
        [styles.disabledText]: variant === "text" && disabled,
        [styles.disabledOutline]: variant === "outlined" && disabled,
        [styles.disabledDanger]: variant === "danger" && disabled,
      })}
      type={type}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label ? label : children}
    </button>
  );
};

export default Button;
