import {
  Children,
  FC,
  isValidElement,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Tabs as TabsProps,
  TabsPane as TabsPaneProps,
  TabItem,
} from './interface';
import styles from './Tabs.module.scss';

const Tabs: FC<TabsProps> & {
	TabsPane: FC<TabsPaneProps>;
} = ({ children, className, defaultTab = '0', data = [] }) => {
  const [activeTab, setActiveTab] = useState<number>(
    typeof defaultTab === 'string' ? Number(defaultTab) : defaultTab,
  );
  const tabs: ReactElement<TabsPaneProps>[] = Children.toArray(children).filter(
    (child): child is ReactElement<TabsPaneProps> => {
      return (
        isValidElement(child) &&
				typeof child.type === 'function' &&
				((child.type as FC).name === 'TabsPane' ||
					(child.type as FC).name === 'Tabs.TabsPane')
      );
    },
  );

  const handleChangeTab =
		(index: number) =>
		  (event: MouseEvent<HTMLButtonElement>): void => {
		    event.preventDefault();
		    const check: boolean = (tabs[index] as ReactElement).props?.disabled;

		    if (check) return;

		    setActiveTab(index);
		  };

  return (
    <div className={clsx(className, styles.tabs)}>
      {data.length > 0 ? (
        <>
          <div role="tabs-list" className={styles.tabsList}>
            {data.map((item, index) => {
              return (
                <button
                  onClick={handleChangeTab(index)}
                  className={clsx(styles.wrap, {
                    [styles.selected]: activeTab === index,
                    [styles.disabled]: item.disabled ?? false,
                  })}
                  key={index}
                  disabled={item.disabled}
                >
                  {!!item?.leftIcon && (
                    <span className={styles.icon}>{item.leftIcon}</span>
                  )}
                  <p>{item.label}</p>
                  {!!item?.rightIcon && (
                    <span className={styles.icon}>{item.rightIcon}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div role="tabs-pane" className={styles.tabsPane}>
            <AnimatePresence mode="sync">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {data[activeTab].children}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      ) : (
        <>
          <div role="tabs-list" className={styles.tabsList}>
            {tabs.map((tab, index) => {
              return (
                <button
                  onClick={handleChangeTab(index)}
                  className={clsx(styles.wrap, {
                    [styles.selected]: activeTab === index,
                    [styles.disabled]:
											(tab as ReactElement).props?.disabled ?? false,
                  })}
                  key={index}
                  disabled={(tab as ReactElement).props?.disabled}
                >
                  {!!(tab as ReactElement).props?.leftIcon && (
                    <span className={styles.icon}>
                      {(tab as ReactElement).props?.leftIcon}
                    </span>
                  )}
                  <p>{(tab as ReactElement).props?.label}</p>
                  {!!(tab as ReactElement).props?.rightIcon && (
                    <span className={styles.icon}>
                      {(tab as ReactElement).props?.rightIcon}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div role="tabs-pane" className={styles.tabsPane}>
            <AnimatePresence mode="sync">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tabs[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

const TabsPane: FC<TabsPaneProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

Tabs.TabsPane = TabsPane;

export default Tabs;
export type { TabItem };
