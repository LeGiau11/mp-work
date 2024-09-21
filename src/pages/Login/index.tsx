import { MultipleSelect } from "@/components";
import { useEffect, useState } from "react";
import { Options } from "@/components/MultipleSelect/interface";

export default function Login() {
  const [data, setData] = useState<string[]>([]);
  const [options, setOptions] = useState<Options[]>([]);

  const handleChange = (value: string[]) => {
    setData(value);
  };

  useEffect(() => {
    const options: Options[] = [];
    for (let i = 0; i < 10; i++) {
      options.push({ value: `option${i + 1}`, label: `Option${i + 1}` });
    }
    setOptions(options);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <MultipleSelect
        options={options}
        onChange={handleChange}
        selectedValues={data}
        searchPlaceHolder="tìm kiếm..."
      />
    </div>
  );
}
