import {get} from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';


const PokemonInfo = ({url}) => {
        const[pokemon, setPokemon] = useState({});
        useEffect(() => { 
            get(url).then(({data}) => setPokemon(data))
        }, [ url ])
        let background;
       switch (pokemon.types?.[0].type.name) {
           case 'fire': background = "tomato"
               break;
            case 'water': background = "blue"
                break;
           default: background = "coral"
               break;
       }

       console.log(pokemon.sprites?.versions["generation-i"]['red-blue'].front_default)

    return (
            <Link to={`/pokedex/${pokemon.id}/`} className='link-pokemon' style={{backgroundColor:`${background}`}}>
                 <img src={pokemon.sprites?.other['official-artwork']?.front_default} alt="" />
                 {/* <img src={pokemon.sprites?.["generation-i"]["red-blue"].back_default} alt="" /> */}
                 <h3>{pokemon.name}</h3>
            </Link>    
    );
};

export default PokemonInfo;