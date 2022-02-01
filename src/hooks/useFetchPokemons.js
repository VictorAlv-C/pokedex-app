import { useEffect, useState } from 'react';
import {get} from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const useFetchPokemons = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);
    const pokemonShow = useSelector(state => state.pokemon_show);
    const typeSelected = useSelector(state => state.type_select);
    const rangeFilterPage = useSelector(state => state.rangeFilterPage)

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
                dispatch({type:"SET_PAGE", payload: 1})
                dispatch({type: "RESET_RANGE"})
            })
        }
    }, [ typeSelected ]);

    const urlFilter = urls.slice(firtsIndex,lastIndex);

    const totalPages = Math.ceil(urls.length / pokemonShow);

    let pagesNumbers = [];

    for(let i = 1; i <= totalPages; i++){
        pagesNumbers.push(i);
    }

    let filterPagesNumber = pagesNumbers.slice(rangeFilterPage.firtsIndex,rangeFilterPage.lastIndex);
  
   

     return [urlFilter, filterPagesNumber, rangeFilterPage]

};

export default useFetchPokemons;