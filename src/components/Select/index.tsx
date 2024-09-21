import { FC, useRef } from "react";
import clsx from "clsx";

import { SelectProps } from "./interface";
import styles from "./select.module.scss";

const Select: FC<SelectProps> = ({
  children,
  className,
  value = "",
  onChange = () => {},
  ...rest
}) => {
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const handleForcus = () => {
    if (arrowRef.current) {
      arrowRef.current?.classList.add(styles.rotated);
    }
  };

  const handleBlur = () => {
    if (arrowRef.current) {
      if (!value) {
        arrowRef.current.classList.remove(styles.rotated);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
    if (arrowRef.current) {
      arrowRef.current.classList.remove(styles.rotated);
    }
  };

  return (
    <div
      onFocus={handleForcus}
      onBlur={handleBlur}
      className={clsx(styles.selectContainer)}
    >
      <select
        value={value}
        onChange={handleChange}
        className={clsx(styles.select, className)}
        {...rest}
      >
        {children}
      </select>
      <div ref={arrowRef} className={styles.arrow}>
        ▼
      </div>
    </div>
  );
};

export default Select;
