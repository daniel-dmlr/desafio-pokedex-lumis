import { describe, it, expect } from 'vitest'
import { formatId, capitalize, getSpriteUrl, getIdFromUrl } from './pokemon.js'

describe('formatId', () => {
  it('completa IDs de um dígito com dois zeros', () => {
    expect(formatId(1)).toBe('#001')
  })

  it('completa IDs de dois dígitos com um zero', () => {
    expect(formatId(25)).toBe('#025')
  })

  it('não completa IDs de três dígitos', () => {
    expect(formatId(150)).toBe('#150')
  })

  it('não completa IDs acima de 999', () => {
    expect(formatId(1000)).toBe('#1000')
  })
})

describe('capitalize', () => {
  it('coloca a primeira letra em maiúscula', () => {
    expect(capitalize('pikachu')).toBe('Pikachu')
  })

  it('mantém o restante da string sem alteração', () => {
    expect(capitalize('bulbasaur')).toBe('Bulbasaur')
  })

  it('mantém nomes com hífen sem alterar o restante', () => {
    expect(capitalize('mr-mime')).toBe('Mr-mime')
  })
})

describe('getSpriteUrl', () => {
  it('constrói a URL do artwork oficial para o ID informado', () => {
    expect(getSpriteUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    )
  })
})

describe('getIdFromUrl', () => {
  it('extrai o ID numérico de uma URL da PokeAPI', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/150/')).toBe(150)
  })

  it('retorna um número, não uma string', () => {
    expect(typeof getIdFromUrl('https://pokeapi.co/api/v2/pokemon/1/')).toBe('number')
  })
})