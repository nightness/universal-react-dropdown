import React, { useCallback, useState } from "react";

import "../Button/Button.css";
import "./SquishyPressable.css";

interface SquishyPressableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  children: React.ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  onPress?: () => void;
  onLongPress?: () => void; // Adding onLongPress event in the interface
}

export const SquishyPressable: React.FC<SquishyPressableProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">> = ({
  children,
  className,
  backgroundColor = "darkslategrey",
  disabled = false,
  onPress,
  onLongPress, // Adding onLongPress to the component props
  ...props
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const longPressTimeout = React.useRef<NodeJS.Timeout | null>(null); // Timer to handle long press

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
    // Setting up the long press detection
    longPressTimeout.current = setTimeout(() => {
      if (onLongPress && !disabled) {
        onLongPress(); // Trigger long press if not disabled
      }
    }, 800); // 800 milliseconds for long press
  }, [disabled, onLongPress]);

  const handleMouseUp = useCallback((handlePress: boolean) => {
    // Clear the timer when mouse is released
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
    if (isPressed) {
      setIsPressed(false);
    }
    if (handlePress) {
      if (onPress && !disabled) {
        onPress(); // Trigger onPress if not disabled and it's a regular press
      }
    }
  }, [disabled, isPressed, onPress]);

  const classNameCombined = `button-common squishy-pressable ${
    isPressed ? "pressed" : ""
  } ${disabled ? "disabled" : ""} ${className || ""}`;

  return (
    <div
      className={classNameCombined}
      onMouseDown={handleMouseDown}
      onMouseUp={() => handleMouseUp(isPressed)}
      onMouseLeave={() => handleMouseUp(false)} // Clearing the press if mouse leaves the element
      {...props}
    >
      {children}
    </div>
  );
};
