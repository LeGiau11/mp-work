import { FC, useState } from "react";
import clsx from "clsx";

import styles from "./input-password.module.scss";
import { InputPassWordProps } from "./interface";
import { Eye, EyeSlash } from "@/svg";

const InputPassword: FC<InputPassWordProps> = ({
	value = "",
	placeholder = "",
	className = "",
	name = "inputPassword",
	id = "",
	isError = false,
	onChange = () => {},
	onBlur,
	onCopy,
	onCut,
	onPaste,
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const handleShowPassword = () => setShowPassword(!showPassword);
	const handleFocus = () => setIsFocus(!isFocus);
	const handleBlur = () => setIsFocus(!isFocus);

	return (
		<>
			<span
				className={clsx(className, styles.container, {
					[styles.containerFocus]: isFocus,
					[styles.inputError]: isError,
				})}
			>
				<input
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					type={showPassword ? "text" : "password"}
					onBlur={(e) => {
						if (handleBlur) handleBlur;
						if (onBlur) onBlur(e);
					}}
					onFocus={handleFocus}
					onCopy={(e) => {
						e.preventDefault();
						onCopy?.(e);
					}}
					onCut={(e) => {
						e.preventDefault();
						onCut?.(e);
					}}
					onPaste={(e) => {
						e.preventDefault();
						onPaste?.(e);
					}}
				/>
				<span
					onClick={handleShowPassword}
					id="togglePassword"
					className={styles.toggleIcon}
				>
					{showPassword ? <Eye /> : <EyeSlash />}
				</span>
			</span>
		</>
	);
};

export default InputPassword;
