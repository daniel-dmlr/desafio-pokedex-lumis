// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Pagination } from './Pagination.js'

function setup({ currentPage, totalPages, onPageChange = vi.fn() } = {}) {
  const container = document.createElement('div')
  Pagination({ currentPage, totalPages, onPageChange, container })
  return { container, onPageChange }
}

function pageButtons(container) {
  return [...container.querySelectorAll('[data-page]')].map((btn) =>
    Number(btn.dataset.page)
  )
}

describe('Pagination', () => {
  describe('visibilidade', () => {
    it('não renderiza nada quando totalPages é 1', () => {
      const { container } = setup({ currentPage: 1, totalPages: 1 })
      expect(container.innerHTML).toBe('')
    })

    it('não renderiza nada quando totalPages é 0', () => {
      const { container } = setup({ currentPage: 1, totalPages: 0 })
      expect(container.innerHTML).toBe('')
    })

    it('renderiza a navegação quando há mais de uma página', () => {
      const { container } = setup({ currentPage: 1, totalPages: 2 })
      expect(container.querySelector('nav')).not.toBeNull()
    })
  })

  describe('páginas visíveis', () => {
    it('exibe todas as páginas quando totalPages é menor ou igual a 7', () => {
      const { container } = setup({ currentPage: 1, totalPages: 7 })
      expect(pageButtons(container)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    it('exibe reticências no final quando a página atual está no início', () => {
      const { container } = setup({ currentPage: 2, totalPages: 20 })
      expect(pageButtons(container)).toEqual([1, 2, 3, 4, 5, 20])
      expect(container.innerHTML).toContain('...')
    })

    it('exibe reticências no início quando a página atual está no final', () => {
      const { container } = setup({ currentPage: 18, totalPages: 20 })
      expect(pageButtons(container)).toEqual([1, 16, 17, 18, 19, 20])
      expect(container.innerHTML).toContain('...')
    })

    it('exibe reticências nos dois lados quando a página atual está no meio', () => {
      const { container } = setup({ currentPage: 10, totalPages: 20 })
      expect(pageButtons(container)).toEqual([1, 9, 10, 11, 20])
      const ellipses = container.innerHTML.match(/\.\.\./g)
      expect(ellipses).toHaveLength(2)
    })
  })

  describe('página ativa', () => {
    it('destaca o botão da página atual', () => {
      const { container } = setup({ currentPage: 3, totalPages: 7 })
      const activeBtn = container.querySelector('[data-page="3"]')
      expect(activeBtn.className).toContain('bg-[#2C2C2C]')
    })

    it('não destaca os botões das outras páginas', () => {
      const { container } = setup({ currentPage: 3, totalPages: 7 })
      const otherBtn = container.querySelector('[data-page="2"]')
      expect(otherBtn.className).not.toContain('bg-[#2C2C2C]')
    })
  })

  describe('botões de navegação', () => {
    it('desabilita o botão "Anterior" na primeira página', () => {
      const { container } = setup({ currentPage: 1, totalPages: 5 })
      const prev = container.querySelector('[data-action="prev"]')
      expect(prev.disabled).toBe(true)
    })

    it('habilita o botão "Anterior" quando não está na primeira página', () => {
      const { container } = setup({ currentPage: 2, totalPages: 5 })
      const prev = container.querySelector('[data-action="prev"]')
      expect(prev.disabled).toBe(false)
    })

    it('desabilita o botão "Próximo" na última página', () => {
      const { container } = setup({ currentPage: 5, totalPages: 5 })
      const next = container.querySelector('[data-action="next"]')
      expect(next.disabled).toBe(true)
    })

    it('habilita o botão "Próximo" quando não está na última página', () => {
      const { container } = setup({ currentPage: 4, totalPages: 5 })
      const next = container.querySelector('[data-action="next"]')
      expect(next.disabled).toBe(false)
    })
  })

  describe('interação — clique nas páginas', () => {
    it('chama onPageChange com o número da página ao clicar em um botão de página', () => {
      const { container, onPageChange } = setup({ currentPage: 1, totalPages: 7 })
      container.querySelector('[data-page="4"]').click()
      expect(onPageChange).toHaveBeenCalledWith(4)
    })

    it('chama onPageChange ao clicar em "Próximo"', () => {
      const { container, onPageChange } = setup({ currentPage: 2, totalPages: 7 })
      container.querySelector('[data-action="next"]').click()
      expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('chama onPageChange ao clicar em "Anterior"', () => {
      const { container, onPageChange } = setup({ currentPage: 3, totalPages: 7 })
      container.querySelector('[data-action="prev"]').click()
      expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('não chama onPageChange ao clicar em "Anterior" na primeira página', () => {
      const { container, onPageChange } = setup({ currentPage: 1, totalPages: 7 })
      container.querySelector('[data-action="prev"]').click()
      expect(onPageChange).not.toHaveBeenCalled()
    })

    it('não chama onPageChange ao clicar em "Próximo" na última página', () => {
      const { container, onPageChange } = setup({ currentPage: 7, totalPages: 7 })
      container.querySelector('[data-action="next"]').click()
      expect(onPageChange).not.toHaveBeenCalled()
    })
  })
})