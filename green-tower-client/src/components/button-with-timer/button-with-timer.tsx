import React, { useEffect, useRef, useState } from 'react';

import { Constants } from '../../utils/constants';
import FormElements from '../form-elements/form-elements';

interface ButtonWithTimerProps {
  content: string;
  onClick: (event: React.MouseEvent) => void;
  delay?: number;
  skipFirstDelay?: boolean;
}

function ButtonWithTimer({ content, onClick, delay = 30, skipFirstDelay = false }: ButtonWithTimerProps) {
  const isFirstRun = useRef(true);
  const [secondsLeft, setSecondsLeft] = useState(skipFirstDelay ? null : delay);

  const [resendDisabled, setResendDisabled] = useState(!skipFirstDelay);
  useEffect(() => {
    if (isFirstRun.current && skipFirstDelay) {
      isFirstRun.current = false;
      return;
    }
    setResendTimeInterval();
  }, []);

  function setResendTimeInterval() {
    setResendDisabled(true);
    setSecondsLeft(delay);
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds: number | null) => {
        if (prevSeconds === null || prevSeconds === undefined) return null;

        if (prevSeconds - 1 !== 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalId);
          setResendDisabled(false);
          return null;
        }
      });
    }, 1000);

    if (secondsLeft === 0) {
      clearInterval(intervalId);
      setResendDisabled(false);
    }

    return () => clearInterval(intervalId);
  }

  function handleOnBtnClick(e: React.MouseEvent) {
    onClick(e);
    setResendTimeInterval();
  }

  return (
    <FormElements.Button onClick={handleOnBtnClick} disabled={resendDisabled}>
      {content}
      {Constants.space}
      {secondsLeft}
    </FormElements.Button>
  );
}

export default ButtonWithTimer;
