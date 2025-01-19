import React, { ChangeEvent, FC, forwardRef, useState } from "react";
import clsx from "clsx";

import { InputProps } from "./interface";
import styles from "./input.module.scss";

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			htmlFor = "myInput",
			className = "",
			prefix,
			style,
			name = "inputText",
			value = "",
			type = "text",
			placeholder = "",
			inputStyle,
			isError = false,
			onChange = () => {},
			...rest
		},
		ref,
	) => {
		const [isFocus, setIsFocus] = useState<boolean>(false);

		const handleBlur = () => setIsFocus(!isFocus);
		const handleFocus = () => setIsFocus(!isFocus);

		const handleChange = (event?: ChangeEvent<HTMLInputElement>) =>
			onChange(event);

		return (
			<span
				className={clsx(className, styles.inputPrefix, {
					[styles.inputPrefixFocus]: isFocus,
					[styles.inputError]: isError,
				})}
				style={style}
			>
				{prefix ? <span className={styles.prefix}>{prefix}</span> : null}
				{label ? <label htmlFor={htmlFor}>{label}:</label> : null}
				<input
					ref={ref}
					type={type}
					id={label ? htmlFor : ""}
					onChange={handleChange}
					name={name}
					value={value}
					placeholder={placeholder}
					onBlur={handleBlur}
					onFocus={handleFocus}
					style={inputStyle}
					tabIndex={0}
					{...rest}
				/>
			</span>
		);
	},
);

export default Input;
