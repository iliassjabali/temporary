import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
interface PokemonData {
  name: string;
  url: string;
  image: string;
  base_experience: number;
  weight: number;
  height: number;
  specieName: string;
}



export default () => {
  const TestData = {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>({
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    height: 10,
    weight: 130,
    base_experience: 142,
    specieName: "ivysaur",
  });
  const PokemonModal = ({
    name,
    url,
    image,
    height,
    weight,
    base_experience,
    specieName,
  }: {
    name: string;
    url: string;
    image: string;
    base_experience: number;
    weight: number;
    height: number;
    specieName: string;
  }) => (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="normal-case text-lg leading-6 font-medium text-gray-900">
                {name}
              </h3>
              <Image
                src={image}
                alt={name}
                width={100}
                height={100}
                placeholder="empty"
                className="w-full h-full object-cover"
              />
              <div className="flex flex-col items-center p-4">
                <div className="mt-2 text-sm text-gray-700">
                  Height: {height} | Weight: {weight}
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  Base experience: {base_experience}
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  Species: {specieName}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              onClick={() => setSelectedPokemon(null)}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-[#FF0000] text-base leading-6 font-medium text-white shadow-sm hover:bg-[#CC0000] focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Close
            </button>
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-wrap">


      {selectedPokemon ? (
        <PokemonModal {...selectedPokemon} />
      ) : (
        <button
          onClick={() =>
            setSelectedPokemon({
              name: "Bulbasaur",
              url: "https://pokeapi.co/api/v2/pokemon/1/",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
              height: 10,
              weight: 130,
              base_experience: 142,
              specieName: "ivysaur",
            })
          }
        >
          Open Modal
        </button>
      )}
    </div>
  );
};
