import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {get} from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';


const HeaderPokedex = () => {

    const [types, setTypes] = useState([]);
    const [wantedPokemon, setWantedPokemon] = useState("");
    

    const typeCheked = useSelector(state => state.typeCheked)
    const name = useSelector(state => state.name);
    const dispatch = useDispatch();

    const navigate = useNavigate();
 
    useEffect(() => { 
        get(`https://pokeapi.co/api/v2/type/`)
        .then(({data}) => setTypes(data.results))
    },[ ])

    const searchPokemon = () => {
        navigate(`/pokedex/${wantedPokemon}`)
    }

    const logOut = () => {
        dispatch({type:"SET_NAME",payload:""});
        navigate('/');
    }

    
    return (
        <header className='header-main'>

            <div className='container-title'>
                <b><i class="fas fa-user"></i> {name}</b>
                <div> 
                    <span className='poke-ball'></span>
                    <h1>Pokedéx</h1>
                </div>
                <button onClick={() => logOut()}><i class="fas fa-sign-out-alt"></i></button>
            </div>

            <div className='instruccion'>
                <p>Search a pokemon by name or pokedéx number</p>
                <p>and filter by type</p>
            </div>

            <div className='container-select'>
                {
                    typeCheked ? 
                    (
                        <select onChange={e => dispatch({type:"SELECT_TYPE",payload:`${e.target.value}`})}>
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
                <div className="cheked-type">
                    <input type="checkbox" id='check-select' 
                    checked={typeCheked}
                    onChange={e => dispatch({type:"SET_TYPE_CHEKED", payload: e.target.checked})}/>
                    <label htmlFor='check-select'>{typeCheked ? 'Disable filter by type' : 'Activate filter by type' }</label>
                </div>
                                
            </div>
            
            <Pagination />
            
        </header>
    );
};

export default HeaderPokedex;