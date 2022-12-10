import Loading from "@lib/Loading";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import PokemonCard from "@lib/PokemonCard";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import PokemonModal from "@lib/PokemonModal";


const ELEMENTS_PER_PAGE = 14; //

export default () => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["Pokemons"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${ELEMENTS_PER_PAGE}&offset=${pageParam}`
      ).then((res) => res.json()),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return pages.length * ELEMENTS_PER_PAGE;
      }
    },
  });
  const bottomBoundaryRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current);
    }
  }, [bottomBoundaryRef, hasNextPage, fetchNextPage]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Pokemons List </h1>
      {selectedPokemon && (
        <PokemonModal
          {...selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
      )}
      {status === "loading" && <Loading />}
      {status === "error" && (
        <p className="text-red-500">Error: {JSON.stringify(error)}</p>
      )}
      {status === "success" && (
        <div
          // we shoudl have a grid here and spaces between the elements
          className="grid gap-4"
        >
          {data.pages.map((group, i) => (
            <div
              className={`grid grid-cols-2 gap-4 align-middle md:grid-cols-7 mx-2`}
              //TODO: this grid should be inn the other div
              key={i}
            >
              {group.results.map(
                (pokemon: { name: string; url: string }, index: number) => (
                  <PokemonCard
                    {...pokemon}
                    index={i ? i * ELEMENTS_PER_PAGE + index : index}
                    setFavorite={() => {}}
                    isFavorite={false}
                    setModelState={() => {}}
                    setSelectedPokemon={setSelectedPokemon}
                  />
                )
              )}
            </div>
          ))}
        </div>
      )}
      <div className="h-20" ref={bottomBoundaryRef}>
        {isFetchingNextPage ? <Loading /> : <p>You have seen it all</p>}
      </div>
    </div>
  );
};

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  //  we fetch the initial data using SS to avoid the flash of unstyled content and to improve the SEO

  return {
    props: await fetch("https://pokeapi.co/api/v2/pokemon?limit=100").then(
      (res) => res.json()
    ),
  };
};
*/
