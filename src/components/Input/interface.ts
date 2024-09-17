interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface InputProps extends Omit<Props, "prefix"> {
  label?: string;
  htmlFor?: string;
  prefix?: React.ReactNode;
}
