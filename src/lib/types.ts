export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { slot: number; type: { name: string; url: string } }[];
  abilities: { ability: { name: string; url: string }; is_hidden: boolean; slot: number }[];
  stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
}
