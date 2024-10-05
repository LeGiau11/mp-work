import { InputProps } from "@/common";

export interface RadioProps extends Omit<InputProps, "type" | "ref"> {
  classNameContainer?: string;
  label?: string;
}
