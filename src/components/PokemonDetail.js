import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {get} from 'axios';

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({})
    useEffect(() => { 
            get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(({data}) => setPokemon(data))
    },[ ])

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites?.other.home.front_default} alt="" className='pokemon-detail' />
        </div>
    );
};

export default PokemonDetail;