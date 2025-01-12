import { FC } from "react";
import clsx from "clsx";

import { LoaderProps } from "./interface";
import styles from "./Loader.module.scss";

const Loader: FC<LoaderProps> = ({ size = "medium", animated = false }) => {
	return (
		<div
			className={clsx(styles.container, {
				[styles.giant]: size === "giant",
				[styles.large]: size === "large",
				[styles.medium]: size === "medium",
				[styles.small]: size === "small",
				[styles.tiny]: size === "tiny",
				[styles.animated]: animated,
			})}
		>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 62 62"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
			>
				<path
					d="M3 31C3 15.536 15.536 3 31 3C46.464 3 59 15.536 59 31C59 46.464 46.464 59 31 59C25.6922 59 20.7294 57.5231 16.5 54.9579"
					stroke="currentColor"
					strokeWidth="6"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
};

export default Loader;
