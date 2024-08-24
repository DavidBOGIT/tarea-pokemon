import React, { useState, useEffect } from 'react';

const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ground: '#E0C068',
    rock: '#B8A038',
    fairy: '#EE99AC',
    poison: '#A040A0',
    bug: '#A8B820',
    dragon: '#7038F8',
    psychic: '#ac30bf',
    flying: '#A890F0',
    fighting: '#C03028',
    normal: '#A8A878',
    ghost: '#705898',
    ice: '#98D8D8',
    steel: '#B8B8D0',
    dark: '#705848',
  };

const PokemonCard = ({ name, image, speciesUrl, id, types }) => {
  const [description, setDescription] = useState('');

  const primaryType = types[0];
  const backgroundColor = typeColors[primaryType] || '#eaedf1';

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(speciesUrl);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const flavorTextEntry = data.flavor_text_entries?.find(entry => entry.language.name === 'en');
        setDescription(flavorTextEntry ? flavorTextEntry.flavor_text : 'No description available.');
      } catch (error) {
        console.error('Error fetching the Pokémon description:', error);
        setDescription('No description available.');
      }
    };
  
    fetchDescription();
  }, [speciesUrl]);
  

  return (
    <div className="pokemon-card" style={{backgroundColor}}>
      <img src={image} alt={name} />
      <p> # {id }  </p>
      <h3>{name}</h3>
      
      <div className="pokemon-types">
        {types.map((type, index) => (
          <span key={index} className={`pokemon-type ${type}`}>
            {type}
          </span>
        ))}
      </div>
      
    </div>
  );
};

export default PokemonCard;
