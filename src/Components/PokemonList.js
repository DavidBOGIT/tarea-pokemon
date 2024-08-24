import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemonList }) => {
  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard
          key={index}
          name={pokemon.name}
          image={pokemon.image}
          id={pokemon.id}
          types={pokemon.types}
        />
      ))}
    </div>
  );
};

export default PokemonList;
