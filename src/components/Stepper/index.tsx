import { FC } from 'react';
import clsx from 'clsx';

import { StepperProps } from './interface';
import styles from './Stepper.module.scss';
import { PlusIcon, MinusIcon } from '@/icons';

const Stepper: FC<StepperProps> = ({
  disabled = false,
  onMinusClick = () => {},
  onPlusClick = () => {},
}) => {
  return (
    <div className={clsx(styles.container, { [styles.disabled]: disabled })}>
      <button className={styles.button} onClick={onMinusClick}>
        <MinusIcon />
      </button>
      <span className={styles.dived}></span>
      <button className={styles.button} onClick={onPlusClick}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default Stepper;
