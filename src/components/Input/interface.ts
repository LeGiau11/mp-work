import { ChangeEvent, CSSProperties } from "react";

export interface InputProps {
  label?: string;
  htmlFor?: string;
  prefix?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
