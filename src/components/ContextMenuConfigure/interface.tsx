import { ReactNode } from 'react';
import { ContextMenuType, ContextMenuProps } from '@/components';

export interface ContextMenuConfigureProps
	extends Omit<ContextMenuProps, 'items' | 'targetRef'> {
	menu?: ContextMenuType[];
	customContextMenu?: ReactNode;
}
