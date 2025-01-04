import { forwardRef, MouseEventHandler, useMemo, useRef } from "react";
import clsx from "clsx";

import { ToggleProps } from "./interface";
import styles from "./Toggle.module.scss";

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
	(
		{
			id = "toggle",
			label,
			classNameContainer,
			className,
			position = "left",
			checked = false,
			disabled = false,
			onChange = () => {},
			...rest
		},
		ref,
	) => {
		const inputRef = useRef<HTMLInputElement>(null);

		const newPosition = useMemo(() => {
			if (!position) return "left";
			return position;
		}, [position]);

		const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
			event.preventDefault();

			if (disabled) return;

			if (inputRef.current) inputRef.current?.click();
		};

		return (
			<div
				className={clsx(classNameContainer, styles.container, {
					[styles.left]: newPosition == "left",
					[styles.right]: newPosition == "right",
					[styles.disabled]: disabled,
				})}
				onClick={handleClick}
			>
				{position === "left" && <span>{label}</span>}
				<input
					type="checkbox"
					className={className}
					id={id}
					ref={ref ? ref : inputRef}
					checked={checked}
					disabled={disabled}
					onChange={onChange}
					{...rest}
				/>
				<label htmlFor={id}></label>
				{position === "right" && <span>{label}</span>}
			</div>
		);
	},
);

Toggle.displayName = "Toggle";

export default Toggle;
