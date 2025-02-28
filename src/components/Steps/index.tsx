import { FC, useState } from 'react';

import { StepsProps, Step } from './interface';
import styles from './Steps.module.scss';
import clsx from 'clsx';

const Steps: FC<StepsProps> = ({
  data = [
    {
      label: 'Step 4',
      step: 1,
    },
    {
      label: 'Step 2',
      step: 2,
    },
    {
      label: 'Step 3',
      step: 3,
    },
  ],
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleClick = (index: number) => setActiveStep(index);

  return (
    <div className={styles.stepper}>
      {data.map((d, index) => (
        <div
          key={index}
          className={clsx(styles.step, {
            [styles.active]: index === activeStep,
            [styles.complete]: index < activeStep,
          })}
          onClick={() => handleClick(index)}
        >
          <div className={styles.stepCircle}>{d.step}</div>
          <div className={styles.stepLabel}>{d.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Steps;
export type { Step };
