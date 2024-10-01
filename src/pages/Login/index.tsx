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
            width={220}
            height={48}
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
          width={1200}
          height={500}
          src="/images/login.png"
          alt="login.png"
        />
      </div>
      <div className={styles.content}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.wrapper}>
            <div className={styles.loginTitle}>
              <h1>Welcome back!</h1>
              <p>Hey, Enter your detail to get sign in to your account</p>
            </div>
            <div className={styles.loginInput}>
              <Input
                placeholder="Enter Username"
                className={styles.username}
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <InputPassword
                className={styles.password}
                placeholder="Enter Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <Button variant="text" type="button">
                Having trouble in sign in?
              </Button>
            </div>
            <Button
              disabled={formik.isSubmitting}
              variant="contained"
              type="submit"
            >
              Sign in
            </Button>
            <span>Or sign in width</span>
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
            <div>
              Don&apos;t have an account?
              <Button variant="text" type="button">
                <strong>Request Now</strong>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
