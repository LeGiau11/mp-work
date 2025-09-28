import { ReactNode } from "react";

export interface MenuProp {
	key?: string;
	label?: string | number;
	icon?: ReactNode;
	onClick?: () => void;
}
