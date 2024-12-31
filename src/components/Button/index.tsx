import { FC } from "react";
import clsx from "clsx";

import { ButtonIconProps, ButtonProps } from "./interface";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> & {
	BIcon: FC<ButtonIconProps>;
} = ({
	label = "",
	children,
	className = "",
	style,
	type = "button",
	iconLeft,
	iconRight,
	disabled = false,
	rounded = false,
	variant = "contained",
	size = "Medium",
	onClick = () => {},
}) => {
	return (
		<button
			onClick={onClick}
			style={style}
			className={clsx(styles.button, className, {
				// [styles.danger]: variant === "danger",
				[styles.rounded]: rounded,
				[styles.giant]: size === "Giant",
				[styles.large]: size === "Large",
				[styles.medium]: size === "Medium",
				[styles.small]: size === "Small",
				[styles.tiny]: size === "Tiny",
				[styles.container]: variant === "contained",
				[styles.outlined]: variant === "outline",
				[styles.text]: variant === "text",
			})}
			type={type}
			disabled={disabled}
		>
			{iconLeft && (
				<span
					className={clsx(styles.icon, {
						[styles.iconContainer]: variant === "contained",
					})}
				>
					{iconLeft}
				</span>
			)}
			{label ? label : children}
			{iconRight && (
				<span
					className={clsx(styles.icon, {
						[styles.iconContainer]: variant === "contained",
					})}
				>
					{iconRight}
				</span>
			)}
		</button>
	);
};

const BIcon: FC<ButtonIconProps> = ({
	children,
	className,
	style = {},
	variant = "contained",
	size = "Medium",
	disabled = false,
	onClick = () => {},
}) => {
	return (
		<button
			onClick={onClick}
			className={clsx(className, styles.buttonIcon, {
				[styles.container]: variant === "contained",
				[styles.outlined]: variant === "outline",
				[styles.text]: variant === "text",
				[styles.giantBIcon]: size === "Giant",
				[styles.largeBIcon]: size === "Large",
				[styles.mediumBIcon]: size === "Medium",
				[styles.smallBIcon]: size === "Small",
				[styles.tinyBIcon]: size === "Tiny",
			})}
			style={style}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

Button.BIcon = BIcon;

export default Button;
