import { store, addPokemon, removePokemon, resetPokemonTeam, selectedPokemon, Clear } from '@/components/Context';


const TestPokemons = [
    {
        name: 'Pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
    },
    {
        name: 'Charmander',
        url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
    {
        name: 'Bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
];

const PokemonData = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    image : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    base_experience : 112,
    height : 4,
    weight : 60,
    specieName : 'pikachu',
}
test('addPokemon adds a Pokemon to the pokemonTeam state', () => {
	// First, dispatch the addPokemon action to add a Pokemon to the team
	store.dispatch(addPokemon(TestPokemons[0]));

	// Then, retrieve the current state of the store
	const state = store.getState();

	// Finally, verify that the Pokemon was added to the team
	expect(state.pokemonTeam.pokemonTeam).toContain(TestPokemons[0]);
});


test('removePokemon removes a Pokemon from the pokemonTeam state', () => {
    // First, add a Pokemon to the team using the addPokemon action
    store.dispatch(addPokemon(TestPokemons[0]));
  
    // Then, dispatch the removePokemon action to remove the Pokemon from the team
    store.dispatch(removePokemon(TestPokemons[0]));
  
    // Finally, verify that the Pokemon was removed from the team
    const state = store.getState();
    expect(state.pokemonTeam.pokemonTeam).not.toContain(TestPokemons[0]);
  });

test('Adding multiple Pokemon to the team', () => {
    
    TestPokemons.forEach((pokemon) => {
        store.dispatch(addPokemon(pokemon));
    });
    const state = store.getState();
    expect(state.pokemonTeam.pokemonTeam).toEqual(TestPokemons);
});

test('resetPokemonTeam resets the pokemonTeam state', () => {
    TestPokemons.forEach((pokemon) => {
        store.dispatch(addPokemon(pokemon));
    });
    store.dispatch(resetPokemonTeam());
    const state = store.getState();
    expect(state.pokemonTeam.pokemonTeam).toEqual([]);
});

test('selectedPokemon sets the selectedPokemon state', () => {
    store.dispatch(selectedPokemon(PokemonData));
    const state = store.getState();
    expect(state.selectedPokemon).toEqual({
        "Pokemon" : PokemonData,
    });
});

test('Clear resets the selectedPokemon state', () => {
    store.dispatch(selectedPokemon(PokemonData));
    store.dispatch(Clear());
    const state = store.getState();
    // selectedPokemon should be null
    expect(state.selectedPokemon).toEqual({
        "Pokemon" : null,
    });
})



