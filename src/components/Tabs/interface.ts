import { CSSProperties, ReactNode } from "react";

export interface Tabs {
	children?: ReactNode;
	className?: string;
	defaultTab?: string | number;
	style?: CSSProperties;
	data?: TabItem[];
}
export interface TabsPane extends Omit<Tabs, "defaultTab" | "data"> {
	label: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	disabled?: boolean;
}

export interface TabItem extends TabsPane {}
