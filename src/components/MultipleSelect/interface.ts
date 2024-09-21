export interface Options {
  value: string;
  label: string;
}

export interface MultipleSelectProps {
  options: Options[];
  selectedValues: string[];
  onChange?: (values: string[]) => void;
  classNameContainer?: string;
  placeHolder?: string;
  searchPlaceHolder?: string;
  showSearch?: boolean;
}
