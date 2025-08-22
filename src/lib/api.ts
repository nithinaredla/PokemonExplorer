import axios from "axios";
import { Pokemon, PokemonListResponse } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(offset = 0, limit = 20, signal?: AbortSignal): Promise<PokemonListResponse> {
  const res = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`, { signal });
  return res.data;
}

export async function fetchPokemon(nameOrId: string, signal?: AbortSignal): Promise<Pokemon> {
  const res = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`, { signal });
  return res.data;
}
