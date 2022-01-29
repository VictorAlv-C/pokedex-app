import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import NameForm from './components/NameForm';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';
import RoutesProtected from './components/RoutesProtected';

function App() {
  return (
    <div className="App">

      <HashRouter>
        <Routes>

          <Route path="/" element={<NameForm />} />

          <Route element={<RoutesProtected />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokemonDetail />} />
          </Route>

        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;
