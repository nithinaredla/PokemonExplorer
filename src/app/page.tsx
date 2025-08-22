"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPokemonList, fetchPokemon } from "@/lib/api";
import { Pokemon } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import SortDropdown from "@/components/SortDropdown";
import PokemonCard from "@/components/PokemonCard";

// ✅ This component uses useSearchParams safely inside Suspense
function PokemonExplorer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const type = searchParams.get("type") || "all";
  const sort = searchParams.get("sort") || "id-asc";
  const [page, setPage] = useState(Number(searchParams.get("page") || 0));

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 30;

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const list = await fetchPokemonList(page * limit, limit, controller.signal);
        let details = await Promise.all(
          list.results.map((p) => fetchPokemon(p.name, controller.signal))
        );

        // Filtering
        if (query) details = details.filter((p) => p.name.includes(query));
        if (type !== "all")
          details = details.filter((p) =>
            p.types.some((t) => t.type.name === type)
          );

        // Sorting
        details.sort((a, b) => {
          switch (sort) {
            case "name-asc":
              return a.name.localeCompare(b.name);
            case "name-desc":
              return b.name.localeCompare(a.name);
            case "id-desc":
              return b.id - a.id;
            default:
              return a.id - b.id;
          }
        });

        setPokemons(details);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "CanceledError") {
          setError("Failed to load Pokémon. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [page, query, type, sort]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pokémon Explorer</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <SearchBar />
        <div className="flex gap-4">
          <FilterDropdown />
          <SortDropdown />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
          {error}{" "}
          <button
            onClick={() => setPage(page)}
            className="underline text-blue-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-5 md:grid-cols-6 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 animate-pulse rounded"
            />
          ))}
        </div>
      ) : pokemons.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No Pokémon found.</div>
      ) : (
        <div className="grid grid-cols-5 md:grid-cols-6 gap-4">
          {pokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ✅ Page component: wraps everything in Suspense
export default function HomePage() {
  return (
    <Suspense fallback={<p>Loading search params...</p>}>
      <PokemonExplorer />
    </Suspense>
  );
}
