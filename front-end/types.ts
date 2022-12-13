import { SetStateAction, Dispatch } from "react";
import {store} from "./components/Context";
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
  type RootState = ReturnType<typeof store.getState>;
  type setSelectedPokemonType = Dispatch<SetStateAction<PokemonData | null>>;
}
