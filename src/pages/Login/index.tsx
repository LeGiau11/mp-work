import Link from "next/link";
import Image from "next/image";

import { useHook } from "./Login.hook";
import { FooterLogin } from "@/layout";
import { Button, Checkbox, Input, InputPassword } from "@/components";

import styles from "./Login.module.scss";

// const loginErrorMessagesSchema = Yup.object({
//   username: Yup.string()
//     .email("Invalid email address")
//     .required("Email address is required"),
//   password: Yup.string()
//     .max(24, "The password can have a maximum of 24 characters.")
//     .matches(
//       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       "The password must be at least 8 characters long, including uppercase letters, lowercase letters, numbers, and special characters."
//     )
//     .required("Password is required"),
//   remember: Yup.boolean(),
// });

export default function Login() {
	const { isDisableSubmitBtn, initialUser, formik } = useHook();

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
					<div className={styles.loginForm}>
						<form onSubmit={formik.handleSubmit}>
							<div className={styles.wrapper}>
								<div className={styles.title}>
									<h1>Welcome back!</h1>
									<h3>Please enter your details </h3>
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
								</div>
								<div className={styles.rememberMe}>
									<Checkbox
										name="remember"
										checked={formik.values.remember}
										label="Remember me"
										onChange={formik.handleChange}
									/>

									<Button
										className={styles.forgotPassword}
										variant="text"
										type="button"
									>
										Forgot password?
									</Button>
								</div>
								<div className={styles.submit}>
									<Button
										disabled={isDisableSubmitBtn()}
										variant="contained"
										type="submit"
									>
										Sign in
									</Button>
								</div>
								<FooterLogin />
								<span className={styles.signUp}>
									Don&apos;t have an account?
									<Link href={"/signup"} className={styles.signUpLink}>
										Sign Up
									</Link>
								</span>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
