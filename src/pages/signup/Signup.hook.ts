import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";

import { REGEX_PASSWORD, Response, ResponseData } from "@/common";
import { RequestSignup } from "./interface";

export function useHook() {
	const rules = [
		{ regex: /.{8,24}/, text: "Contains between 8–24 characters" },
		{ regex: /[0-9]/, text: "At least one number (0–9)" },
		{
			regex: /[!@#$%&*?.]/,
			text: "At least one symbol (!, @, #, $, %, &, *, ?, .)",
		},
		{ regex: /[a-z]/, text: "At least one lowercase (a–z)" },
		{ regex: /[A-Z]/, text: "At least one uppercase (A–Z)" },
	];

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
			rePassword: "",
			firstName: "",
			lastName: "",
			email: "",
		},
		enableReinitialize: true,
		validateOnBlur: true,
		validationSchema: Yup.object().shape({
			password: Yup.string()
				.min(8, "Password must be at least 8 characters")
				.max(24, "Password can have at most 24 characters")
				.test("uppercase", "At least one uppercase letter required", (value) =>
					/[A-Z]/.test(value || ""),
				)
				.test("lowercase", "At least one lowercase letter required", (value) =>
					/[a-z]/.test(value || ""),
				)
				.test("number", "At least one number required", (value) =>
					/\d/.test(value || ""),
				)
				.test("special", "At least one special character required", (value) =>
					/[!@#$%&*?.]/.test(value || ""),
				)
				.required("Password is required"),
			rePassword: Yup.string()
				.oneOf([Yup.ref("password"), undefined], "Passwords must match")
				.required("Re-Password is required"),
			email: Yup.string()
				.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
				.required("Email address is required"),
			firstName: Yup.string().required("First name is required"),
			lastName: Yup.string().required("Last name is required"),
		}),
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			try {
				const data: RequestSignup = {
					username: values.email,
					password: values.password,
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
				};

				const res = await handleSignup(data);

				if (res?.status !== 201) {
					setErrors({
						email: res.message,
					});
				}
				setSubmitting(false);
			} catch (error) {
				console.log("error", error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const handleSignup = async (data: RequestSignup) => {
		const res: ResponseData<{ username: string } | null> = await fetch(
			"/api/auth/signup",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		).then((res) => res.json());

		if (res.status === 201) {
			router.push(`/thankyou?username=${res.data?.username ?? ""}`);
		}

		return res;
	};

	const isDisableSubmitBtn = (): boolean => {
		return (
			formik.isSubmitting ||
			!formik.isValid ||
			formik.values.password === "" ||
			formik.values.rePassword === "" ||
			formik.values.firstName === "" ||
			formik.values.lastName === "" ||
			formik.values.email === ""
		);
	};

	return { formik, rules, isDisableSubmitBtn };
}
