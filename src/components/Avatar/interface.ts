import { CSSProperties, ReactNode } from "react";

export interface AvatarProp {
	src?: string;
	icon?: ReactNode;
	text?: string;
	size?:
		| "XXXL"
		| "XXL"
		| "XL"
		| "giant"
		| "large"
		| "medium"
		| "small"
		| "tiny";
	style?: CSSProperties;
	className?: string;
	status?: "available" | "offline" | "busy" | "away";
	showStatus?:boolean;
}
