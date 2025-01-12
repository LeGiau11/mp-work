import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

import {
	BreadcrumbItemProps,
	BreadcrumbProps,
	BreadcrumbSeparatorProps,
} from "./interface";
import styles from "./Breadcrumb.module.scss";

const Breadcrumb: FC<BreadcrumbProps> & {
	Item: FC<BreadcrumbItemProps>;
	Separator: FC<BreadcrumbSeparatorProps>;
} = ({ children }) => {
	return (
		<ul
			className={clsx(styles.container)}
			role="breadcrumb"
			aria-label="breadcrumb"
		>
			{children}
		</ul>
	);
};

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
	children,
	href,
	leftIcon,
	rightIcon,
	disabled = false,
}) => {
	return (
		<li className={clsx(styles.item, { [styles.disabled]: disabled })}>
			{!!leftIcon && <span>{leftIcon}</span>}
			{!!href ? <Link href={href}>{children}</Link> : children}
			{!!rightIcon && <span>{rightIcon}</span>}
		</li>
	);
};

const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
	separator = "/",
}) => {
	return <span className={styles.separator}>{separator}</span>;
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
