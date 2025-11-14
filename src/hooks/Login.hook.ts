import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ILogin, RequestLogin } from "@/interface/Login.interface";
import { ACCESS_TOKEN, REFRESH_TOKEN, ResponseData } from "@/common";
//import { startSilentRefreshAuth } from "@/utils";

export function useHook() {
	const [initialUser, setInitialUser] = useState<ILogin>({});
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			username: initialUser.username || "",
			password: initialUser.password || "",
			remember: initialUser.remember || false,
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			username: Yup.string()
				.email("Invalid email address")
				.required("Email address is required"),
			password: Yup.string().required("Password is required"),
			remember: Yup.boolean(),
		}),
		onSubmit: async (values, { setSubmitting, setErrors, setFieldValue }) => {
			if (values.remember) {
				const data = { username: values.username, password: values.password };
				localStorage.setItem("user", JSON.stringify(data));
			} else {
				if (localStorage.getItem("user")) {
					localStorage.removeItem("user");
				}
			}

			const res = await handleLogIn(values);

			if (res?.error || res?.message) {
				await setFieldValue("password", "");
				await setErrors({
					username: "An email address does not exist.",
					password: "",
				});
			}

			setSubmitting(false);
		},
	});

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			const parsedUser: Omit<ILogin, "remember"> = JSON.parse(savedUser);
			setInitialUser({
				username: parsedUser.username,
				password: parsedUser.password,
				remember: true,
			});
			formik.setFieldValue("username", parsedUser.username);
			formik.setFieldValue("password", parsedUser.password);
			formik.setFieldValue("remember", true);
		}
		() => {
			formik.resetForm();
		};
	}, []);

	/**
	 *
	 * handleLogIn
	 *
	 * @param data { RequestLogin }
	 * @returns { ResponseData<string> }
	 *
	 * Step 1: gọi api: /api/auth/Login
	 * Step 2:  nếu gọi đúng user/password thì chuyển sang trang home
	 *
	 */
	const handleLogIn = async (data: RequestLogin) => {
		const res: ResponseData<{ access: string; refresh: string }> = await fetch(
			"/api/auth/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		).then((res) => res.json());
		console.log("res", res);
		if (res.status === 201) {
			localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res.data?.access));
			localStorage.setItem(REFRESH_TOKEN, JSON.stringify(res.data?.refresh));
			//startSilentRefreshAuth();
			router.replace("/");
			return;
		}
		return res;
	};

	/**
	 *
	 * isDisableSubmitBtn
	 *
	 * @returns {boolean}
	 *
	 * Step: kiểm tra trường password/user
	 *
	 */
	const isDisableSubmitBtn = (): boolean => {
		return (
			formik.isSubmitting ||
			!formik.isValid ||
			formik.values.username == "" ||
			formik.values.password == ""
		);
	};

	return { initialUser, formik, isDisableSubmitBtn };
}
