import './styles/style.css'
import { PokemonCard } from './components/PokemonCard.js'
import { SearchBar } from './components/SearchBar.js'
import { Pagination } from './components/Pagination.js'
import { fetchPokemonList, fetchPokemonDetails } from './api/services/pokemon.js'
import { getTotalPages } from './utils/pagination.js'

const app = document.querySelector('#app')

async function render() {
    const { results, count } = await fetchPokemonList(1)
    const pokemons = await fetchPokemonDetails(results)
    const totalPages = getTotalPages(count)

    app.innerHTML = `
    ${SearchBar()}
    <div id="pokemon-grid">
      ${pokemons.map(PokemonCard).join('')}
    </div>
    ${Pagination(1, totalPages)}
  `
}

render()