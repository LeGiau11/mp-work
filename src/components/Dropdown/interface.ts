import { ReactNode } from 'react';

export interface DropdownProp {
	leftIcon?: ReactNode;
	isSearch?: boolean;
	menus: Menu[];
	disabled?: boolean;
	tabIndex?: number;
	onChange?: (menus:(Menu | string)[]) => void;
}

export interface Menu {
	icon?: ReactNode;
	label?: string;
	checked?: boolean;
	disabled?: boolean;
}
