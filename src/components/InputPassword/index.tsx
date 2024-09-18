import { FC, useState } from "react";
import clsx from "clsx";

import styles from "./input-password.module.scss";
import { InputPassWordProps } from "./interface";
import { Eye, EyeSlash } from "@/svg";

const InputPassword: FC<InputPassWordProps> = ({
  value = "",
  placeholder = "",
  className = "",
  onChange = () => {},
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleFocus = () => setIsFocus(!isFocus);
  const handleBlur = () => setIsFocus(!isFocus);

  return (
    <>
      <span
        className={clsx(className, styles.container, {
          [styles.containerFocus]: isFocus,
        })}
      >
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <span
          onClick={handleShowPassword}
          id="togglePassword"
          className={styles.toggleIcon}
        >
          {showPassword ? <EyeSlash /> : <Eye />}
        </span>
      </span>
    </>
  );
};

export default InputPassword;
