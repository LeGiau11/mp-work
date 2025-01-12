import { CSSProperties, ReactNode } from "react";

export interface TooltipProp {
	position?:
		| "left"
		| "right"
		| "top"
		| "topLeft"
		| "topRight"
		| "bottom"
		| "bottomLeft"
		| "bottomRight";
	title?: string;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	trigger?: "hover" | "click";
}
