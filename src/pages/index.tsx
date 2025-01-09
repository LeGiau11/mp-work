import { useState } from "react";

import { Avatar, Checkbox, Loader, ProgressBar, Radio, Toggle, Tooltip } from "@/components";

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
				<Avatar status="away" size="tiny" text="GL" />
				{/* <Loader size="giant" animated/> */}
			</div>
			{/* <ProgressBar position="right" value={90.5} animated /> */}
		</>
	);
}
