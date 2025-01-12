import { FC, useMemo, useState } from "react";
import clsx from "clsx";

import { TooltipProp } from "./interface";
import styles from "./Tooltip.module.scss";

const Tooltip: FC<TooltipProp> = ({
	children,
	position = "top",
	className = "",
	title,
	style = {},
	trigger = "hover",
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const newPosition = useMemo(() => {
		if (!position) return "top";

		return position;
	}, [position]);
	const newTrigger = useMemo(() => {
		if (!trigger) return "hover";

		return trigger;
	}, [trigger]);

	const handleMouseEnter = (): void => setVisible(true);
	const handleMouseLeave = (): void => setVisible(false);
	const handleClick = (): void => setVisible(!visible);

	const handlerEvent =
		newTrigger === "hover"
			? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
			: { onClick: handleClick };

	return (
		<div
			style={style}
			className={clsx(styles.container, className)}
			{...handlerEvent}
		>
			{children}

			{visible && (
				<p
					className={clsx(styles.tooltip, {
						[styles.top]: newPosition === "top",
						[styles.bottom]: newPosition === "bottom",
						[styles.left]: newPosition === "left",
						[styles.right]: newPosition === "right",
						[styles.topLeft]: newPosition === "topLeft",
						[styles.topRight]: newPosition === "topRight",
						[styles.bottomRight]: newPosition === "bottomRight",
						[styles.bottomLeft]: newPosition === "bottomLeft",
					})}
				>
					{title}
				</p>
			)}
		</div>
	);
};

export default Tooltip;
