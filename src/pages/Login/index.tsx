import { useRouter } from "next/router";
import { useFormik } from "formik";
import Image from "next/image";

import { Button, Checkbox, Input, InputPassword } from "@/components";
import { RequestLogin } from "./interface";
import styles from "./Login.module.scss";
import { ResponseData } from "@/common";
import { Apple, Facebook, Google } from "@/svg";

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handlelogIn(values);
    },
  });

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
    }
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
                  />
                  <span className={styles.errorMessage}></span>
                </div>
                <div className={styles.wrapperInput}>
                  <label>Password</label>
                  <InputPassword
                    className={styles.password}
                    placeholder="Enter your password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <span className={styles.errorMessage}></span>
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
                  disabled={formik.isSubmitting}
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
