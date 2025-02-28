import { cloneElement, FC, isValidElement, ReactElement, useRef } from 'react';
import clsx from 'clsx';

import { ContextMenuConfigureProps } from './interface';
import { ContextMenu } from '@/components';
import styles from './ContextMenuConfigure.module.scss';

const ContextMenuConfigure: FC<ContextMenuConfigureProps> = ({
  children,
  menu = [],
  customContextMenu = undefined,
  anchor = 'left',
}) => {
  const ref = useRef<HTMLElement>(null);

  if (!isValidElement(children)) return null;

  const cloneChild = cloneElement(children as ReactElement, { ref });

  let cloneCustomContextMenu = undefined;

  if (isValidElement(customContextMenu)) {
    cloneCustomContextMenu = cloneElement(customContextMenu as ReactElement, {
      targetRef: ref,
      anchor
    });
  }

  return (
    <div className={clsx(styles.container)} role="context-menu">
      {cloneChild}
      {cloneCustomContextMenu !== undefined ? (
        cloneCustomContextMenu
      ) : (
        <ContextMenu items={menu} targetRef={ref} anchor={anchor} />
      )}
    </div>
  );
};

export default ContextMenuConfigure;
