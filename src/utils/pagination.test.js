import { describe, it, expect } from 'vitest'
import { getTotalPages, getOffset } from './pagination.js'

describe('getTotalPages', () => {
  it('divide exatamente sem resto', () => {
    expect(getTotalPages(36, 18)).toBe(2)
    expect(getTotalPages(18, 18)).toBe(1)
  })

  it('arredonda para cima quando há resto', () => {
    expect(getTotalPages(19, 18)).toBe(2)
    expect(getTotalPages(37, 18)).toBe(3)
  })

  it('retorna 0 quando o total é 0', () => {
    expect(getTotalPages(0, 18)).toBe(0)
  })

  it('usa 18 como limite padrão', () => {
    expect(getTotalPages(18)).toBe(1)
    expect(getTotalPages(19)).toBe(2)
  })
})

describe('getOffset', () => {
  it('retorna 0 para a primeira página', () => {
    expect(getOffset(1, 18)).toBe(0)
  })

  it('calcula o offset corretamente para páginas seguintes', () => {
    expect(getOffset(2, 18)).toBe(18)
    expect(getOffset(3, 18)).toBe(36)
    expect(getOffset(10, 18)).toBe(162)
  })

  it('usa 18 como limite padrão', () => {
    expect(getOffset(2)).toBe(18)
  })
})