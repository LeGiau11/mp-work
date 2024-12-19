import { FC } from "react";

// import styles from "./Typography.module.scss";
import {
    TypographyCaptionProps,
	TypographyHeadingProps,
	TypographyProps,
	TypographySubtitleProps,
} from "./interface";

const Typography: FC<TypographyProps> & {
	Headline: FC<TypographyHeadingProps>;
	Subtitle: FC<TypographySubtitleProps>;
	Caption: FC<TypographyCaptionProps>;
} = ({ children }) => {
	return <p>{children}</p>;
};

const Headline: FC<TypographyHeadingProps> = ({ children, level = 1 }) => {
	const Tag = `h${Math.min(Math.max(level, 1), 6)}`;
	return <Tag>{children}</Tag>;
};

const Subtitle: FC<TypographySubtitleProps> = ({ children, level = 1 }) => {
	return <p>{children}</p>;
};

const Caption: FC<TypographyCaptionProps> = ({ children, level = 1 }) => {
	return <p>{children}</p>;
};

Typography.Headline = Headline;
Typography.Subtitle = Subtitle;
Typography.Caption = Caption;

export default Typography;
