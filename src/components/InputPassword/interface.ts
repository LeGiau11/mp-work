import { ChangeEvent, CSSProperties } from "react";

export interface InputPassWordProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  styles?: CSSProperties;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  isError?: boolean;
}
