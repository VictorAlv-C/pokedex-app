import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {get} from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetchPokemons from '../hooks/useFetchPokemons';

const HeaderPokedex = () => {

    const [types, setTypes] = useState([]);
    const [typeCheked, setTypeCheked] = useState(false);
    const [wantedPokemon, setWantedPokemon] = useState("");
    const [,filterPagesNumber, rangeFilterPage] = useFetchPokemons();

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
        <header className='header-main'>

            <div className='container-title'>
                <div> 
                    <span className='poke-ball'></span>
                    <h1>Pokedéx</h1>
                </div>
                <p>Welcome <b>{name}</b></p>
            </div>

            <div className='container-select'>
                {
                    typeCheked ? 
                    (
                        <select onChange={e => dispatch({type:"SELECT_TYPE",payload:`${e.target.value}`}) }>
                            <option value="All">All Pokemons</option>
                            {
                                types.map(type => (
                                    <option value={type.url} key={type.url}>{type.name}</option>
                                ))
                            }
                         </select> 
                    ) : (
                        <div className='search-name'>
                            <input type="text" placeholder='Name or Type' onChange={e => setWantedPokemon(e.target.value)} />
                            <button onClick={() => searchPokemon() }>Search</button>
                        </div>
                    )
                }
                
                <input type="checkbox" id='check-select' onChange={e => setTypeCheked(e.target.checked)}/>
                
            </div>
            
            
            
            <div className='pagination'>
                {
                    rangeFilterPage.firtsIndex > 0 && 
                        <button onClick={() => dispatch({type:"PREV_RANGE"})}> 
                            Previus 
                        </button> 
                }
                {
                    filterPagesNumber.map(number => (
                        <button key={number} className={`${number === page ? 'page-active' : ''}`} 
                            onClick={() => dispatch({type:"SET_PAGE", payload: number})}>
                                {number}
                        </button>
                    ))
            
                }
                {
                    rangeFilterPage.lastIndex < 70 && 
                        <button onClick={() => dispatch({type:"NEXT_RANGE"})}> 
                            Next 
                        </button> 
                }
              
                
            </div>
            
        </header>
    );
};

export default HeaderPokedex;