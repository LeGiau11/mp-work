import React, { FC } from "react";

import { InputProps } from "./interface";
import styles from "./input.module.scss";

const Input: FC<InputProps> = ({
  label,
  htmlFor = "myInput",
  className = "",
  ...rest
}) => {
  return (
    <>
      {label ? <label htmlFor={htmlFor}>{label}:</label> : null}
      <input
        id={label ? htmlFor : ""}
        className={className ? className : styles.input}
        {...rest}
      />
    </>
  );
};

export default Input;
