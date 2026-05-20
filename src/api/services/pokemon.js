import { http } from '../http.js'
import { getOffset } from '../../utils/pagination.js'

const LIMIT = 18
const TOTAL_POKEMON = 1025

let pokemonCache = null

async function getPokemonList() {
  if (pokemonCache) {
    return pokemonCache
  }

  const data = await http(`/pokemon?limit=${TOTAL_POKEMON}`)

  pokemonCache = data.results

  return pokemonCache
}

export async function fetchPokemonList(page = 1) {
  const pokemonList = await getPokemonList()

  const offset = getOffset(page, LIMIT)

  return {
    count: TOTAL_POKEMON,
    results: pokemonList.slice(offset, offset + LIMIT)
  }
}

export async function fetchPokemon(nameOrId) {
  return http(`/pokemon/${nameOrId}`)
}

export async function fetchPokemonDetails(list) {
  return Promise.all(list.map((pokemon) => fetchPokemon(pokemon.name)))
}