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
		></div>
	);
};

export default Loader;
