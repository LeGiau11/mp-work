import { forwardRef, MouseEventHandler, useMemo, useRef } from "react";
import clsx from "clsx";

import { RadioProps } from "./interface";
import styles from "./Radio.module.scss";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			id = "radio",
			classNameContainer = "",
			label = "",
			checked = false,
			disabled = false,
			position = "left",
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

		const handleClick: MouseEventHandler<HTMLDivElement> | undefined = (
			event,
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
					[styles.disabled]: disabled,
					[styles.left]: newPosition == "left",
					[styles.right]: newPosition == "right",
				})}
			>
				<input
					id={id}
					ref={ref ? ref : inputRef}
					checked={checked}
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
