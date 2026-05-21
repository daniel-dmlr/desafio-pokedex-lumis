import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../http.js', () => ({ http: vi.fn() }))

import { http } from '../http.js'
import { fetchPokemonList, fetchPokemon, fetchPokemonDetails } from './pokemon.js'

beforeEach(() => vi.clearAllMocks())

describe('fetchPokemonList', () => {
  it('busca a página 1 com offset 0', async () => {
    http.mockResolvedValue({ results: [], count: 0 })
    await fetchPokemonList(1)
    expect(http).toHaveBeenCalledWith('/pokemon?limit=18&offset=0')
  })

  it('busca a página 2 com offset 18', async () => {
    http.mockResolvedValue({ results: [], count: 0 })
    await fetchPokemonList(2)
    expect(http).toHaveBeenCalledWith('/pokemon?limit=18&offset=18')
  })

  it('busca a página 3 com offset 36', async () => {
    http.mockResolvedValue({ results: [], count: 0 })
    await fetchPokemonList(3)
    expect(http).toHaveBeenCalledWith('/pokemon?limit=18&offset=36')
  })
})

describe('fetchPokemon', () => {
  it('busca um pokémon pelo nome', async () => {
    http.mockResolvedValue({ name: 'pikachu', id: 25 })
    const result = await fetchPokemon('pikachu')
    expect(http).toHaveBeenCalledWith('/pokemon/pikachu')
    expect(result).toEqual({ name: 'pikachu', id: 25 })
  })

  it('busca um pokémon pelo ID numérico', async () => {
    http.mockResolvedValue({ name: 'pikachu', id: 25 })
    await fetchPokemon(25)
    expect(http).toHaveBeenCalledWith('/pokemon/25')
  })
})

describe('fetchPokemonDetails', () => {
  it('busca os detalhes de todos os pokémons da lista em paralelo', async () => {
    http.mockResolvedValue({ name: 'bulbasaur', id: 1 })
    const list = [{ name: 'bulbasaur' }, { name: 'ivysaur' }, { name: 'venusaur' }]
    await fetchPokemonDetails(list)
    expect(http).toHaveBeenCalledTimes(3)
    expect(http).toHaveBeenCalledWith('/pokemon/bulbasaur')
    expect(http).toHaveBeenCalledWith('/pokemon/ivysaur')
    expect(http).toHaveBeenCalledWith('/pokemon/venusaur')
  })

  it('retorna um array vazio para uma lista vazia', async () => {
    const result = await fetchPokemonDetails([])
    expect(result).toEqual([])
  })
})