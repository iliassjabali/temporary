import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
export default ({
  name,
  url,
  index,
  setFavorite,
  isFavorite,
  setSelectedPokemon,
}: {
  name: string;
  url: string;
  index: number;
  setFavorite: (name: string) => void;
  isFavorite: boolean;
  setModelState: (state: boolean) => void;
  setSelectedPokemon: setSelectedPokemonType;
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
        key={index}
        type="button"
        className="border p-4 h-200 w-100 border-gray-200 rounded-lg overflow-hidden bg-[#FFDE00] hover:bg-[#B3A125]"
      >
        <div className="contaier  h-100 w-100">
          <Image
            src={data.image}
            alt={name}
            width={100}
            height={100}
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
    if (error) {
      console.log("Error at " + name + " " + error);
    }
    return null;
  }
};
