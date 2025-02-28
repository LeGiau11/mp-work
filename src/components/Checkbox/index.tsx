import {
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import { CheckboxProps } from './interface';
import styles from './Checkbox.module.scss';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      classNameContainer,
      id = 'checkbox',
      label = '',
      checked,
      disabled = false,
      indeterminate = false,
      position = 'left',
      onChange = () => {},
      ...rest
    },
    ref,
  ) => {
    const [val, setVal] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const newPosition = useMemo(() => {
      if (!position) return 'left';

      return position;
    }, [position]);

    /**
		 *
		 * Handle click
		 *
		 * @param event MouseEvent<HTMLDivElement>,
		 * @returns {void}
		 *
		 * Step1: Blocked any event other.
		 * Step2: Checked condition is status disabled
		 * if it is a disabled then exit function
		 * Step3: Checked condition with checked is undefined
		 * if it is a undefined then update state val
		 * Step4: Checked inputRef.current is exist.
		 * if it is exist then add event click it.
		 */
    const handleClick: MouseEventHandler<HTMLDivElement> = (
      event: MouseEvent<HTMLDivElement>,
    ) => {
      event.preventDefault();

      if (disabled) return;

      if (checked === undefined) setVal(!val);

      if (inputRef.current) inputRef.current?.click();
    };

    /**
		 *
		 * Handle Key down
		 *
		 * @param event: KeyboardEvent<HTMLDivElement>
		 * @returns {void}
		 *
		 * Step1: checked condition with key is Space or it's Enter
		 * Step2: if it's Space or Enter then add event current click
		 */
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (
      event: KeyboardEvent<HTMLDivElement>,
    ): void => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        inputRef.current?.click();
      }
    };

    return (
      <div
        onClick={handleClick}
        className={clsx(classNameContainer, styles.container, {
          [styles.disabled]: disabled,
          [styles.left]: newPosition === 'left',
          [styles.right]: newPosition === 'right',
          [styles.indeterminate]: indeterminate,
        })}
        onKeyDown={handleKeyDown}
      >
        <input
          ref={ref ? ref : inputRef}
          type="checkbox"
          id={id}
          className="custom-checkbox"
          checked={checked !== undefined ? checked : val}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
