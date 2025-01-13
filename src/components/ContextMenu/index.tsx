import { FC, forwardRef, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import {
	ContextMenuComponent,
	ContextMenuItemProps,
	ContextMenuProps,
	Menu,
	Position,
	ValAnchor,
} from "./interface";
import styles from "./ContextMenu.module.scss";

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
	({ items = [], targetRef, children, anchor = "left" }, ref) => {
		const [visible, setVisible] = useState<boolean>(false);
		const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
		const divRef = useRef<HTMLDivElement>(null);

		const handleClick = (e: MouseEvent): void => {
			if (targetRef?.current && targetRef.current.contains(e.target as Node)) {
				const rect = targetRef.current.getBoundingClientRect();
				console.log(rect);

				switch (anchor) {
					case "left": {
						setPosition({
							x: rect.width + 0.3 * rect.width + window.scrollX,
							y: 0 + window.scrollY,
						});

						break;
					}

					case "right": {
						setPosition({
							x: rect.width + 0.3 * rect.width + window.scrollX,
							y: 0 + window.scrollY,
						});

						break;
					}

					case "bottom": {
						setPosition({
							x: 0,
							y: rect.height + 0.3 * rect.height + window.scrollY,
						});

						break;
					}

					case "top": {
						setPosition({
							x: 0,
							y: rect.height + 0.3 * rect.height + window.scrollY,
						});

						break;
					}

					default:
						{
							setPosition({
								x: rect.width + 0.3 * rect.width + window.scrollX,
								y: 0 + window.scrollY,
							});
						}
						break;
				}

				setVisible(true);
			} else if (
				divRef?.current &&
				!divRef.current.contains(e.target as Node)
			) {
				setVisible(false);
			}
		};

		const handleContextMenu = (e: MouseEvent): void => {
			e.preventDefault();

			if (targetRef?.current && targetRef.current.contains(e.target as Node)) {
				const rect = targetRef.current.getBoundingClientRect();
				setPosition({
					x: rect.left + window.scrollX,
					y: rect.bottom + window.scrollY,
				});
				setVisible(true);
			}
		};

		const valAnchor: ValAnchor = useMemo(() => {
			switch (anchor) {
				case "left":
					return {
						top: position.y,
						left: position.x,
					};

				case "right":
					return {
						top: position.y,
						right: position.x,
					};

				case "top":
					return {
						bottom: position.y,
						left: position.x,
					};

				case "bottom":
					return {
						top: position.y,
						left: position.x,
					};

				default:
					return {
						top: position.y,
						left: position.x,
					};
			}
		}, [anchor, position]);

		useEffect(() => {
			document.addEventListener("click", handleClick);
			document.addEventListener("contextmenu", handleContextMenu);

			return () => {
				document.removeEventListener("click", handleClick);
				document.removeEventListener("contextmenu", handleContextMenu);
			};
		}, []);

		return (
			visible && (
				<div
					style={valAnchor}
					ref={ref ? ref : divRef}
					className={clsx(styles.container)}
				>
					{items.length > 0 ? (
						<ul>
							{items.map((item, index) => (
								<li onClick={item.onClick} key={index}>
									<span>{item.icon}</span> {item.label}
								</li>
							))}
						</ul>
					) : (
						<ul>{children}</ul>
					)}
				</div>
			)
		);
	},
) as ContextMenuComponent;

const ContextMenuItem: FC<ContextMenuItemProps> = ({
	children,
	className,
	style = {},
}) => {
	return (
		<li className={className} style={style}>
			{children}
		</li>
	);
};

ContextMenu.Item = ContextMenuItem;

export default ContextMenu;
export type { Menu, ContextMenuProps };
