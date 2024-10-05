import { forwardRef, MouseEventHandler, useRef } from "react";
import clsx from "clsx";

import { CheckboxProps } from "./interface";
import styles from "./Checkbox.module.scss";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      classNameContainer,
      id = "checkbox1",
      label = "",
      checked = false,
      disabled = false,
      onChange = () => {},
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();

      if (disabled) return;

      if (inputRef.current) {
        inputRef.current?.click();
      }
    };

    return (
      <div
        onClick={handleClick}
        className={clsx(classNameContainer, styles.container, {
          [styles.containerDisabled]: disabled,
        })}
      >
        <input
          ref={ref ? ref : inputRef}
          type="checkbox"
          id={id}
          className="custom-checkbox"
          checked={checked}
          onChange={onChange}
          {...rest}
        />
        {!checked && (
          <span
            className={clsx(styles.uncheck, {
              [styles.uncheckDisable]: disabled,
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill={disabled ? "currentColor" : "none"}
            >
              <rect
                x="2.5"
                y="2.5"
                width="15"
                height="15"
                rx="3.5"
                stroke="currentColor"
              />
            </svg>
          </span>
        )}

        {!!checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <rect
              x="2.5"
              y="2.5"
              width="15"
              height="15"
              rx="3.5"
              fill={disabled ? "white" : "#FF7855"}
              stroke={disabled ? "#efefef80" : "#FF7855"}
            />
            <path
              d="M14.7709 6.23151C14.7048 6.15815 14.6261 6.09993 14.5394 6.06019C14.4527 6.02046 14.3597 6 14.2657 6C14.1718 6 14.0788 6.02046 13.9921 6.06019C13.9054 6.09993 13.8267 6.15815 13.7605 6.23151L8.45949 12.0701L6.23235 9.61259C6.16367 9.53961 6.08259 9.48223 5.99375 9.44372C5.90491 9.40521 5.81004 9.38633 5.71457 9.38814C5.61909 9.38996 5.52488 9.41244 5.4373 9.45431C5.34972 9.49618 5.2705 9.55661 5.20416 9.63215C5.13782 9.7077 5.08565 9.79687 5.05064 9.89459C5.01563 9.99231 4.99846 10.0967 5.00011 10.2017C5.00176 10.3067 5.0222 10.4103 5.06027 10.5066C5.09833 10.603 5.15327 10.6901 5.22195 10.7631L7.95429 13.7685C8.02044 13.8418 8.09914 13.9001 8.18585 13.9398C8.27256 13.9795 8.36556 14 8.45949 14C8.55343 14 8.64643 13.9795 8.73314 13.9398C8.81985 13.9001 8.89855 13.8418 8.96469 13.7685L14.7709 7.38201C14.8432 7.30872 14.9008 7.21977 14.9402 7.12077C14.9796 7.02176 15 6.91485 15 6.80676C15 6.69867 14.9796 6.59176 14.9402 6.49275C14.9008 6.39375 14.8432 6.3048 14.7709 6.23151Z"
              fill={disabled ? "#00000040" : "white"}
            />
          </svg>
        )}

        {!!label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
