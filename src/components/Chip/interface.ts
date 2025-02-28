import { CSSProperties, ReactNode } from 'react';

export interface ChipProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	variant?: 'filled' | 'outline';
	size?: 'Medium' | 'Small' | 'Tiny';
	type?: 'Default' | 'Success' | 'Info' | 'Warning' | 'Error';
	iconLeft?: ReactNode;
	onClick?: () => void;
}
