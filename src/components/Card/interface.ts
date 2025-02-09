import { CSSProperties } from "react";

export interface CardProps {
	type?: "Vertical" | "Horizontal";
	src?: string;
	title?: string;
	content?: string;
	className?: string;
	styleImg?: CSSProperties;
	style?: CSSProperties;
	textSaveBtn?: string;
	textCancelBtn?: string;
	saveBtn?: boolean;
	cancelBtn?: boolean;
	onSaveClick?: () => void;
	onCancelClick?: () => void;
}
