import { CSSProperties } from "react";

import "./TextInput.css";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  style?: CSSProperties;
  secureTextEntry?: boolean;
  onChangeValue?: (value: string) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
}

export const TextInput = ({
  ref,
  style,
  onChange,
  onChangeValue,
  className,
  secureTextEntry,
  ...restProps
}: Props) => {
  return (
    <input
      ref={ref}
      onChange={(event) => {
        if (onChange) onChange(event);
        if (!onChangeValue) return;
        onChangeValue(event.currentTarget.value);
      }}
      className={className ? `${className} text-input` : "text-input"}
      style={style}
      type={secureTextEntry ? "password" : "text"}
      {...restProps}
    />
  );
};

export default TextInput;
