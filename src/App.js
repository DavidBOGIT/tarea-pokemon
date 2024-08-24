import './App.css'
import React, { useEffect, useState } from 'react';
import PokemonList from './Components/PokemonList';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const pokemonPromises = data.results.map(async (pokemon, index) => {
      const pokemonDetailsResponse = await fetch(pokemon.url);
      const pokemonDetails = await pokemonDetailsResponse.json();
  
        return {
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
          speciesUrl: pokemonDetails.species.url,
          types: pokemonDetails.types.map(typeInfo => typeInfo.type.name) 
        };
      });
      const pokemonData = await Promise.all(pokemonPromises);
      setPokemonList(pokemonData);
    };
  
    fetchPokemon();
  }, []);
  
  return (
    <div className="App">
      <h1>Pokémon Gallery</h1>
      <PokemonList pokemonList={pokemonList} />
    </div>
  );
};

export default App;


