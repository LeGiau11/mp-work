import { ReactNode } from "react";

export interface TypographyProps {
	children?: ReactNode;
}

export interface TypographyHeadingProps extends TypographyProps {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TypographySubtitleProps extends TypographyProps {
	level?: 1 | 2;
}

export interface TypographyCaptionProps extends TypographyProps {
	level?: 1 | 2;
}
