import { ReactNode } from "react";

export interface BreadcrumbsProps {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	separator?: string;
}

export interface BreadcrumbsItem {
	href?: string;
	name?: string;
}
