"use client";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "id-asc", label: "ID ↑" },
  { value: "id-desc", label: "ID ↓" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("sort") || "id-asc";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.set("page", "0");
    router.push(`/?${params.toString()}`);
  }

  return (
    <select value={selected} onChange={handleChange} className="p-2 border rounded-lg shadow-sm">
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
