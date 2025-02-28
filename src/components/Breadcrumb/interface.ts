import { ReactNode } from 'react';

export interface BreadcrumbProps {
	children?: ReactNode;
}

export interface BreadcrumbItemProps {
	children?: ReactNode;
	href?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	disabled?: boolean;
}

export interface BreadcrumbSeparatorProps {
	separator?: string;
}
