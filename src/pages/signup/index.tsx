import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { useHook } from "@/hooks/Signup.hook";
import styles from "./Signup.module.scss";
import { Input, Button, InputPassword, Typography } from "@/components";
import { FooterLogin } from "@/layout";

export default function SignUp() {
	const { formik, rules, isDisableSubmitBtn } = useHook();

	return (
		<section className={styles.container}>
			<div className={styles.backgroundShow}>
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
						<div className={styles.signupForm}>
							<form onSubmit={formik.handleSubmit}>
								<div className={styles.title}>
									<h1>Get started</h1>
									<h3>Let’s create your account</h3>
								</div>
								<div className={styles.inputs}>
									<div className={styles.wrapInput}>
										<label htmlFor="firstName">
											<strong>First Name</strong>
										</label>
										<Input
											placeholder="Enter your first name"
											className={styles.input}
											type="text"
											name="firstName"
											htmlFor="firstName"
											inputClassName={styles.input}
											value={formik.values.firstName}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isError={
												!!formik.errors.firstName && !!formik.touched.firstName
											}
										/>
										{formik.touched.firstName && formik.errors.firstName && (
											<Typography className={styles.errorMessage} level={2}>
												{formik.errors.firstName}
											</Typography>
										)}
									</div>
									<div className={styles.wrapInput}>
										<label htmlFor="lastName">
											<strong>Last Name</strong>
										</label>
										<Input
											placeholder="Enter your last name"
											className={styles.username}
											type="text"
											name="lastName"
											htmlFor="lastName"
											value={formik.values.lastName}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isError={
												!!formik.errors.lastName && !!formik.touched.lastName
											}
										/>
										{formik.touched.lastName && formik.errors.lastName && (
											<Typography className={styles.errorMessage} level={2}>
												{formik.errors.lastName}
											</Typography>
										)}
									</div>
									<div className={styles.wrapInput}>
										<label htmlFor="email">
											<strong>Email Address</strong>
										</label>
										<Input
											placeholder="Enter your email address"
											className={styles.username}
											type="text"
											name="email"
											htmlFor="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isError={!!formik.touched.email && !!formik.errors.email}
										/>
										{formik.touched.email && formik.errors.email && (
											<Typography className={styles.errorMessage} level={2}>
												{formik.errors.email}
											</Typography>
										)}
									</div>
									<div className={styles.wrapInput}>
										<label htmlFor="password">
											<strong>Password</strong>
										</label>
										<InputPassword
											placeholder="Enter your password"
											className={styles.username}
											name="password"
											id="password"
											value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isError={
												!!formik.errors.password && !!formik.touched.password
											}
										/>
										{formik.touched.password && formik.errors.password && (
											<span
												className={clsx({
													[styles.hidden]: !formik.errors.password,
													[styles.show]: !!formik.errors.password,
												})}
											>
												{rules.map((rule, idx) => {
													const valid = rule.regex.test(
														formik.values.password || "",
													);
													return (
														<Typography
															key={idx}
															className={clsx(styles.hint, {
																[styles.valid]: valid,
																[styles.invalid]: !valid,
															})}
															level={2}
														>
															{rule.text}
														</Typography>
													);
												})}
											</span>
										)}
									</div>
									<div className={styles.wrapInput}>
										<label htmlFor="rePassword">
											<strong>Confirm Password</strong>
										</label>
										<InputPassword
											placeholder="Enter your confirm password"
											className={styles.rePassword}
											name="rePassword"
											value={formik.values.rePassword}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isError={
												!!formik.errors.rePassword &&
												!!formik.touched.rePassword
											}
											onCopy={(e) => e.preventDefault()}
											onCut={(e) => e.preventDefault()}
											onPaste={(e) => e.preventDefault()}
										/>
										{formik.touched.rePassword && formik.errors.rePassword && (
											<Typography className={styles.errorMessage} level={2}>
												{formik.errors.rePassword}
											</Typography>
										)}
									</div>
								</div>
								<div className={styles.submit}>
									<Button
										disabled={isDisableSubmitBtn()}
										variant="contained"
										type="submit"
									>
										Sign Up
									</Button>
								</div>
								<div className={styles.social}>
									<FooterLogin className={styles.customFooter} />
									<span className={styles.signIn}>
										Don&apos;t have an account?
										<Link href={"/login"} className={styles.signInLink}>
											Sign In
										</Link>
									</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
