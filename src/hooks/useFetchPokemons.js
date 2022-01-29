import { useEffect, useState } from 'react';
import {get} from 'axios';
import { useSelector } from 'react-redux';

const useFetchPokemons = () => {

    const page = useSelector(state => state.page);
    const pokemonShow = useSelector(state => state.pokemon_show);
    const typeSelected = useSelector(state => state.type_select);

    const [urls, setUrls] = useState([]);

    const lastIndex = page * pokemonShow;
    const firtsIndex = lastIndex - pokemonShow;
  

    useEffect(() => { 
        if(typeSelected === "All"){
            get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1120')
            .then( ({data}) => {setUrls(data.results.map(pokemon => pokemon.url)) 
         })    
        }else {
            get(typeSelected)
            .then(({data}) => {setUrls(data.pokemon.map(pokemon => pokemon.pokemon.url))
            })
        }
    }, [ typeSelected ]);
    
    const totalPages = Math.ceil(urls.length / pokemonShow);
    const urlFilter = urls.slice(firtsIndex,lastIndex);

     return [urlFilter, totalPages]

};

export default useFetchPokemons;