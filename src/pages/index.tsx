import { useState } from "react";

import {
	Avatar,
	Breadcrumb,
	Breadcrumbs,
	Checkbox,
	Loader,
	ProgressBar,
	Radio,
	Toggle,
	Tooltip,
} from "@/components";

export default function Layout() {
	const [state, setState] = useState(false);
	const handleClick = () => setState(!state);
	return (
		<>
			<div
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
					gap: "10px",
				}}
			>
				{/* <Checkbox
					label="vvv"
					// indeterminate
					position="right"
					onChange={handleClick}
					checked={state}
					// disabled
				></Checkbox>
				<Radio
					label="vvv"
					// disabled
					position=""
					checked={state}
					onChange={handleClick}
				></Radio>
				<Toggle
					// disabled
					position="right"
					checked={state}
					onChange={handleClick}
					label="Toggle Switch"
				></Toggle>

				<Tooltip
					title="Hay click vao day!"
					position="bottomLeft"
					trigger="hover"
				>
					<p>vvvv</p>
				</Tooltip> */}
				{/* <Avatar status="away" size="tiny" text="GL" /> */}
				{/* <Loader size="tiny" animated/> */}
				<Breadcrumb>
					<Breadcrumb.Item
						leftIcon={
							<svg
								width="100%"
								height="100%"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="star">
									<path
										id="Path"
										d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							</svg>
						}
						// rightIcon={
						// 	<svg
						// 		width="24"
						// 		height="24"
						// 		viewBox="0 0 24 24"
						// 		fill="none"
						// 		xmlns="http://www.w3.org/2000/svg"
						// 	>
						// 		<g id="star">
						// 			<path
						// 				id="Path"
						// 				d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
						// 				stroke="#FFD29A"
						// 				strokeWidth="1.5"
						// 				strokeLinecap="round"
						// 				strokeLinejoin="round"
						// 			/>
						// 		</g>
						// 	</svg>
						// }
						// href="https://github.com/LeGiau11/mp-work/tree/dev"
					>
						aa
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item disabled>bb</Breadcrumb.Item>
				</Breadcrumb>
				<Breadcrumbs/>
			</div>
			{/* <ProgressBar position="right" value={90.5} animated /> */}
		</>
	);
}
