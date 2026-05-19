import { http } from '../http.js'

export async function fetchTypes() {
  const data = await http('/type')
  return data.results
}

export async function fetchPokemonByType(type) {
  const data = await http(`/type/${type}`)
  return data.pokemon.map(p => p.pokemon)
}