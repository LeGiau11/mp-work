import { ReactNode } from "react";
import { MenuType, ContextMenuProps } from "@/components";

export interface ContextMenuConfigureProps
	extends Omit<ContextMenuProps, "items" | "targetRef"> {
	menu?: MenuType[];
	customContextMenu?: ReactNode;
}
