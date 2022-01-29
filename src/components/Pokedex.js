import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonInfo from './PokemonInfo';
import useFetchPokemons from '../hooks/useFetchPokemons';
import { useEffect, useState } from 'react';
import {get} from 'axios';

const Pokedex = () => {
    const [urlsPokemon, totalPages] = useFetchPokemons();

    const [types, setTypes] = useState([]);
    const [wantedPokemon, setWantedPokemon] = useState("");

    const name = useSelector(state => state.name);
    const page = useSelector(state => state.page);
    const dispatch = useDispatch();

    const navigate = useNavigate();
 
    useEffect(() => { 
        get(`https://pokeapi.co/api/v2/type/`)
        .then(({data}) => setTypes(data.results))
    },[ ])

    const searchPokemon = () => {
        navigate(`/pokedex/${wantedPokemon}`)
    }
 
    return (
        <section>
            <h1>Pokemons</h1>
            <p>Welcome <b>{name}</b></p>
            <select onChange={e => dispatch({type:"SELECT_TYPE",payload:`${e.target.value}`}) }>
                <option value="All">All Pokemons</option>
                {
                    types.map(type => (
                        <option value={type.url} key={type.url}>{type.name}</option>
                    ))
                }
            </select>
            <div>
                <input type="text" placeholder='Name or Type' onChange={e => setWantedPokemon(e.target.value)} />
                <button onClick={() => searchPokemon() }>Search</button>
            </div>
            <button onClick={() => dispatch({type:"PREV_PAGE"})}>Previus Page</button> 
                <p>{page} / {totalPages}</p>
            <button onClick={() => dispatch({type:"NEXT_PAGE"})}>Next Page</button>
            <br/>
            <br/>
            
                <div className="pokemon-content">
                    {
                        urlsPokemon?.map(url => (
                            <div className='pokemon-card' key={url}>
                                <PokemonInfo url={url} />
                            </div>
                        ))
                    }
                </div>
        
            
        </section>
    );
};

export default Pokedex;