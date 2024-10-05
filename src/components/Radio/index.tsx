import { forwardRef, MouseEventHandler, useRef } from "react";
import clsx from "clsx";

import { RadioProps } from "./interface";
import styles from "./Radio.module.scss";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      classNameContainer = "",
      label = "",
      checked = false,
      disabled = false,
      onChange = () => {},
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick: MouseEventHandler<HTMLDivElement> | undefined = (
      event
    ) => {
      event.preventDefault();

      if (disabled) return;

      if (inputRef.current) {
        inputRef.current.click();
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
          checked={checked}
          onChange={onChange}
          type="radio"
          {...rest}
        />
        {!checked && (
          <span
            className={clsx(styles.uncheck, {
              [styles.uncheckDisabled]: disabled,
            })}
          >
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
                rx="7.5"
                stroke="currentColor"
              />
            </svg>
          </span>
        )}

        {!!checked && (
          <span
            className={clsx(styles.check, { [styles.checkDisabled]: disabled })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.99935 18.3332C5.39685 18.3332 1.66602 14.6023 1.66602 9.99984C1.66602 5.39734 5.39685 1.6665 9.99935 1.6665C14.6018 1.6665 18.3327 5.39734 18.3327 9.99984C18.3327 14.6023 14.6018 18.3332 9.99935 18.3332ZM9.99935 13.3332C10.8834 13.3332 11.7312 12.982 12.3564 12.3569C12.9815 11.7317 13.3327 10.8839 13.3327 9.99984C13.3327 9.11578 12.9815 8.26794 12.3564 7.64281C11.7312 7.01769 10.8834 6.6665 9.99935 6.6665C9.11529 6.6665 8.26745 7.01769 7.64233 7.64281C7.0172 8.26794 6.66602 9.11578 6.66602 9.99984C6.66602 10.8839 7.0172 11.7317 7.64233 12.3569C8.26745 12.982 9.11529 13.3332 9.99935 13.3332Z"
                fill="currentColor"
              />
            </svg>
          </span>
        )}

        {!!label && <label>{label}</label>}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
