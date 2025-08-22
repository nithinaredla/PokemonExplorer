// src/app/pokemon/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPokemon } from "@/lib/api";
import { Pokemon } from "@/lib/types";
import Image from "next/image";
export default function PokemonDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPokemon(id, controller.signal);
                setPokemon(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    if (err.name !== "CanceledError") {
                        setError("Failed to load Pokémon. Please try again.");
                    }
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        }

        load();
        return () => controller.abort();
    }, [id]);

    if (loading) {
        return <div className="text-center py-10">Loading Pokémon...</div>;
    }

    if (error || !pokemon) {
        return (
            <div className="text-center py-10">
                <p className="text-red-600">{error || "Pokémon not found."}</p>
                <button
                    onClick={() => location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-4">
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} height={160} width={160}/>
                <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>

                {/* Types */}
                <div className="flex gap-2">
                    {pokemon.types.map((t) => (
                        <span
                            key={t.slot}
                            className="px-3 py-1 bg-gray-100 rounded capitalize text-sm"
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-6 w-full">
                    <h2 className="text-xl font-semibold mb-2">Base Stats</h2>
                    <ul className="space-y-2">
                        {pokemon.stats?.map((s) => (
                            <li
                                key={s.stat.name}
                                className="flex justify-between border-b pb-1"
                            >
                                <span className="capitalize">{s.stat.name}</span>
                                <span>{s.base_stat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Abilities */}
                <div className="mt-6 w-full">
                    <h2 className="text-xl font-semibold mb-2">Abilities</h2>
                    <ul className="flex flex-wrap gap-2">
                        {pokemon.abilities?.map((a) => (
                            <li
                                key={a.ability.name}
                                className="px-3 py-1 bg-blue-100 rounded capitalize text-sm"
                            >
                                {a.ability.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
