import React, { useEffect, useState } from 'react';
import './Catalog.css'; // Asegúrate de que este archivo exista y tenga estilos

const Catalog = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Obtener detalles de cada Pokémon
                const pokemonDetailsPromises = data.results.map((pokemon) =>
                    fetch(pokemon.url).then((res) => res.json())
                );

                // Esperar por todos los detalles de los Pokémon
                Promise.all(pokemonDetailsPromises)
                    .then((pokemonsData) => {
                        setPokemons(pokemonsData);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setError(error.message);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="catalog">
            <h2>Catálogo de Pokémon</h2>
            <div className="pokemon-grid">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.id} className="pokemon-card">
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`${pokemon.name} Sprite`}
                            className="pokemon-image"
                        />
                        <h3>{pokemon.name}</h3>
                        <p>Altura: {pokemon.height / 10} m</p> {/* Convertir altura a metros */}
                        <p>Peso: {pokemon.weight / 10} kg</p> {/* Convertir peso a kilogramos */}
                        <p>Tipos:</p>
                        <ul>
                            {pokemon.types.map((type, index) => (
                                <li key={index}>{type.type.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Catalog;