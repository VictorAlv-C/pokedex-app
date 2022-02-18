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
                    <div className="pokemon-info">
                        <div className="title">
                            <h3>{pokemon.name}</h3> 
                            <p style={{backgroundColor:`${getColorType(pokemon.types?.[0].type.name)}`}}>
                                    {pokemon.types?.[0].type.name}
                            </p>
                            {
                                  pokemon.types?.length >= 2 &&   
                                  <p style={{backgroundColor:`${getColorType(pokemon.types?.[1].type.name)}`}}>
                                         {pokemon.types?.[1].type.name}
                                  </p>
                            }

                        </div>
                         
                         <div className='pokemon-stats'>

                                <p>{pokemon.stats?.[0].stat.name}:  
                                        {pokemon.stats?.[0].base_stat}
                                </p>
                                <p>{pokemon.stats?.[1].stat.name}:  
                                        {pokemon.stats?.[1].base_stat}
                                </p>
                                <p>{pokemon.stats?.[2].stat.name}:  
                                        {pokemon.stats?.[2].base_stat}
                                </p>
                                <p>{pokemon.stats?.[5].stat.name}:  
                                        {pokemon.stats?.[5].base_stat}
                                </p>

                         </div>
                    </div>
                 
                 <img src={pokemon.sprites?.other['official-artwork']?.front_default} alt="" />
            </Link>    
    );
};

export default PokemonInfo;