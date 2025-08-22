"use client";
import { useEffect, useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { fetchPokemon } from "@/lib/api";
import { Pokemon } from "@/lib/types";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load(){
      setLoading(true);
      const details = await Promise.all(favorites.map(id=>fetchPokemon(id.toString())));
      setPokemons(details);
      setLoading(false);
    }
    if(favorites.length>0) load();
    else { setPokemons([]); setLoading(false); }
  },[favorites]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2"><FaHeart className="text-red-500"/> My Favorites</h1>
      {loading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({length:8}).map((_,i)=><div key={i} className="h-32 bg-gray-200 animate-pulse rounded"/> )}</div> :
      pokemons.length===0 ? <div className="text-center py-10 text-gray-600">No favorites yet. Go add some!</div> :
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map(p=>(
          <Link key={p.id} href={`/pokemon/${p.id}`}>
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              <Image src={p.sprites.front_default} alt={p.name} className="mx-auto h-20 w-20"/>
              <h2 className="text-center font-semibold capitalize">{p.name}</h2>
            </div>
          </Link>
        ))}
      </div>}
    </div>
  );
}
