import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import PokemonModal from "@lib/PokemonModal";

const PokeCard = ({
  name,
  url,
  setFavorite,
  isFavorite,
  setSelectedPokemon,
}: {
  name: string;
  url: string;
  setFavorite: (name: string) => void;
  isFavorite: boolean;
  setModelState: (state: boolean) => void;
  setSelectedPokemon: Dispatch<
    SetStateAction<PokemonData | null>
  >;
}) => {
  const { data, error, status } = useQuery({
    queryKey: ["Pokemon", name],
    queryFn: () =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => ({
          base_experience: data.base_experience as number,
          image: data.sprites.other["official-artwork"].front_default as string,
          height: data.height as number,
          weight: data.weight as number,
          specieName: data.species.name as string,
        })),
  });
  if (!data || error) {
    return (
      <div
        key={url}
        className="border p-4 h-250 w-100 border-gray-200 rounded-lg overflow-hidden"
      >
        <div className="contaier  h-fit w-fit">
          <p>Error</p>
        </div>
      </div>
    );
  }
  if (data !== undefined) {
    return (
      <button
        onClick={() => {
          setSelectedPokemon({
            name: name,
            image: data.image,
            base_experience: data.base_experience,
            weight: data.weight,
            height: data.height,
            specieName: data.specieName,
          });
        }}
        key={url}
        type="button"
        className="border p-4 h-250 w-100 border-gray-200 rounded-lg overflow-hidden bg-[#FFDE00] hover:bg-[#B3A125]"
      >
        <div className="contaier  h-200 w-100">
          <Image
            src={data.image}
            alt={name}
            width={100}
            height={200}
            placeholder="empty"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="capitalize font-bold text-xl mb-2 p-6">{name}</h3>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm">Height: {data.height}</p>
            <p className="text-sm">Weight: {data.weight}</p>
            <p className="text-sm">Base Experience: {data.base_experience}</p>
          </div>
        </div>
      </button>
    );
  } else {
    return null;
  }
};

export default () => {
  const TestData = {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );
  return (
    <div>
      {selectedPokemon && (
        <PokemonModal
          {...selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
      )}
      <PokeCard
        name={TestData.name}
        url={TestData.url}
        setFavorite={() => {}}
        isFavorite={false}
        setModelState={() => {}}
        setSelectedPokemon={setSelectedPokemon}
      />
    </div>
  );
};
