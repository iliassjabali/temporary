import Loading from '@lib/Loading';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import PokemonCard from '@lib/PokemonCard';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import PokemonModal from '@lib/PokemonModal';
import { useSelector, useDispatch } from 'react-redux';
import { resetPokemonTeam, RootState } from '@lib/Context';

const ELEMENTS_PER_PAGE = 14; // 14 is the max number of pokemon per page, could be changed to 28 since a row is only 7

export default () => {
	const { pokemonTeam, selectedPokemon } = useSelector(
		(state: RootState) => ({
			pokemonTeam: state.pokemonTeam.pokemonTeam,
			selectedPokemon: state.selectedPokemon.Pokemon,
		})
	);
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ['Pokemons'],
		queryFn: ({ pageParam = 0 }) =>
			fetch(
				`https://pokeapi.co/api/v2/pokemon?limit=${ELEMENTS_PER_PAGE}&offset=${pageParam}`
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
				return pages.length * ELEMENTS_PER_PAGE;
			}
		},
	});
	const bottomBoundaryRef = useRef(null);
	useEffect(() => {
		// IntersectionObserver is a browser API that allows us to know when an element is visible
		// in the viewport. We can use it to trigger a fetch for the next page when the user scrolls 
		// to the bottom of the list.
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
	const dispatch = useDispatch();
	if (status === 'loading') {
		return <Loading />;
	}
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-3xl font-bold pb-4">
				{pokemonTeam.length > 0 ? 'Pokémon Team' : 'Pokémon Registry'}
			</h1>
			{
				// check if the pokemonTeam contains any pokemon
				pokemonTeam.length > 0 && (
					<div className="grid gap-4">
						<div className=" flex flex-cols-2 gap-4 md:grid md:grid-cols-7 items-center">
							{pokemonTeam.map((pokemon) => (
								<PokemonCard {...pokemon} />
							))}
						</div>
						<button
							className=" font-bold py-2 px-4 rounded w-auto bg-[#FFDE00] hover:bg-[#B3A125] mx-auto"
							onClick={() => {
								dispatch(resetPokemonTeam());
							}}
						>
							Reset Team
						</button>
						<h1 className="text-3xl font-bold pb-4 text-center">
							Pokémon Registry
						</h1>
					</div>
				)
			}
			{selectedPokemon && <PokemonModal {...selectedPokemon} />}
			{status === 'error' && (
				<div
					className="flex flex-col items-center justify-center"
				>
					<h1 className="text-3xl font-bold pb-4">
						An error has occurred
					</h1>
				</div>
			)}
			{status === 'success' && (
				<div
					// we shoudl have a grid here and spaces between the elements
					className="grid gap-4"
				>
					{data.pages.map((group, i) => (
						<div
							className="grid grid-cols-2 gap-4 align-middle md:grid-cols-7 mx-2"
							key={i}
							//per the documentation of react-query, we should use the index of the page as the key of the group
						>
							{group.results.length === 0 ? (
								<div className="flex flex-col items-center justify-center">
									<h1 className="text-3xl font-bold pb-4 text-center">
										No pokemons
									</h1>
								</div>
							) : (
								group.results.map((Pokemon) => {
									// check if th url and name are not null
									if (Pokemon.url && Pokemon.name) {
										return (
											<PokemonCard
												name={Pokemon.name}
												url={Pokemon.url}
											/>
										);
									}
								})
							)}
						</div>
					))}
				</div>
			)}
			<div className="h-20" ref={bottomBoundaryRef}>
				{isFetchingNextPage ? (
					<div
						// we should have the loading page center the page with background blurred
						className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center"
					>
						<Loading />
					</div>
				) : (
					<p className="text-center text-2xl font-bold">
						You have seen it all
					</p>
				)}
			</div>
		</div>
	);
};
