import { FC } from "react";
import clsx from "clsx";

import { ButtonProps } from "./interface";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({
  label = "",
  children,
  className = "",
  style,
  type = "submit",
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
