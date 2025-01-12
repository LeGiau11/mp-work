import { InputProps } from "@/common";

export interface ToggleProps extends Omit<InputProps, "type" | "ref"> {
	classNameContainer?: string;
	label?: string;
	indeterminate?: boolean;
	position?: "left" | "right";
}