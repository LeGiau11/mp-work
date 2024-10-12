import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";

import { ResponseData } from "@/common";
import { ILogin, RequestLogin } from "./interface";
import { Apple, Facebook, Google } from "@/svg";
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
      try {
        if (values.remember) {
          const data = { username: values.username, password: values.password };
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
          }
        }

        const res = await handlelogIn(values);

        if (res?.error || res?.message) {
          await setFieldValue("password", "");
          await setErrors({
            username: "An email address does not exist.",
            password: "",
          });
        }

        setSubmitting(false);
      } catch (error) {
        console.log("error", error);
      }
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

  const handlelogIn = async (data: RequestLogin) => {
    const res: ResponseData<string> = await fetch("/api/auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.success) {
      localStorage.setItem("token", JSON.stringify(res.data));
      router.push("/");
      return;
    }

    return res;
  };

  const isDisableSubmitBtn = (): boolean => {
    return (
      formik.isSubmitting ||
      !formik.isValid ||
      formik.values.username == "" ||
      formik.values.password == ""
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className="logo">
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
              <span className={styles.signInWith}>Or sign in with</span>
              <div className={styles.social}>
                <Button
                  rounded
                  variant="outlined"
                  icon={<Google />}
                  type="button"
                ></Button>

                <Button
                  rounded
                  variant="outlined"
                  icon={<Apple />}
                  type="button"
                ></Button>

                <Button
                  rounded
                  variant="outlined"
                  icon={<Facebook />}
                  type="button"
                ></Button>
              </div>
              <span className={styles.signUp}>
                Don&apos;t have an account?
                <Button variant="text" type="button">
                  Sign Up
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrappImg}>
          <Image
            width={521}
            height={560}
            src="/images/login_img.png"
            alt="login.png"
          />
        </div>
      </div>
    </div>
  );
}
