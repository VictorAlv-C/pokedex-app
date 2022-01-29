import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {get} from 'axios';

const NameForm = () => {
    const [name, setName] = useState("");
    const [pokemon, setPokemon] = useState({});
    const [whatPokemon, setWhatPokemon] = useState(false);
    const [loader, setLoader] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = e => {
        e.preventDefault();
        dispatch({type:"SET_NAME", payload: name});
        navigate("/pokedex");
    }

    const pokemonRandom = () => {
        get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898) + 1}/`)
        .then(({data}) => {setPokemon(data);
            setLoader(false);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => pokemonRandom() ,[  ])

    return (
        <section className='page-start'>

            <div className='who-pokemon'>
            {
                loader ? (<div className="loader-pokeball"></div> 
                        ) : (
                            <div className="img-container">
                                <img src={pokemon.sprites?.other['official-artwork']?.front_default} 
                                alt="Pokemon Oculto" className={`${whatPokemon ? 'show' : ''}`}
                                />
                            </div>
                            
                        )
            }  
                {
                    whatPokemon ? (
                        <>
                            <p className='name-pokemon'>Is: <b>{pokemon.name}</b></p>
                        </>
                    ) : (
                        <>
                            <p className="who-is">Who is this</p>
                            <div className="container-btn-show">
                                <button onClick={() => setWhatPokemon(true)}>Discover</button>
                            </div>
                        </>
                         )
                }
                
            </div>
            
            <div className="page-start-welcome">

                <h1>Hi,</h1>
                <form onSubmit={submit}>
                    <label >
                        <input type="text" 
                            id='name'
                            placeholder='type your name to entry'
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </label>
                    <button><i class="fas fa-door-open"></i></button>
                 </form>

             </div>
            
        </section>
    );
};



export default NameForm;