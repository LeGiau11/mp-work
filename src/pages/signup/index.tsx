import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";

import { REGEX_PASSWORD, Response } from "@/common";
import styles from "./Signup.module.scss";
import { Input, Button, InputPassword, Typography } from "@/components";
import { FooterLogin } from "@/layout";

export default function SignUp() {
	const formik = useFormik({
		initialValues: { username: "", password: "", rePassword: "" },
		validationSchema: Yup.object().shape({
			username: Yup.string()
				.email("Invalid email address")
				.required("Email address is required"),
			password: Yup.string()
				.max(24, "The password can have a maximum of 24 characters.")
				.matches(
					REGEX_PASSWORD,
					"The password must be at least 8 characters long, including uppercase letters, lowercase letters, numbers, and special characters.",
				)
				.required("Password is required"),
			rePassword: Yup.string()
				.oneOf([Yup.ref("password"), undefined], "Passwords must match")
				.required("Re-Password is required"),
		}),
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			try {
				// console.log("values", values);
				const res: Response<unknown> = await fetch(
					"/api/user/CheckIsExistUser",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username: values.username }),
					},
				).then((res) => res.json());

				if (!res.success) {
					await setErrors({
						username: res.error,
					});
				}

				setSubmitting(false);
			} catch (error) {
				console.log("error", error);
			}
		},
	});

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
											value={formik.values.username}
											onChange={formik.handleChange}
											isError={!!formik.errors.username}
										/>
										<Typography className={styles.errorMessage} level={2}>Passwords match</Typography>
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
											value={formik.values.username}
											onChange={formik.handleChange}
											isError={!!formik.errors.username}
										/>
										<Typography className={styles.errorMessage} level={2}>Passwords match</Typography>
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
											value={formik.values.username}
											onChange={formik.handleChange}
											isError={!!formik.errors.username}
										/>
										<Typography className={styles.errorMessage} level={2}>Passwords match</Typography>
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
											value={formik.values.username}
											onChange={formik.handleChange}
											isError={!!formik.errors.username}
										/>
										<span className={styles.info}>
											<Typography className={styles.hint} level={2}>
												Contains between 8-20 characters.
											</Typography>
											<Typography className={styles.hint} level={2}>
												Least one number (0-9).
											</Typography>
											<Typography className={styles.hint} level={2}>
												Least one symbol (!, @, #, $, %, &, *, ?, .).
											</Typography>
											<Typography className={styles.hint} level={2}>
												Least one lowercase (a-z).
											</Typography>
											<Typography className={styles.hint} level={2}>
												Least one uppercase (A-Z).
											</Typography>
										</span>
									</div>
									<div className={styles.wrapInput}>
										<label htmlFor="rePassword">
											<strong>Confirm Password</strong>
										</label>
										<InputPassword
											placeholder="Enter your confirm password"
											className={styles.username}
											name="rePassword"
											value={formik.values.username}
											onChange={formik.handleChange}
											isError={!!formik.errors.username}
										/>
										<Typography className={styles.errorMessage} level={2}>Passwords match</Typography>
									</div>
								</div>
								<div className={styles.submit}>
									<Button disabled={true} variant="contained" type="submit">
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
