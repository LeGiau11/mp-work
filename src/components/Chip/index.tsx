import { FC } from "react";
import clsx from "clsx";

import { ChipProps } from "./interface";
import styles from "./chip.module.scss";

const Chip: FC<ChipProps> = ({
	children,
	className,
	style = {},
	iconLeft,
	variant = "filled",
	type = "Default",
	size = "Medium",
	isClose = true,
	onClick = () => {},
}) => {
	return (
		<div
			style={style}
			className={clsx(className, styles.chip, {
				[styles.filled]: variant === "filled",
				[styles.outline]: variant === "outline",
				[styles.medium]: size === "Medium",
				[styles.small]: size === "Small",
				[styles.tiny]: size === "Tiny",
				[styles.default]: type === "Default",
				[styles.success]: type === "Success",
				[styles.info]: type === "Info",
				[styles.warning]: type === "Warning",
				[styles.error]: type === "Error",
			})}
		>
			{iconLeft && <span className={clsx(styles.icon)}>{iconLeft}</span>}
			{children}
			{isClose && (
				<span className={clsx(styles.icon, styles.close)} onClick={onClick}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			)}
		</div>
	);
};

export default Chip;
