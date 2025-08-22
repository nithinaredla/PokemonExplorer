"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) params.set("q", debouncedQuery);
    else params.delete("q");
    params.set("page", "0");
    router.push(`/?${params.toString()}`);
  }, [debouncedQuery,router,searchParams]);

  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
