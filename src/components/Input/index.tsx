import React, { FC, Fragment, createElement, ReactNode } from "react";

import { InputProps } from "./interface";
import styles from "./input.module.scss";

const Input: FC<InputProps> = ({
  label,
  htmlFor = "myInput",
  className = "",
  prefix,
  ...rest
}) => {
  const Wrapper: FC<{ children?: ReactNode }> = prefix
    ? (props) =>
        createElement("span", { className: styles.inputPrefix, ...props })
    : Fragment;

  return (
    <Wrapper>
      {prefix ? <span className={styles.prefix}>{prefix}</span> : null}
      {label ? <label htmlFor={htmlFor}>{label}:</label> : null}
      <input
        id={label ? htmlFor : ""}
        className={className ? className : styles.input}
        {...rest}
      />
    </Wrapper>
  );
};

export default Input;
