import { FC } from 'react';
import clsx from 'clsx';

import {
  List as ListProps,
  ListItem as ListItemProps,
  ListMenu,
} from './interface';
import styles from './List.module.scss';
import Avatar from '../Avatar';
import { ArrowRightIcon } from '@/icons';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Toggle from '../Toggle';

const List: FC<ListProps> & {
	Item: FC<ListItemProps>;
} = ({
  children,
  className,
  style = {},
  data = [],
  showIcon = false,
  showImage = false,
  showRightText = true,
  rightText = 'Details',
  icon,
  showCheckbox = false,
  showRadio = false,
  showToggle = false,
}) => {
  return (
    <ul style={style} className={clsx(className, styles.container)}>
      {data.length > 0
        ? data.map((item, index) => {
          return (
            <ListItem key={index} className={styles.content}>
              <div className={styles.left}>
                {showImage ? (
                  <Avatar size="small" showStatus={false} text="A" />
                ) : showIcon ? (
                  <span className={styles.customIcon}>{icon}</span>
                ) : undefined}
                <div>{item.label}</div>
              </div>
              <div className={styles.right}>
                {!(showCheckbox || showRadio || showToggle) && (
                  <div className={styles.wrap}>
                    {showRightText && <p>{rightText}</p>}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </div>
                )}
                {showCheckbox && <Checkbox />}
                {showRadio && <Radio />}
                {showToggle && <Toggle />}
              </div>
            </ListItem>
          );
				  })
        : children}
    </ul>
  );
};

const ListItem: FC<ListItemProps> = ({ children, className, style = {} }) => {
  return (
    <li style={style} className={className}>
      {children}
    </li>
  );
};

List.Item = ListItem;

export default List;
export type { ListMenu };
