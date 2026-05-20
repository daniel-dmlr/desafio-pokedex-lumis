export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  container,
}) {
  if (!container) return

  function getVisiblePages(currentPage, totalPages) {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage < 5) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage > totalPages - 4) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  }

  function generatePagination() {
    if (totalPages <= 1) {
      container.innerHTML = ''
      return
    }

    const visiblePages = getVisiblePages(currentPage, totalPages)

    const pages = visiblePages.map((page) => {
      if (page === '...') {
        return `
          <li>
            <span
              class="flex items-center justify-center text-base font-medium w-8 h-8"
            >
              ...
            </span>
          </li>
        `
      }

      const isActive = page === currentPage

      return `
        <li>
          <button
            class="flex items-center justify-center text-base font-medium w-8 h-8 rounded-lg cursor-pointer ${isActive ? 'bg-[#2C2C2C] text-white' : 'hover:bg-[#E5E5E5] text-[#1E1E1E]'}"
            data-page="${page}"
          >
            ${page}
          </button>
        </li>
      `
    }).join('')

    container.innerHTML = `
      <nav aria-label="Paginação" class="mb-14">
       <ul class="flex gap-2 list-none text-base">

          <li>
            <button
              class="flex items-center justify-center gap-2 px-3 py-2 h-8 rounded-lg hover:enabled:bg-[#E5E5E5] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              data-action="prev"
              ${currentPage === 1 ? 'disabled' : ''}
            >
              <img src="/assets/arrow-left.svg" alt="Anterior" class="w-4 h-4" /> Anterior
            </button>
          </li>

          ${pages}

          <li>
            <button
              class="flex items-center justify-center gap-2 px-3 py-2 h-8 rounded-lg  hover:enabled:bg-[#E5E5E5] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              data-action="next"
              ${currentPage === totalPages ? 'disabled' : ''}
            >
              Próximo <img src="/assets/arrow-right.svg" alt="Próxima" class="w-4 h-4" />
            </button>
          </li>

        </ul>
      </nav>
    `
  }

  container.addEventListener('click', (event) => {
    const button = event.target.closest('button')

    if (!button) return

    const action = button.dataset.action
    const selectedPage = Number(button.dataset.page)

    if (action === 'prev' && currentPage > 1) {
      currentPage--
    }

    if (action === 'next' && currentPage < totalPages) {
      currentPage++
    }

    if (selectedPage) {
      currentPage = selectedPage
    }

    generatePagination()

    if (typeof onPageChange === 'function') {
      onPageChange(currentPage)
    }
  })

  generatePagination()
}