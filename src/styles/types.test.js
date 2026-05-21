import { describe, it, expect } from 'vitest'
import { translateType, getTypeColor } from './types.js'

describe('translateType', () => {
  it('traduz tipos conhecidos para português', () => {
    expect(translateType('fire')).toBe('Fogo')
    expect(translateType('water')).toBe('Água')
    expect(translateType('grass')).toBe('Planta')
    expect(translateType('electric')).toBe('Elétrico')
  })

  it('capitaliza tipos desconhecidos como fallback', () => {
    expect(translateType('stellar')).toBe('Stellar')
    expect(translateType('unknown')).toBe('Unknown')
  })
})

describe('getTypeColor', () => {
  it('retorna a cor correta para tipos conhecidos', () => {
    expect(getTypeColor('fire')).toEqual({ text: '#EE8130' })
    expect(getTypeColor('water')).toEqual({ text: '#6390F0' })
    expect(getTypeColor('grass')).toEqual({ text: '#7AC74C' })
  })

  it('retorna a cor padrão para tipos desconhecidos', () => {
    expect(getTypeColor('stellar')).toEqual({ text: '#A8A77A' })
    expect(getTypeColor('unknown')).toEqual({ text: '#A8A77A' })
  })
})