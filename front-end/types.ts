import { SetStateAction, Dispatch } from "react";

declare global {
  type PokemonData = {
    url : string;
    name: string;
    image: string;
    base_experience: number;
    weight: number;
    height: number;
    specieName: string;
  };
  type setSelectedPokemonType = Dispatch<SetStateAction<PokemonData | null>>;
}
