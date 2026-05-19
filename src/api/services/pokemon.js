import { http } from '../http.js'

const LIMIT = 20

export async function fetchPokemonList(page = 1) {
  const offset = (page - 1) * LIMIT
  return http(`/pokemon?limit=${LIMIT}&offset=${offset}`)
}

export async function fetchPokemon(nameOrId) {
  return http(`/pokemon/${nameOrId}`)
}

export async function fetchPokemonDetails(list) {
  return Promise.all(list.map(p => fetchPokemon(p.name)))
}