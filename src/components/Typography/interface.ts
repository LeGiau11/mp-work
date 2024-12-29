import { CSSProperties, ReactNode } from "react";

interface TypoProps {
	children?: ReactNode;
	level?: 1 | 2;
	className?: string;
	style?: CSSProperties;
}

export interface TypographyProps extends TypoProps {
	type?: "Regular" | "Medium";
}

export interface TypographyHeadingProps extends Omit<TypoProps, "level"> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TypographySubtitleProps extends TypoProps {}

export interface TypographyCaptionProps extends TypoProps {
	type?: "Regular" | "Medium";
}

export interface TypographyLabelProps extends Omit<TypoProps, "level"> {}
