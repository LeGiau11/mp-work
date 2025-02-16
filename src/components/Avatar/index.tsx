import { FC, useMemo } from "react";
import Image from "next/image";
import clsx from "clsx";

import { AvatarProp } from "./interface";
import styles from "./Avatar.module.scss";

const Avatar: FC<AvatarProp> = ({
	src,
	icon,
	text,
	size = "medium",
	status = "available",
	showStatus = true,
}) => {
	const w = useMemo(() => {
		if (!size) return 40;

		switch (size) {
			case "tiny":
				return 8;
			case "small":
				return 32;
			case "medium":
				return 40;
			case "large":
				return 48;
			case "giant":
				return 56;
			case "XL":
				return 64;
			case "XXL":
				return 80;
			case "XXXL":
				return 96;
			default:
				return 40;
		}
	}, [size]);

	const Status: JSX.Element | null = useMemo(() => {
		switch (status) {
			case "available":
				return (
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 8 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
					>
						<circle
							cx="4"
							cy="4"
							r="3.25"
							fill="currentColor"
							stroke="white"
							strokeWidth="1.5"
						/>
					</svg>
				);
			case "offline":
				return (
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
					>
						<rect x="1" y="1" width="16" height="16" rx="8" fill="#6B778C" />
						<rect
							x="1"
							y="1"
							width="16"
							height="16"
							rx="8"
							stroke="white"
							strokeWidth="2"
						/>
						<path
							d="M9 12.5C10.933 12.5 12.5 10.933 12.5 9C12.5 7.067 10.933 5.5 9 5.5C7.067 5.5 5.5 7.067 5.5 9C5.5 10.933 7.067 12.5 9 12.5Z"
							fill="#DFE1E6"
						/>
					</svg>
				);

			case "busy":
				return (
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
					>
						<rect x="1" y="1" width="16" height="16" rx="8" fill="#FF5630" />
						<rect
							x="1"
							y="1"
							width="16"
							height="16"
							rx="8"
							stroke="white"
							strokeWidth="2"
						/>
						<path
							d="M7.77379 5.32266L12.6769 10.2258C13.0271 10.576 13.0271 11.1013 12.6769 11.4516L11.4511 12.6773C11.1009 13.0276 10.5756 13.0276 10.2253 12.6773L5.32224 7.77422C4.97201 7.424 4.97201 6.89866 5.32224 6.54844L6.54801 5.32266C6.89824 4.97244 7.42357 4.97244 7.77379 5.32266Z"
							fill="white"
						/>
					</svg>
				);

			default:
				return null;
		}
	}, [status]);

	return (
		<div
			className={clsx(styles.container, {
				[styles.tiny]: size === "tiny",
				[styles.small]: size === "small",
				[styles.medium]: size === "medium",
				[styles.large]: size === "large",
				[styles.giant]: size === "giant",
				[styles.XL]: size === "XL",
				[styles.XXL]: size === "XXL",
				[styles.XXXL]: size === "XXXL",
			})}
		>
			{!!src ? (
				<Image
					src={src}
					alt={src}
					width={w}
					height={w}
					style={{ borderRadius: 999 }}
				/>
			) : !!icon ? (
				icon
			) : (
				text
			)}
			{showStatus && <div className={styles.dot}>{Status}</div>}
		</div>
	);
};

export default Avatar;
