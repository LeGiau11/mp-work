import { FC } from "react";
import { useRouter } from "next/router";

import { BreadcrumbsItem, BreadcrumbsProps } from "./interface";
import { Breadcrumb } from "@/components";

const Breadcrumbs: FC<BreadcrumbsProps> = ({
	leftIcon,
	rightIcon,
	separator = "/",
}) => {
	const router = useRouter();
	const pathArray: string[] = router.asPath.split("/").filter((path) => path);
	const breadcrumbs: BreadcrumbsItem[] = pathArray.map((path, index) => {
		const href = "/" + pathArray.slice(0, index + 1).join("/");
		return {
			name: path.charAt(0).toLocaleUpperCase() + path.slice(1),
			href,
		};
	});

	return (
		<nav role="breadcrumbs">
			<Breadcrumb>
				<Breadcrumb.Item leftIcon={leftIcon} rightIcon={rightIcon} href="/">
					Home
				</Breadcrumb.Item>
				{breadcrumbs.map((breadcrumb, index) => {
					return (
						<>
							<Breadcrumb.Separator separator={separator} />
							<Breadcrumb.Item
								leftIcon={leftIcon}
								rightIcon={rightIcon}
								href={breadcrumb.href}
								key={index}
							>
								{breadcrumb.name}
							</Breadcrumb.Item>
						</>
					);
				})}
			</Breadcrumb>
		</nav>
	);
};

export default Breadcrumbs;
