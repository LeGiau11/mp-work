import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.scss";

import { Button, Loading } from "@/components";
import { ACCESS_TOKEN, ResponseData } from "@/common";

export default function Layout() {
	const [token, setToken] = useState<string | null>("");
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem(ACCESS_TOKEN);
			if (token) setToken(token);

			setLoading(false);

			if (!token) router.replace("/login");
		}
	}, [router]);

	const handleClick = async (): Promise<void> => {
		//localStorage.removeItem('token');
		const res: ResponseData<unknown> = await fetch("/api/auth/logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => res.json());

		if (res.status === 200) {
			localStorage.clear();
			router.replace("/login");
			return;
		}
	};

	if (loading) return <Loading />;

	return (
		<>
			<Head>
				<title>Home Page - My Next.js App</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Welcome to my awesome Next.js app!" />
			</Head>
			{token ? (
				<div className={styles.page}>
					<Button variant="outline" type="button" onClick={handleClick}>
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
