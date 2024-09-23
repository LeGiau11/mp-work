import {
  ChangeEventHandler,
  FC,
  Fragment,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

import { Option } from "@/common/interface";
import { SearchSelectProps } from "./interface";
import styles from "./searchSelect.module.scss";

const SearchSelect: FC<SearchSelectProps> = ({
  placeHolder = "search",
  className = "",
  value = { label: "", value: "" },
  options = [],
  onChange = () => {},
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<Option[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Object.values(value).length) setSearchItem(value.label);
    const handleClickOutSide = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchItem(value.label);
        setIsFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    const filter = options.filter((option) =>
      option.label.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilterOptions(filter);
  }, [searchItem, options]);

  const handleFocus = () => {
    setIsDropdownOpen(true);
    setSearchItem("");
    setIsFocus(true);
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchItem(event.currentTarget.value);

  const handleSelect =
    (option: Option) => (event: MouseEvent<HTMLLIElement>) => {
      event.preventDefault();
      onChange(option);
      setIsDropdownOpen(!isDropdownOpen);
      setSearchItem(option.label);
    };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, className, {
        [styles.containerFocus]: isFocus,
      })}
    >
      <div className={styles.searchContainer} onFocus={handleFocus}>
        <input
          type="text"
          value={searchItem}
          onChange={handleSearchChange}
          placeholder={placeHolder}
          className={styles.input}
        />
      </div>
      {isDropdownOpen && filterOptions.length > 0 && (
        <ul className={styles.dropdown}>
          {filterOptions.map((option, index) => {
            return (
              <Fragment key={index}>
                <li
                  onClick={handleSelect(option)}
                  className={clsx(styles.dropdownItem, {
                    [styles.selected]: value.value.includes(option.value),
                  })}
                >
                  {option.label}
                </li>
              </Fragment>
            );
          })}
        </ul>
      )}
      {isDropdownOpen && filterOptions.length === 0 && (
        <div className={styles.noResult}>No results found</div>
      )}
    </div>
  );
};

export default SearchSelect;
