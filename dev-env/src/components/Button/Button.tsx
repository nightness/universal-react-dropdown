// Button.tsx
import "./Button.css";

import { forwardRef, useCallback, useRef } from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  intent?: string;
  text: string;
  //style?: React.CSSProperties;
  onLongPress?: () => void;
}

const Button = forwardRef(function (
  { className, text, onLongPress, type, ...restProps }: Props,
  ref: React.LegacyRef<HTMLButtonElement>
): JSX.Element {
  const touchDownTimer = useRef<NodeJS.Timeout>();

  const clearLongPressTimer = useCallback(() => {
    if (touchDownTimer.current) {
      clearTimeout(touchDownTimer.current);
      touchDownTimer.current = undefined;
    }
  }, []);

  const setLongPressTimer = useCallback(() => {
    touchDownTimer.current = setTimeout(() => {
      if (onLongPress) {
        onLongPress();
      }
      clearLongPressTimer();
    }, 500);
  }, [onLongPress, clearLongPressTimer]);

  return (
    <button
      type={type ? type : "button"}
      ref={ref}
      className={`button-common ${className ? className : ""}`}
      onMouseDown={setLongPressTimer}
      onMouseUp={clearLongPressTimer}
      onTouchStart={setLongPressTimer}
      onTouchEnd={clearLongPressTimer}
      {...restProps}
    >
      {text}
    </button>
  );
});

export default Button;
