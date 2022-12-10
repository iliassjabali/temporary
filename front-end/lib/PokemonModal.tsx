import Image from "next/image";
import { useState } from "react";

export default ({
  name,
  image,
  height,
  weight,
  base_experience,
  specieName,
  setSelectedPokemon,
}: PokemonData & {
  setSelectedPokemon: setSelectedPokemonType;
}) => {
  const [isInTeam, setIsInTeam] = useState(false);

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="capitalize text-lg leading-6 font-medium text-gray-900">
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
              <div className="capitalize mt-2 text-sm text-gray-700">
                Species: {specieName}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 px-4 py-3 sm:px-6 gap-4 grid  sm:flex sm:flex-row grid-row-2 border-t">
          <button
            onClick={() => setIsInTeam(!isInTeam)}
            type="button"
            className="inline-flex justify-center  w-full rounded-md text-center px-4 py-2  font-medium  shadow-sm sm:text-sm "
          >
            {isInTeam ? "Remove from team" : "Add to team"}
          </button>

          <button
            onClick={() => setSelectedPokemon(null)}
            type="button"
            className="text-middle  w-full rounded-md text-center px-4 py-2 font-medium  shadow-sm hover:bg-[#CC0000] sm:text-sm "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
