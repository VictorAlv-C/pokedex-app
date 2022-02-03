import PokemonInfo from './PokemonInfo';
import useFetchPokemons from '../hooks/useFetchPokemons';
import HeaderPokedex from './HeaderPokedex';
import Pagination from './Pagination';



const Pokedex = () => {
    const [urlsPokemon] = useFetchPokemons();

    
 
    return (
        <div className='main-page'>

                <HeaderPokedex />
                <section className="pokemon-content">
                    {
                        urlsPokemon?.map(url => (
                            <div className='pokemon-card' key={url}>
                                <PokemonInfo url={url} />
                            </div>
                         ))
                    }
                </section>

        </div>
    );
};

export default Pokedex;