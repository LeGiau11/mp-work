import { SearchSelect } from "@/components";
import { Option } from "@/common/interface";

export default function Login() {
  const data: Option[] = [
    { label: "Good", value: "1" },
    { label: "Very good", value: "2" },
    { label: "Excellent", value: "3" },
    { label: "Bad", value: "4" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <SearchSelect value={data[0]} options={data} />
    </div>
  );
}
