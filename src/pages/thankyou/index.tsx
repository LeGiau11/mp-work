import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Thankyou.module.scss";
import { Chip, Typography } from "@/components";
{
	/** tao thac nhanh voi snippet: div.block_$*4 + tab */
}
export default function ThankYouPage() {
	const router = useRouter();
	const { username } = router.query;

	return (
		<section className={styles.container}>
			<div className={styles.container_left}></div>
			<div className={styles.container_right}>
				<div className={styles.form}>
					<div className={styles.logo}>
						<Image
							width={144}
							height={33}
							src="/images/logo.png"
							alt="logo.png"
						/>
					</div>
					<div className={styles.content}>
						<div className={styles.block_1}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="130"
								height="130"
								viewBox="0 0 130 130"
								fill="none"
							>
								<mask
									id="mask0_1637_4334"
									style={{ maskType: "luminance" }}
									maskUnits="userSpaceOnUse"
									x="12"
									y="10"
									width="106"
									height="110"
								>
									<path
										d="M64.9996 10.8335L79.2265 21.2118L96.8388 21.1793L102.247 37.9385L116.515 48.2627L111.041 65.0002L116.515 81.7377L102.247 92.0618L96.8388 108.821L79.2265 108.788L64.9996 119.167L50.7727 108.788L33.1604 108.821L27.7519 92.0618L13.4844 81.7377L18.9579 65.0002L13.4844 48.2627L27.7519 37.9385L33.1604 21.1793L50.7727 21.2118L64.9996 10.8335Z"
										fill="white"
										stroke="white"
										strokeWidth="1.66667"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M46.041 65.0002L59.5827 78.5418L86.666 51.4585"
										stroke="black"
										strokeWidth="1.66667"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</mask>
								<g mask="url(#mask0_1637_4334)">
									<path d="M0 0H130V130H0V0Z" fill="#43B75D" />
								</g>
							</svg>
						</div>
						<div className={styles.block_2}>
							<Typography.Headline className={styles.errorMessage} level={3}>
								Registration successful!
							</Typography.Headline>
							<Typography className={styles.errorMessage} level={2}>
								Congratulations! Your account has been successfully created. We
								have sent a confirmation email to:
							</Typography>
						</div>
						<div className={styles.block_3}>
							<Chip
								className={styles.block_3__title}
								variant="filled"
								isClose={false}
							>
								{username}
							</Chip>
						</div>
						<div className={styles.block_4}>
							<div className={styles.block_content}>
								<Typography type="Medium" level={1}>
									Next steps:
								</Typography>
								<ul>
									<li>
										<Typography.Caption
											className={styles.block_content_sub_title}
											type="Regular"
											level={1}
										>
											Check your inbox
										</Typography.Caption>
									</li>
									<li>
										<Typography.Caption
											className={styles.block_content_sub_title}
											type="Regular"
											level={1}
										>
											Click the activation link in the email
										</Typography.Caption>
									</li>
									<li>
										<Typography.Caption
											className={styles.block_content_sub_title}
											type="Regular"
											level={1}
										>
											If you don't see the email, please check your spam folder
										</Typography.Caption>
									</li>
									<li>
										<Typography.Caption
											className={styles.block_content_sub_title}
											type="Regular"
											level={1}
										>
											The activation link will expire in 24 hours
										</Typography.Caption>
									</li>
								</ul>
							</div>
						</div>
						<div className={styles.block_5}>
							<Link href={"#"}>Resend Email</Link>
							<Link href={"#"}>Need Help?</Link>
							<Link href={"#"}>Back to Login</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
