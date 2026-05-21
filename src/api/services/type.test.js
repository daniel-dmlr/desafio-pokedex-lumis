import { describe, it, expect, vi } from 'vitest'

vi.mock('../http.js', () => ({ http: vi.fn() }))

import { http } from '../http.js'
import { fetchTypes, fetchPokemonByType } from './type.js'

describe('fetchTypes', () => {
  it('retorna o array de resultados da resposta da API', async () => {
    const mockTypes = [{ name: 'fire' }, { name: 'water' }]
    http.mockResolvedValue({ results: mockTypes })
    const result = await fetchTypes()
    expect(result).toEqual(mockTypes)
  })
})

describe('fetchPokemonByType', () => {
  it('chama o endpoint correto para o tipo informado', async () => {
    http.mockResolvedValue({ pokemon: [] })
    await fetchPokemonByType('fire')
    expect(http).toHaveBeenCalledWith('/type/fire')
  })

  it('extrai o objeto pokémon de cada entrada aninhada', async () => {
    http.mockResolvedValue({
      pokemon: [
        { pokemon: { name: 'charmander', url: 'url/4/' } },
        { pokemon: { name: 'charmeleon', url: 'url/5/' } },
      ],
    })
    const result = await fetchPokemonByType('fire')
    expect(result).toEqual([
      { name: 'charmander', url: 'url/4/' },
      { name: 'charmeleon', url: 'url/5/' },
    ])
  })

  it('retorna um array vazio quando o tipo não possui pokémons', async () => {
    http.mockResolvedValue({ pokemon: [] })
    const result = await fetchPokemonByType('unknown')
    expect(result).toEqual([])
  })
})