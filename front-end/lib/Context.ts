import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

type PokemonContextType = { name: string; url: string };

const PokemonTeam = createSlice({
	name: 'pokemonTeam',
	initialState: {
		pokemonTeam: [] as PokemonContextType[],
	},
	reducers: {
		addPokemon: (state, action: PayloadAction<PokemonContextType>) => {
			//check if the PokemonContextType is already in the team
			if (
				state.pokemonTeam.findIndex(
					(PokemonContextType) => PokemonContextType.name === action.payload.name
				) === -1
			) {
				state.pokemonTeam.push(action.payload);
			}
		},
		removePokemon: (state, action: PayloadAction<PokemonContextType>) => {
			//check if the PokemonContextType is already in the team
			if (
				state.pokemonTeam.findIndex(
					(pokemon) => pokemon.name === action.payload.name
				) !== -1
			) {
				state.pokemonTeam = state.pokemonTeam.filter(
					(pokemon) => pokemon.name !== action.payload.name
				);
			}
		},
		resetPokemonTeam: (state) => {
			state.pokemonTeam = [];
		},
	},
});
const SelectedPokemon = createSlice({
	name: 'selectedPokemon',
	initialState: {
		Pokemon: null as PokemonData | null,
	},
	reducers: {
		selectedPokemon: (state, action: PayloadAction<PokemonData>) => {
			state.Pokemon = action.payload;
		},
		Clear: (state) => {
			state.Pokemon = null;
		},
	},
});

export const store = configureStore({
	reducer: {
		pokemonTeam: PokemonTeam.reducer,
		selectedPokemon: SelectedPokemon.reducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { addPokemon, removePokemon, resetPokemonTeam } =
	PokemonTeam.actions;

export const { selectedPokemon, Clear } = SelectedPokemon.actions;
