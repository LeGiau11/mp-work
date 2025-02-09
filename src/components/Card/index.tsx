import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

import { CardProps } from "./interface";
import styles from "./Card.module.scss";
import Button from "../Button";
import Typography from "../Typography";

const { Headline } = Typography;

const Card: FC<CardProps> = ({
	type = "Vertical",
	src = "/images/Image.png",
	title = "Titles",
	content = `Keep your messages short, but make sure they cover everything you
    need to say.`,
	style = {},
	styleImg = {},
	saveBtn = true,
	cancelBtn = true,
	textSaveBtn = "Button",
	textCancelBtn = "Button",
	onSaveClick = () => {},
	onCancelClick = () => {},
}) => {
	if (type === "Horizontal") {
		return (
			<article style={style} className={clsx(styles.container)}>
				<Image
					src={src}
					alt={src ? src : "Image.png"}
					width={"100"}
					height={"100"}
					style={{
						...styleImg,
						objectFit: "cover", // cover, contain, none
					}}
				/>

				<div className={clsx(styles.content)}>
					<Headline level={4}>{title}</Headline>
					<Typography level={2} className={clsx(styles.subContent)}>
						{content}
					</Typography>
				</div>
			</article>
		);
	}

	return (
		<article style={style} className={clsx(styles.container, styles.vertical)}>
			<div className={styles.wrapImage}>
				<Image
					src={src}
					alt={src ? src : "Image.png"}
					width={"100"}
					height={"100"}
					style={{
						...styleImg,
						objectFit: "cover", // cover, contain, none
					}}
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.information}>
					<Typography.Subtitle className={styles.informationTitle} level={2}>
						{title}
					</Typography.Subtitle>
					<Typography.Caption className={styles.informationContent}>{content}</Typography.Caption>
				</div>
				<div className={styles.control}>
					{saveBtn && (
						<Button type="button" onClick={onSaveClick}>
							{textSaveBtn}
						</Button>
					)}
					{cancelBtn && (
						<Button type="button" variant="outline" onClick={onCancelClick}>
							{textCancelBtn}
						</Button>
					)}
				</div>
			</div>
		</article>
	);
};

export default Card;
