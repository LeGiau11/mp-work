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

import { ToggleProps } from './interface';
import styles from './Toggle.module.scss';

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      id = 'toggle',
      label,
      classNameContainer,
      className,
      position = 'left',
      checked,
      disabled = false,
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
		 * Handle Click
		 *
		 * @param event MouseEvent<HTMLDivElement>
		 * @returns {void}
		 */
    const handleClick: MouseEventHandler<HTMLDivElement> = (
      event: MouseEvent<HTMLDivElement>,
    ): void => {
      event.preventDefault();

      if (disabled) return;

      if (checked === undefined) setVal(!val);

      if (inputRef.current) inputRef.current?.click();
    };

    /**
		 *
		 * Handle Key down
		 *
		 * @param event KeyboardEvent<HTMLDivElement>
		 * @returns {void}
		 */
    const handleKeydown: KeyboardEventHandler<HTMLDivElement> = (
      event: KeyboardEvent<HTMLDivElement>,
    ): void => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        inputRef.current?.click();
      }
    };

    return (
      <div
        className={clsx(classNameContainer, styles.container, {
          [styles.left]: newPosition == 'left',
          [styles.right]: newPosition == 'right',
          [styles.disabled]: disabled,
        })}
        onClick={handleClick}
        onKeyDown={handleKeydown}
      >
        {position === 'left' && <span>{label}</span>}
        <input
          type="checkbox"
          className={className}
          id={id}
          ref={ref ? ref : inputRef}
          checked={checked !== undefined ? checked : val}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />
        <label htmlFor={id}></label>
        {position === 'right' && <span>{label}</span>}
      </div>
    );
  },
);

Toggle.displayName = 'Toggle';

export default Toggle;
