import './App.css'
import React, { useEffect, useState } from 'react';
import PokemonList from './Components/PokemonList';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      // Obtener la lista de los primeros 151 Pokémon
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
  
      // Crear una lista de promesas para obtener detalles adicionales de cada Pokémon
      const pokemonPromises = data.results.map(async (pokemon, index) => {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.json();
  
        return {
          id: pokemonDetails.id, // El ID también corresponde al número de Pokédex
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default, // Imagen del Pokémon
          speciesUrl: pokemonDetails.species.url, // URL de la especie
          types: pokemonDetails.types.map(typeInfo => typeInfo.type.name) 
        };
      });
  
      // Esperar a que todas las promesas se resuelvan y establecer la lista de Pokémon
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



// useEffect(() => {
//   const fetchPokemon = async () => {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
//     const data = await response.json();
//     const pokemonData = data.results.map((pokemon, index) => ({
//       name: pokemon.name,
//       image: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png,
//       speciesUrl: https://pokeapi.co/api/v2/po2kemon-species/${index + 1}/,
//       id: pokemon.id
//     }));
//     setPokemonList(pokemonData);
//   };

//   fetchPokemon();
// }, []);