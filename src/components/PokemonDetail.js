import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {get} from 'axios';
import getColorType from '../utils/getColorType';

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({})
    const [active, setActive] = useState(true);
    const [species, setSpecies] = useState({});
    const navigate = useNavigate();

    useEffect(() => { 

            get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(({data}) => setPokemon(data))
            .catch((err) => {alert('Pokemon No Found ' + err)
                              navigate('/pokedex')
             });  

             get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
             .then(({data}) => setSpecies(data));       
    },[id])


    const getOrder = () => {
        let order;
        switch (pokemon.order?.toString().length) {
            case 1: return order = `#00${pokemon.order}`
            case 2: return order = `#0${pokemon.order}`
            default: return order = `#${pokemon.order}`
        }
    }

    console.log(species.generation)

    return (
        <section className='pokemon-detail-container' 
                style={{backgroundColor:`${getColorType(pokemon.types?.[0].type.name)}`}}
         >  
            <span className='span-name'>{pokemon.name}</span>
            <div className="pokemon-detail">
                <img src={pokemon.sprites?.other.home.front_default} alt="" />
                <div className="pokemon-info">
                    <div className='pokelogo'> 
                        <span className='poke-ball'></span>
                        <h3>Pokemón</h3>
                    </div>
                    <span>{getOrder()}</span>
                    <h1>{pokemon.name}</h1>
                    <div>
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
                </div>
            </div>
            <div className="pokemon-data">
                    <div className="pokemon-data-title">
                         <h2 onClick={() => setActive(true)}
                             className={`${active ? 'active' : ''}`}
                         >About</h2>
                         <h2 onClick={() => setActive(false)}
                             className={`${active ? '' : 'active'}`}
                         >Base Stats</h2>
                    </div>
                    {
                        active ? ( 
                            <div className="about-content">
                                <div className="left">
                                    <p>Base Experience:</p>
                                    <p>Height:</p>
                                    <p>Weight:</p>
                                    <p>Generation:</p>
                                    <p>Capture Rate:</p>
                                    <p>Habitat:</p>
                                    <p>Abilities: </p>
                                </div>
                                <div className="right">
                                    <b>{pokemon.base_experience}</b>
                                    <b>{`${(pokemon.height / 3.048).toFixed(1)}ft or `} 
                                    ( {`${pokemon.height / 10}`}m )</b>
                                    <b>
                                        {`${(pokemon.weight / 4.536).toFixed(1)}lbs or `}
                                            ( {`${(pokemon.weight / 10)}kg`} )
                                    </b>
                                    <b>
                                        {species.generation?.name ? species.generation?.name : 'unknow'}
                                    </b>
                                    <b>
                                        {species.capture_rate}                                     
                                    </b>
                                    <b>
                                        {species.habitat?.name ? species.habitat?.name : 'unknown' }
                                    </b>
                                    <div className='ability'>
                                        {
                                            pokemon.abilities?.map(ability => (
                                                <b key={ability.ability.name}> '{ability.ability.name}' </b>
                                            ))
                                        }
                                    </div>
                                
                                    
                                </div>
                             </div>
                        ) : ( 
                            <div className='stats-content'> 
                                <div className="left">
                                    <p>HP:</p>
                                    <p>Attack:</p>
                                    <p>Defense:</p>
                                    <p>Special-Attack:</p>
                                    <p>Special-Defense:</p>
                                    <p>Speed: </p>
                                </div>
                                <div className="right">
                                    <div>
                                        <b>{pokemon.stats?.[0].base_stat}</b> <span className='bar'>
                                            <span style={{background:`${getColorType(pokemon.types?.[0].type.name)}`, 
                                                width:`${pokemon.stats?.[0].base_stat}px`}}></span>
                                        </span>
                                    </div>
                                    <div>
                                        <b>{pokemon.stats?.[1].base_stat}</b> <span className='bar'>
                                        <span style={pokemon.types.length >= 2 ? 
                                                        {background:`${getColorType(pokemon.types?.[1].type.name)}`, 
                                                width:`${pokemon.stats?.[1].base_stat}px`} :
                                                        {background:'rgb(4, 108, 245)', 
                                                width:`${pokemon.stats?.[1].base_stat}px`}}></span>
                                        </span>
                                    </div>
                                    <div>
                                        <b>{pokemon.stats?.[2].base_stat}</b> <span className='bar'>
                                            <span style={{background:`${getColorType(pokemon.types?.[0].type.name)}`, 
                                                width:`${pokemon.stats?.[2].base_stat}px`}}></span>
                                        </span>
                                    </div>
                                    <div>
                                        <b>{pokemon.stats?.[3].base_stat}</b> <span className='bar'>
                                        <span style={pokemon.types.length >= 2 ? 
                                                        {background:`${getColorType(pokemon.types?.[1].type.name)}`, 
                                                width:`${pokemon.stats?.[3].base_stat}px`} :
                                                        {background:'rgb(4, 108, 245)', 
                                                width:`${pokemon.stats?.[3].base_stat}px`}}></span>
                                        </span>
                                    </div>
                                    <div>
                                        <b>{pokemon.stats?.[4].base_stat}</b> <span className='bar'>
                                            <span style={{background:`${getColorType(pokemon.types?.[0].type.name)}`, 
                                                width:`${pokemon.stats?.[4].base_stat}px`}}></span>
                                        </span>
                                    </div>
                                    <div>
                                        <b>{pokemon.stats?.[5].base_stat}</b> <span className='bar'>
                                            <span style={pokemon.types.length >= 2 ? 
                                                        {background:`${getColorType(pokemon.types?.[1].type.name)}`, 
                                                width:`${pokemon.stats?.[5].base_stat}px`} :
                                                        {background:'rgb(4, 108, 245)', 
                                                width:`${pokemon.stats?.[5].base_stat}px`}}></span>
                                        </span>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }
                        <p className='description'><b>"{species.flavor_text_entries?.[0].flavor_text}"</b></p>
                </div>
           
        </section>
    );
};

export default PokemonDetail;