import { CSSProperties, ReactNode } from "react";

export interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  variant?: "text" | "contained" | "outlined";
  onClick?: () => void;
}
