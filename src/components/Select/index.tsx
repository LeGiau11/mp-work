import { FC } from "react";
import clsx from "clsx";

import { SelectProps } from "./interface";
import styles from "./select.module.scss";

const Select: FC<SelectProps> = ({ children, className, ...rest }) => {
  return (
    <select className={clsx(styles.select, className)} {...rest}>
      {children}
    </select>
  );
};

export default Select;
