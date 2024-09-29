import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.scss";

import { Button } from "@/components";
import Login from "./login";

export default function Layout() {
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();
  useEffect(() => {
    createInitUser();
    const token = localStorage.getItem("token");
    setToken(token);

    if (!token) router.push("/login");
  }, []);

  const createInitUser = async () => {
    const res = await fetch("/api/user/InitUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });

    if (res.status === 200) {
      console.log("Created init User");
    } else {
      console.log("Created init User is Failure");
    }
  };

  const handleClick = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Home Page - My Next.js App</title>
        <meta name="description" content="Welcome to my awesome Next.js app!" />
      </Head>
      {!token ? <Login /> : null}
      {token ? (
        <div className={`${styles.page}`}>
          <Button  variant="danger" type="button" onClick={handleClick}>
            Logout
          </Button>
          
          {/* <Header />
        <main className={styles.main}>
          <Sidebar />
          <section className={styles.content}>
            <Button onClick={handleClick}>Logout</Button>
          </section>
        </main>
        <Footer /> */}
        </div>
      ) : null}
    </>
  );
}
