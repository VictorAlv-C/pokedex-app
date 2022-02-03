import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetchPokemons from '../hooks/useFetchPokemons';

const Pagination = () => {
    const dispatch = useDispatch();
    const [,pagesNumbers, rangeFilterPage] = useFetchPokemons();
    const page = useSelector(state => state.page);

    let filterPagesNumber = pagesNumbers.slice(rangeFilterPage.firtsIndex,rangeFilterPage.lastIndex);


    return (
        <div className='pagination'>
        {
            rangeFilterPage.firtsIndex > 0 && 
                <button onClick={() => dispatch({type:"PREV_RANGE"})} className='btnPN'> 
                    <i className="fas fa-chevron-left"></i> 
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
            rangeFilterPage.lastIndex < pagesNumbers.length && 
                <button onClick={() => dispatch({type:"NEXT_RANGE"})} className='btnPN'> 
                    <i className="fas fa-chevron-right"></i>
                </button> 
        }
      
    </div>
    );
};

export default Pagination;