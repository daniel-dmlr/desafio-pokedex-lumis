import { http } from '../http.js'
import { getOffset } from '../../utils/pagination.js'

const LIMIT = 18

export async function fetchPokemonList(page = 1) {
  const offset = getOffset(page, LIMIT)
  return http(`/pokemon?limit=${LIMIT}&offset=${offset}`)
}

export async function fetchPokemon(nameOrId) {
  return http(`/pokemon/${nameOrId}`)
}

export async function fetchPokemonDetails(list) {
  return Promise.all(list.map((pokemon) => fetchPokemon(pokemon.name)))
}