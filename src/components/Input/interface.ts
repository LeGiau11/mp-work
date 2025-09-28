import { ChangeEvent, CSSProperties, HTMLInputTypeAttribute } from "react";

export interface InputProps {
	label?: string;
	htmlFor?: string;
	prefix?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	value?: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	inputStyle?: CSSProperties;
	inputClassName?: string;
	name?: string;
	isError?: boolean;
	tabIndex?: number;
	onBlur?: (event?: ChangeEvent<HTMLInputElement>) => void;
	onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
}
