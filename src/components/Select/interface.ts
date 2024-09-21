import { SelectHTMLAttributes } from "react";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "multiple"> {}
