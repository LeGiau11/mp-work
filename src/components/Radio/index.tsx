import {
	forwardRef,
	KeyboardEvent,
	KeyboardEventHandler,
	MouseEvent,
	MouseEventHandler,
	useMemo,
	useRef,
	useState,
} from "react";
import clsx from "clsx";

import { RadioProps } from "./interface";
import styles from "./Radio.module.scss";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			id = "radio",
			classNameContainer = "",
			label = "",
			checked,
			disabled = false,
			position = "left",
			onChange = () => {},
			...rest
		},
		ref,
	) => {
		const [val, setVal] = useState<boolean>(false);
		const inputRef = useRef<HTMLInputElement>(null);

		const newPosition = useMemo(() => {
			if (!position) return "left";
			return position;
		}, [position]);

		/**
		 *
		 * Handle Click
		 * 
		 * @param event MouseEvent<HTMLDivElement>,
		 * @returns {void}
		 */
		const handleClick: MouseEventHandler<HTMLDivElement> = (
			event: MouseEvent<HTMLDivElement>,
		): void => {
			event.preventDefault();

			if (disabled) return;

			if (checked === undefined) setVal(true);

			if (inputRef.current) inputRef.current.click();
		};

		/**
		 * 
		 * Handle Key down
		 * 
		 * @param event KeyboardEvent<HTMLDivElement>
		 * @returns {void}
		 */
		const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (
			event: KeyboardEvent<HTMLDivElement>,
		): void => {
			if (event.key === " " || event.key === "Enter") {
				event.preventDefault();
				inputRef.current?.click();
			}
		};

		return (
			<div
				onClick={handleClick}
				className={clsx(classNameContainer, styles.container, {
					[styles.disabled]: disabled,
					[styles.left]: newPosition == "left",
					[styles.right]: newPosition == "right",
				})}
				onKeyDown={handleKeyDown}
			>
				<input
					id={id}
					ref={ref ? ref : inputRef}
					checked={checked !== undefined ? checked : val}
					onChange={onChange}
					type="radio"
					disabled={disabled}
					{...rest}
				/>
				<label htmlFor={id}>{label}</label>
			</div>
		);
	},
);

Radio.displayName = "Radio";

export default Radio;
