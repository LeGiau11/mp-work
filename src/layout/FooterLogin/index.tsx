import { FC, Fragment } from "react";
import Link from "next/link";

import styles from "./FooterLogin.module.scss";
import { Apple, Facebook, Google } from "@/svg";
const FooterLogin: FC = () => {
	return (
		<Fragment>
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
		</Fragment>
	);
};

export default FooterLogin;
