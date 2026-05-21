import { describe, it, expect } from 'vitest'
import { TypeFilter } from './TypeFilter.js'

const mockTypes = [
  { name: 'fire' },
  { name: 'water' },
  { name: 'grass' },
  { name: 'bug' },
]

describe('TypeFilter', () => {
  it('renderiza todos os tipos fornecidos', () => {
    const html = TypeFilter(mockTypes)
    expect(html).toContain('Fogo')
    expect(html).toContain('Água')
    expect(html).toContain('Planta')
    expect(html).toContain('Inseto')
  })

  it('renderiza os tipos ordenados alfabeticamente pelo nome em português', () => {
    const html = TypeFilter(mockTypes)
    const pos = (label) => html.indexOf(label)
    expect(pos('Água')).toBeLessThan(pos('Fogo'))
    expect(pos('Fogo')).toBeLessThan(pos('Inseto'))
    expect(pos('Inseto')).toBeLessThan(pos('Planta'))
  })

  it('exibe "Todos" como label padrão quando nenhum tipo está selecionado', () => {
    const html = TypeFilter(mockTypes)
    expect(html).toMatch(/id="type-filter-label"[\s\S]*?Todos/)
  })

  it('exibe o nome traduzido do tipo como label quando um tipo está selecionado', () => {
    const html = TypeFilter(mockTypes, 'fire')
    expect(html).toMatch(/id="type-filter-label"[\s\S]*?Fogo/)
  })

  it('inclui o atributo data-value para cada tipo', () => {
    const html = TypeFilter(mockTypes)
    expect(html).toContain('data-value="fire"')
    expect(html).toContain('data-value="water"')
  })

  it('não modifica o array original de tipos', () => {
    const original = [{ name: 'fire' }, { name: 'water' }, { name: 'bug' }]
    const copy = [...original]
    TypeFilter(original)
    expect(original).toEqual(copy)
  })
})