import {  useInfiniteQuery } from '@tanstack/react-query';


export default (PokemonsPerPage : number) => useInfiniteQuery({
    queryKey: ['Pokemons'],
    queryFn: ({ pageParam = 0 }) =>
        fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${PokemonsPerPage}&offset=${pageParam}`
        ).then((res) => res.json()) as Promise<{
            //Schema of the response according to the API
            count: number;
            next: string;
            previous: string | null;
            results: {
                name: string | null;
                url: string | null;
            }[];
        }>,
    getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
            return pages.length * PokemonsPerPage;
        }
    },
})