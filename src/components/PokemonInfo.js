import {get} from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import getColorType from '../utils/getColorType';


const PokemonInfo = ({url}) => {
        const[pokemon, setPokemon] = useState({});
        useEffect(() => { 
            get(url).then(({data}) => setPokemon(data))
        }, [ url ])     

    return (
            <Link to={`/pokedex/${pokemon.id}/`} 
                    className='link-pokemon' 
                    style={{backgroundColor:`${getColorType(pokemon.types?.[0].type.name)}`}}
            >
                 <h3>{pokemon.name}</h3>
                 <img src={pokemon.sprites?.other['official-artwork']?.front_default} alt="" />
            </Link>    
    );
};

export default PokemonInfo;