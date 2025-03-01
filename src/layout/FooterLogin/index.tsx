import { FC } from "react";
import Link from "next/link";

import styles from "./FooterLogin.module.scss";
import { Apple, Facebook, Google } from "@/svg";
const FooterLogin: FC = () => {
	return (
		<section className={styles.container}>
			<span className={styles.signInWith}>Or sign in with</span>
			<div className={styles.social}>
				<Link href={""} className={styles.socialIcon}>
					<Google />
				</Link>
				<Link href={""} className={styles.socialIcon}>
					<Apple />
				</Link>
				<Link href={""} className={styles.socialIcon}>
					<Facebook />
				</Link>
			</div>
		</section>
	);
};

export default FooterLogin;
