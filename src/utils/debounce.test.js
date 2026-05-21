import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from './debounce.js'

describe('debounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('não chama a função imediatamente', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 400)
    debounced()
    expect(fn).not.toHaveBeenCalled()
  })

  it('chama a função após o atraso configurado', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 400)
    debounced()
    vi.advanceTimersByTime(400)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('não chama a função antes do atraso terminar', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 400)
    debounced()
    vi.advanceTimersByTime(399)
    expect(fn).not.toHaveBeenCalled()
  })

  it('reinicia o timer em chamadas repetidas e dispara apenas uma vez', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 400)
    debounced('a')
    vi.advanceTimersByTime(200)
    debounced('b')
    vi.advanceTimersByTime(200)
    debounced('c')
    vi.advanceTimersByTime(400)
    expect(fn).toHaveBeenCalledOnce()
    expect(fn).toHaveBeenCalledWith('c')
  })

  it('cancel impede a execução da função', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 400)
    debounced()
    debounced.cancel()
    vi.advanceTimersByTime(400)
    expect(fn).not.toHaveBeenCalled()
  })

  it('repassa os argumentos para a função original', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 400)
    debounced('hello', 42)
    vi.advanceTimersByTime(400)
    expect(fn).toHaveBeenCalledWith('hello', 42)
  })
})