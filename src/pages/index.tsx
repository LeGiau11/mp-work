import { Checkbox, Radio } from "@/components";
import { useState } from "react";

export default function Layout() {
	const [state, setState] = useState(false);
	const handleClick = () => setState(!state);
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				gap: "10px",
			}}
		>
			<Checkbox
				label="vvv"
				// indeterminate
				position='right'
				onChange={handleClick}
				checked={state}
				// disabled
			>
				
			</Checkbox>
			<Radio
				label="vvv"
				// disabled
				position="right"
				checked={state}
				onChange={handleClick}
			></Radio>
		</div>
	);
}
