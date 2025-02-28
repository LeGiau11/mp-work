import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './Typography.module.scss';

import {
  TypographyCaptionProps,
  TypographyHeadingProps,
  TypographyLabelProps,
  TypographyProps,
  TypographySubtitleProps,
} from './interface';

const Typography: FC<TypographyProps> & {
	Headline: FC<TypographyHeadingProps>;
	Subtitle: FC<TypographySubtitleProps>;
	Caption: FC<TypographyCaptionProps>;
	Label: FC<TypographyLabelProps>;
} = ({ children, type = 'Regular', level = 1, className = '', style = {} }) => {
  return (
    <p
      className={clsx(className, styles.Typography, {
        [styles.Typography1]: level == 1,
        [styles.Typography2]: level == 2,
        [styles.Medium]: type == 'Medium',
      })}
      style={style}
    >
      {children}
    </p>
  );
};

const Headline: FC<PropsWithChildren<TypographyHeadingProps>> = ({
  children,
  level = 1,
  className = '',
  style = {},
}) => {
  const Headline = `h${Math.min(
    Math.max(level, 1),
    6,
  )}` as keyof JSX.IntrinsicElements;
  return (
    <Headline
      className={clsx(className, {
        [styles.h1]: level == 1,
        [styles.h2]: level == 2,
        [styles.h3]: level == 3,
        [styles.h4]: level == 4,
        [styles.h5]: level == 5,
        [styles.h6]: level == 6,
      })}
      style={style}
    >
      {children}
    </Headline>
  );
};

const Subtitle: FC<TypographySubtitleProps> = ({
  children,
  level = 1,
  className = '',
  style = {},
}) => {
  return (
    <p
      className={clsx(className, styles.Subtitle, {
        [styles.Subtitle1]: level == 1,
        [styles.Subtitle2]: level == 2,
      })}
      style={style}
    >
      {children}
    </p>
  );
};

const Caption: FC<TypographyCaptionProps> = ({
  children,
  level = 1,
  type = 'Regular',
  className = '',
  style = {},
}) => {
  return (
    <p
      className={clsx(className, styles.Caption, {
        [styles.Caption1]: level == 1,
        [styles.Caption2]: level == 2,
        [styles.Medium]: type == 'Medium',
      })}
      style={style}
    >
      {children}
    </p>
  );
};

const Label: FC<TypographyLabelProps> = ({
  children,
  className = '',
  style = {},
}) => {
  return (
    <p style={style} className={clsx(className, styles.Label)}>
      {children}
    </p>
  );
};

Typography.Headline = Headline;
Typography.Subtitle = Subtitle;
Typography.Caption = Caption;
Typography.Label = Label;

export default Typography;
