import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";

import { REGEX_PASSWORD, Response } from "@/common";
import styles from "./Signup.module.scss";
import { Button, Input, InputPassword } from "@/components";
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
			<div className={styles.backgroundSection}>
				<div className={clsx(styles.shape, styles.shape5)}></div>
				<div className={clsx(styles.shape, styles.shape4)}></div>
				<div className={clsx(styles.shape, styles.shape3)}></div>
				<div className={clsx(styles.shape, styles.shape2)}></div>
				<div className={clsx(styles.shape, styles.shape1)}></div>
			</div>
			<div className={styles.form}>
				<div className={styles.logo}>
					<Image
						width={144}
						height={33}
						src="/images/logo.png"
						alt="logo.png"
					/>
				</div>
				<div className={styles.signUpForm}>
					<form onSubmit={formik.handleSubmit}>
						<div className={styles.title}>
							<h1>Get started</h1>
							<h3>Let’s create your account</h3>
						</div>
						<div className={styles.inputs}>
							<div className={styles.information}>
								<div className={styles.wrapInput}>
									<label>
										<strong>First Name</strong>
									</label>
									<Input
										placeholder="Enter your first name"
										className={styles.input}
										type="text"
										name="firstName"
										inputClassName={styles.input}
										value={formik.values.username}
										onChange={formik.handleChange}
										isError={!!formik.errors.username}
									/>
									<span></span>
								</div>
								<div className={styles.wrapInput}>
									<label>
										<strong>Last Name</strong>
									</label>
									<Input
										placeholder="Enter your last name"
										className={styles.username}
										type="text"
										name="username"
										value={formik.values.username}
										onChange={formik.handleChange}
										isError={!!formik.errors.username}
									/>
									<span></span>
								</div>
							</div>
							<div className={styles.wrapInput}>
								<label>
									<strong>Email Address</strong>
								</label>
								<Input
									placeholder="Enter your email address"
									className={styles.username}
									type="text"
									name="username"
									value={formik.values.username}
									onChange={formik.handleChange}
									isError={!!formik.errors.username}
								/>
								<span></span>
							</div>
							<div className={styles.wrapInput}>
								<label>
									<strong>Password</strong>
								</label>
								<InputPassword
									placeholder="Enter your password"
									className={styles.username}
									name="username"
									value={formik.values.username}
									onChange={formik.handleChange}
									isError={!!formik.errors.username}
								/>
								<span></span>
							</div>
							<div className={styles.wrapInput}>
								<label>
									<strong>Confirm Password</strong>
								</label>
								<InputPassword
									placeholder="Enter your confirm password"
									className={styles.username}
									name="username"
									value={formik.values.username}
									onChange={formik.handleChange}
									isError={!!formik.errors.username}
								/>
								<span></span>
							</div>
						</div>
						<div className={styles.submit}>
							<Button disabled={true} variant="contained" type="submit">
								Sign Up
							</Button>
						</div>
						<FooterLogin />
						<span className={styles.signIn}>
							Don&apos;t have an account?
							<Link href={"/login"} className={styles.signInLink}>
								Sign In
							</Link>
						</span>
						{/* <div className={styles.content}>
							<div className="wrap-title">
								<h1>Sign Up MP-Work!</h1>
							</div>
							<div className={styles.inputs}>
								<div className={styles.wrapperInput}>
									<label>Email Address</label>
									<Input
										placeholder="Enter your email address"
										className={styles.username}
										type="text"
										name="username"
										value={formik.values.username}
										onChange={formik.handleChange}
										isError={!!formik.errors.username}
									/>
									<span className={styles.errorMessage}>
										{formik.errors.username ? formik.errors.username : null}
									</span>
								</div>
								<div className={styles.wrapperInput}>
									<label>Password</label>
									<InputPassword
										className={styles.password}
										placeholder="Enter your password"
										name="password"
										value={formik.values.password}
										onChange={formik.handleChange}
										isError={!!formik.errors.password}
									/>
									<span className={styles.errorMessage}>
										{formik.errors.password ? formik.errors.password : null}
									</span>
								</div>
								<div className={styles.wrapperInput}>
									<label>Nhập lại Password</label>
									<InputPassword
										className={styles.password}
										placeholder="Enter your re-password"
										name="rePassword"
										value={formik.values.rePassword}
										onChange={formik.handleChange}
										isError={!!formik.errors.rePassword}
									/>
									<span className={styles.errorMessage}>
										{formik.errors.rePassword ? formik.errors.rePassword : null}
									</span>
								</div>
							</div>
							<div className={styles.submit}>
								<Button
									// disabled={isDisableSubmitBtn()}
									variant="contained"
									type="submit"
								>
									Sign up
								</Button>
							</div>
						</div> */}
					</form>
				</div>
			</div>
		</section>
	);
}
