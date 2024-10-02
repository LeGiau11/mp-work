import { useRouter } from "next/router";
import { useFormik } from "formik";
import Image from "next/image";

import { Button, Input, InputPassword } from "@/components";
import { RequestLogin } from "./interface";
import styles from "./Login.module.scss";
import { ResponseData } from "@/common";
import { Apple, Facebook, Google, Language } from "@/svg";

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
    <section className={styles.container}>
      <div className={styles.logo}>
        <div className="left">
          <Image
            width={140}
            height={40}
            src="/images/logo.png"
            alt="logo.png"
          />
        </div>
        <div className={styles.logoRight}>
          <Button variant="text" type="button" icon={<Language />} />
          <Button variant="text" type="button">
            Sign up
          </Button>
          <Button variant="contained" type="button">
            Request Demo
          </Button>
        </div>
      </div>
      <div className={styles.image}>
        <Image
          width={1255}
          height={500}
          src="/images/login.png"
          alt="login.png"
        />
      </div>
      <div className={styles.content}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.loginTitle}>
            <h1>Welcome back!</h1>
            <p>Hey, Enter your detail to get sign in to your account</p>
          </div>
          <div className={styles.loginInput}>
            <div>
              <Input
                placeholder="Enter Username"
                className={styles.username}
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <span className={styles.errorMessage}>
                Tên người dùng không được để trống.
              </span>
            </div>
            <div>
              <InputPassword
                className={styles.password}
                placeholder="Enter Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span className={styles.errorMessage}>
                Tên người dùng không được để trống.
              </span>
            </div>
            <Button
              className={styles.forgotPassword}
              variant="text"
              type="button"
            >
              Forgot password?
            </Button>
          </div>
          <Button
            disabled={formik.isSubmitting}
            variant="contained"
            type="submit"
          >
            Sign in
          </Button>
          <span className={styles.signInWith}>Or sign in with</span>
          <div className={styles.social}>
            <Button variant="outlined" icon={<Google />} type="button">
              Google
            </Button>

            <Button variant="outlined" icon={<Apple />} type="button">
              Apple
            </Button>

            <Button variant="outlined" icon={<Facebook />} type="button">
              Facebook
            </Button>
          </div>
          <div className={styles.haveAnAccount}>
            Don&apos;t have an account?
            <Button variant="text" type="button">
              Request Now
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
