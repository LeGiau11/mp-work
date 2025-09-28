import { ChangeEvent, ClipboardEvent, CSSProperties } from "react";

export interface InputPassWordProps {
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onCopy?: (event: ClipboardEvent<HTMLInputElement>) => void;
	onCut?: (event: ClipboardEvent<HTMLInputElement>) => void;
	onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void;
	styles?: CSSProperties;
	placeholder?: string;
	className?: string;
	name?: string;
	id?: string;
	isError?: boolean;
}
