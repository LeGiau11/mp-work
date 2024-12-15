import { useFormik } from "formik";
import * as Yup from "yup";

import { REGEX_PASSWORD, Response } from "@/common";
import styles from "./Signup.module.scss";
import { Button, Input, InputPassword } from "@/components";

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
		onSubmit: async (values, { setSubmitting, setErrors, setFieldValue }) => {
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
		<div className={styles.container}>
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.content}>
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
				</div>
			</form>
		</div>
	);
}
