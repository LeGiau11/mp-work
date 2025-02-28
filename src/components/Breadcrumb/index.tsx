import { FC, KeyboardEvent, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {
  BreadcrumbItemProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from './interface';
import styles from './Breadcrumb.module.scss';

const Breadcrumb: FC<BreadcrumbProps> & {
	Item: FC<BreadcrumbItemProps>;
	Separator: FC<BreadcrumbSeparatorProps>;
} = ({ children }) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>): void => {
    const list = ulRef.current;

    if (!list) return;

    const focusableItems = Array.from(
      list.querySelectorAll<HTMLElement>('li[tabIndex=\'0\']'),
    );

    const currentIndex = focusableItems.findIndex(
      (item) => item === document.activeElement,
    );

    if (e.key === 'Tab') {
      const nextIndex = e.shiftKey
        ? (currentIndex - 1 + focusableItems.length) % focusableItems.length
        : (currentIndex + 1) % focusableItems.length;

      if (
        (!e.shiftKey && currentIndex === focusableItems.length - 1) || // Cuối danh sách
				(e.shiftKey && currentIndex === 0) // Đầu danh sách
      ) {
        return; // Không chặn hành vi mặc định
      }

      focusableItems[nextIndex]?.focus();
      e.preventDefault(); // Chặn
    }
  };

  return (
    <ul
      ref={ulRef}
      className={clsx(styles.container)}
      role="breadcrumb"
      aria-label="breadcrumb"
      onKeyDown={handleKeyDown}
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
    <li
      tabIndex={0}
      role="listitem"
      className={clsx(styles.item, { [styles.disabled]: disabled })}
    >
      {!!leftIcon && <span>{leftIcon}</span>}
      {!!href ? <Link href={href}>{children}</Link> : children}
      {!!rightIcon && <span>{rightIcon}</span>}
    </li>
  );
};

const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
  separator = '/',
}) => {
  return <span className={styles.separator}>{separator}</span>;
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
