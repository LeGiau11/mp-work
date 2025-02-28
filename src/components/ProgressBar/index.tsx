import { FC, useMemo } from 'react';
import clsx from 'clsx';

import { ProgressBarProps } from './interface';
import styles from './ProgressBar.module.scss';

const ProgressBar: FC<ProgressBarProps> = ({
  value = 0,
  striped = true,
  animated = false,
  position = 'left',
  showPercent = true,
}) => {
  const newValue = useMemo(() => {
    if (value < 0) return 0;

    if (value > 100) return 100;

    return Number((Math.floor(value * 10) / 10).toFixed(1));
  }, [value]);

  return (
    <div className={clsx(styles.container)}>
      {showPercent && position === 'left' && <label>{newValue}%</label>}
      <div className={clsx(styles.progressBarContainer)}>
        <div
          role="progress-bar"
          aria-valuenow={newValue}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            width: `${value}%`,
          }}
          className={clsx(styles.progressBar, {
            [styles.striped]: striped,
            [styles.animated]: animated,
          })}
        ></div>
      </div>
      {showPercent && position === 'right' && <label>{newValue}%</label>}
    </div>
  );
};

export default ProgressBar;
