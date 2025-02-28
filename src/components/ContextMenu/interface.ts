import {
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  RefObject,
} from 'react';

import { MenuType as Menu } from '@/components';

export interface ContextMenuProps {
	targetRef?: RefObject<HTMLElement>;
	items?: Menu[];
	children?: ReactNode;
	anchor?: 'left' | 'right' | 'bottom' | 'top';
}
export interface Position {
	x?: number;
	y?: number;
}

export interface ContextMenuItemProps
	extends Omit<ContextMenuProps, 'items' | 'targetRef' | 'anchor'> {
	style?: CSSProperties;
	className?: string;
}

export type ContextMenuComponent = ForwardRefExoticComponent<
	RefAttributes<HTMLDivElement> & PropsWithoutRef<ContextMenuProps>
> & {
	Item: FC<ContextMenuItemProps>;
};

export interface ValAnchor {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
}
