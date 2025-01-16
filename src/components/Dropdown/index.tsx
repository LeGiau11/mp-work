import { FC } from "react";

import { DropdownProp } from "./interface";
import styles from "./Dropdown.module.scss";

const Dropdown: FC<DropdownProp> = ({ leftIcon }) => {
	return (
		<div className={styles.container}>
			<div role="select" className={styles.content}>
				<div className={styles.wrapper}>
					{!!leftIcon && <span className={styles.customIcon}>{leftIcon}</span>}
					<p>text</p>
				</div>
				<span className={styles.iconDown}>
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
					>
						<path
							d="M6 9L12 15L18 9"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</div>
			<div role="option" className={styles.subContent}>
				BS
			</div>
		</div>
	);
};

export default Dropdown;
