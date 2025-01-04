import clsx from "clsx";
import { forwardRef, MouseEventHandler, useRef } from "react";

import styles from "./Checkbox.module.scss";
import { CheckboxProps } from "./interface";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			classNameContainer,
			id = "checkbox",
			label = "",
			checked = false,
			disabled = false,
			indeterminate = false,
			position = "left",
			onChange = () => {},
			...rest
		},
		ref,
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
					[styles.disabled]: disabled,
					[styles.left]: position === "left",
					[styles.right]: position === "right",
					[styles.indeterminate]: indeterminate,
				})}
			>
				<input
					ref={ref ? ref : inputRef}
					type="checkbox"
					id={id}
					className="custom-checkbox"
					checked={checked}
					disabled={disabled}
					onChange={onChange}
					{...rest}
				/>
				<label htmlFor={id}>{label}</label>
			</div>
		);
	},
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
