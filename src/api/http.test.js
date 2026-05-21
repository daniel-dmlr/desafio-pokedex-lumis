import { describe, it, expect, vi, beforeEach } from 'vitest'
import { http } from './http.js'

describe('http', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('chama a URL base da PokeAPI com o endpoint informado', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) })
    await http('/pokemon')
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon')
  })

  it('retorna o corpo JSON parseado em caso de sucesso', async () => {
    const data = { name: 'pikachu', id: 25 }
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(data) })
    const result = await http('/pokemon/pikachu')
    expect(result).toEqual(data)
  })

  it('lança um erro com o endpoint na mensagem em resposta não-ok', async () => {
    fetch.mockResolvedValue({ ok: false })
    await expect(http('/pokemon/invalid')).rejects.toThrow(
      'Erro na requisição: /pokemon/invalid'
    )
  })
})