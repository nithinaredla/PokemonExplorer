"use client";
import { useRouter, useSearchParams } from "next/navigation";

const types = ["all","normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"];

export default function FilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("type") || "all";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "all") params.delete("type");
    else params.set("type", e.target.value);
    params.set("page", "0");
    router.push(`/?${params.toString()}`);
  }

  return (
    <select value={selected} onChange={handleChange} className="p-2 border rounded-lg shadow-sm">
      {types.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
    </select>
  );
}
