import { ChangeEvent, FC, useState } from "react";
import clsx from "clsx";

import { MultipleSelectProps } from "./interface";
import { Input } from "@/components";
import styles from "./multipleSelect.module.scss";

const MultipleSelect: FC<MultipleSelectProps> = ({
  showSearch = false,
  classNameContainer = "",
  searchPlaceHolder = "search item...",
  placeHolder = "Select option...",
  options = [],
  selectedValues = [],
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const filterOtions = options.filter((option) =>
    option.value.toLowerCase().includes(searchItem.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (value: string) => {
    const newSelectValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val != value)
      : [...selectedValues, value];
    onChange(newSelectValues);
    setIsOpen(!isOpen);
    setSearchItem("");
  };
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchItem(event.currentTarget.value);

  return (
    <div className={clsx(styles.container, classNameContainer)}>
      <div className={clsx(styles.input)} onClick={toggleDropdown}>
        <div className={styles.text}>
          {selectedValues.length ? selectedValues.join(", ") : placeHolder}
        </div>
        <span className={clsx(styles.arrow, { [styles.rotated]: isOpen })}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {showSearch && (
            <div className={styles.search}>
              <Input
                placeholder={searchPlaceHolder}
                value={searchItem}
                onChange={handleSearch}
              />
            </div>
          )}
          {filterOtions.length > 0 &&
            filterOtions.map((option, index) => (
              <div
                key={index}
                className={clsx(styles.option, {
                  [styles.selected]: selectedValues.includes(option.value),
                })}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          {filterOtions.length === 0 && <div>Không tìm thấy dữ liệu</div>}
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
