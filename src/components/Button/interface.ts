import { CSSProperties, ReactNode } from "react";

export interface ButtonProps {
	label?: string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	type?: "button" | "reset" | "submit";
	disabled?: boolean;
	variant?: "text" | "contained" | "outlined" | "danger";
	rounded?: boolean;
	size?: "Giant" | "Large" | "Medium" | "Small" | "Tiny";
	onClick?: () => void;
}

export interface ButtonIconProps
	extends Omit<ButtonProps, "iconLeft" | "iconRight"> {}
