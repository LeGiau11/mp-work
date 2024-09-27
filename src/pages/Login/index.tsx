import { useEffect } from "react";
// import clsx from "clsx";

import { Button, Input, InputPassword } from "@/components";
import styles from "./Login.module.scss";

export default function Login() {
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {};

  // const handleCreateUser = async () => {
  //   const userData = {
  //     user_name: "john_doe",
  //     password: "password123",
  //   };

  //   const res = await fetch("/api/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log("User created successfully:", data);
  //   } else {
  //     console.error("Failed to create user:", res.statusText);
  //   }
  // };

  return (
    <section className={styles.container}>
      <form action="#">
        <div className={styles.wrapper}>
          <div className={styles.loginTitle}>
            <h1>Login</h1>
            <p>Hey, Enter your detail to get sign in to your account</p>
          </div>
          <div className={styles.loginInput}>
            <Input
              placeholder="Enter Username"
              className={styles.username}
              type="text"
            />
            <InputPassword className={styles.password} placeholder="Enter Password" />
            <Button variant="text" type="button">
              Having trouble in sign in?
            </Button>
          </div>
          <Button variant="contained" type="submit">
            Sign in
          </Button>
          <span>Or sign in width</span>
          <div className="referenceSocial">
            <Button type="button">Google</Button>
            <Button type="button">Apple ID</Button>
            <Button type="button">Facebook</Button>
          </div>
          <div>
            Don&apos;t have an account?
            <Button variant="text" type="button">
              <strong>Request Now</strong>
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
