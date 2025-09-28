import { CSSProperties, ReactNode } from "react";

export interface ListMenu {
	label: string;
}

export interface List {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	data?: ListMenu[];
	showImage?: boolean;
	showIcon?: boolean;
	showRightText?: boolean;
	rightText?: string;
	showCheckbox?: boolean;
	showRadio?: boolean;
	showToggle?: boolean;
	icon?: ReactNode | JSX.Element;
}

export interface ListItem extends List {}
