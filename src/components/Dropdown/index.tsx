import {
	ChangeEvent,
	FC,
	Fragment,
	KeyboardEvent,
	KeyboardEventHandler,
	MouseEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import clsx from "clsx";

import { DropdownProp, Menu } from "./interface";
import styles from "./Dropdown.module.scss";
import Input from "../Input";
import Checkbox from "../Checkbox";
import { ArrowDownIcon, CheckIcon, SearchIcon } from "@/icons";

const Dropdown: FC<DropdownProp> = ({
	leftIcon,
	menus = [],
	isSearch = true,
	disabled = false,
	tabIndex = 0,
	onChange = () => {},
}) => {
	const [listSelected, setListSelected] = useState<Menu[]>([]);
	const [openSub, setOpenSub] = useState<boolean>(false);
	const [tempSearch, setTempSearch] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const liRef = useRef<(HTMLLIElement | null)[]>([]);

	const filteredMenus = useMemo(() => {
		if (!tempSearch) return menus;

		return menus.filter((item) =>
			item.label?.toLowerCase().includes(tempSearch),
		);
	}, [tempSearch]);

	useEffect(() => {
		if (inputRef.current) {
			requestAnimationFrame(() => {
				if (inputRef.current) {
					inputRef.current.focus();
				}
			});
		}
	}, [openSub]);

	useEffect(() => {
		const handleClickSideOut = (event: MouseEvent | Event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			)
				setOpenSub(false);
		};

		document.addEventListener("mousedown", handleClickSideOut);

		return () => {
			document.removeEventListener("mousedown", handleClickSideOut);
		};
	}, []);

	const handleOpenSubContent = (): void => {
		setOpenSub(!openSub);

		if (inputRef.current) inputRef.current?.focus();
	};

	const handleSelected = (menu: Menu, event: MouseEvent): void => {
		event.preventDefault();

		if (!menu || menu.disabled) return;

		const positionMenuInListSelected: number = listSelected.findIndex(
			(s: Menu) => s.label === menu.label,
		);

		const copyList = [...listSelected];

		positionMenuInListSelected === -1
			? copyList.push(menu)
			: copyList.splice(positionMenuInListSelected, 1);

		setListSelected(copyList);
		const transferList = copyList.map((s) => s.label || "");
		onChange?.(transferList);
	};

	const handleSearch = (event?: ChangeEvent<HTMLInputElement>): void =>
		setTempSearch(event?.target?.value.toLowerCase() || "");

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (
		event: KeyboardEvent,
	): void => {
		event.preventDefault();

		const currentIndex = liRef.current.findIndex(
			(item) => document.activeElement === item,
		);

		if (event.key === "Tab") {
			if (!openSub) setOpenSub(true);

			if (event.shiftKey) {
				const prevIndex =
					currentIndex === 0 ? liRef.current.length - 0 : currentIndex - 1;
				liRef.current[prevIndex]?.focus();
			} else {
				const nextIndex = (currentIndex + 1) % liRef.current.length;
				liRef.current[nextIndex]?.focus();
			}
		}

		if (event.key === "ArrowDown") {
			const nextIndex = (currentIndex + 1) % liRef.current.length;
			liRef.current[nextIndex]?.focus();
		}

		if (event.key === "Escape") setOpenSub(false);

		if (event.key === "Enter") {
			var dom = filteredMenus[currentIndex];

			if (!dom) return;

			if (!dom.disabled) {
				handleSelected(dom, { preventDefault: () => {} } as MouseEvent);
			}
		}
	};

	return (
		<div
			className={styles.container}
			tabIndex={tabIndex}
			ref={dropdownRef}
			onKeyDown={handleKeyDown}
		>
			<div
				role="select"
				className={clsx(styles.content, {
					[styles.disabled]: disabled,
					[styles.expanded]: openSub,
				})}
				onClick={handleOpenSubContent}
			>
				<div className={styles.wrapper}>
					{!!leftIcon && <span className={styles.customIcon}>{leftIcon}</span>}
					{listSelected.length === 0 ? (
						<p>Select</p>
					) : (
						<p>Selected: {listSelected.length} options</p>
					)}
				</div>
				<span className={styles.iconDown}>
					<ArrowDownIcon />
				</span>
			</div>
			<div
				role="option"
				className={clsx(styles.dropdownMenu, { [styles.open]: openSub })}
			>
				{isSearch && (
					<div className={styles.dropdownSearch} tabIndex={0}>
						<Input
							ref={inputRef}
							placeholder="Placeholder"
							prefix={<SearchIcon />}
							value={tempSearch}
							onChange={handleSearch}
							tabIndex={0}
						/>
					</div>
				)}
				<ul className={styles.dropdownList}>
					{filteredMenus.map((menu, index) => {
						return (
							<Fragment key={index}>
								<li
									className={clsx(styles.dropdownItem, {
										[styles.disabledItem]: menu.disabled,
									})}
									onClick={(e) => handleSelected(menu, e)}
									ref={(el) => {
										liRef.current[index] = el;
									}}
									tabIndex={menu.disabled ? -1 : 0}
									aria-disabled={menu.disabled}
								>
									<div className={styles.dropdownItemContent}>
										<span className={styles.dropdownItemIcon}>{menu.icon}</span>
										<p>{menu.label}</p>
									</div>
									{menu.checked && (
										<Checkbox
											checked={
												listSelected.findIndex(
													(s: Menu) => s.label === menu.label,
												) !== -1
											}
											disabled={menu.disabled}
										/>
									)}
									{!menu.checked &&
										listSelected.findIndex(
											(s: Menu) => s.label === menu.label,
										) !== -1 && (
											<span className={styles.checked}>
												<CheckIcon />
											</span>
										)}
								</li>
							</Fragment>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
export type { Menu };
