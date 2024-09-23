import { Option } from "@/common/interface";

export interface SearchSelectProps {
  className?: string;
  placeHolder?: string;
  value?: Option;
  options?: Option[];
  searchItem?: string;
  onChange?: (option: Option) => void;
}
