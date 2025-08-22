"use client";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Pokemon } from "@/lib/types";
import { useFavorites } from "@/context/FavoritesContext";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className={`bg-white p-6 rounded-xl border shadow-md transform transition-all duration-300 cursor-pointer relative animate-fade-in
          hover:scale-105 hover:shadow-lg
          ${isFavorite(pokemon.id) ? "border-red-500" : "border-gray-200"}`}
      >
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(pokemon.id);
          }}
          className="absolute top-2 right-2 text-red-500 text-lg transform transition-transform duration-200 hover:scale-125"
        >
          {isFavorite(pokemon.id) ? (
            <FaHeart className="animate-pulse" />
          ) : (
            <FaRegHeart />
          )}
        </button>

        {/* Pokémon Image */}
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          height={96}
          width={96}
          className="mx-auto h-24 w-24"
        />

        {/* Pokémon Name */}
        <h2 className="text-center font-semibold capitalize mt-4 text-lg">
          {pokemon.name}
        </h2>

        {/* Pokémon Types */}
        <div className="flex justify-center gap-2 mt-3">
          {pokemon.types.map((t) => (
            <span
              key={t.slot}
              className="px-3 py-1 text-sm rounded bg-gray-100 capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
