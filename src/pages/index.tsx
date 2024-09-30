import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.scss";

import { Button } from "@/components";
import Login from "./login";

export default function Layout() {
  const [token, setToken] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    createInitUser();
    const token = localStorage.getItem("token");
    if (token) setToken(token);

    setLoading(false);

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

  if (loading) return <div>loading....</div>;

  return (
    <>
      <Head>
        <title>Home Page - My Next.js App</title>
        <meta name="description" content="Welcome to my awesome Next.js app!" />
      </Head>
      {!token ? <Login /> : null}
      {token ? (
        <div className={`${styles.page}`}>
          <Button
            icon={
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            }
            variant="outlined"
            type="button"
            onClick={handleClick}
          >
            Logout
          </Button>
          <br />
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
