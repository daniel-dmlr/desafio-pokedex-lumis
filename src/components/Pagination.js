export function Pagination(currentPage, totalPages) {
  if (totalPages <= 1) return ''

  return `
    <nav class="pagination">
      <button class="pagination-btn" data-action="prev" ${currentPage === 1 ? 'disabled' : ''}>
        &laquo;
      </button>
      <span class="pagination-info">${currentPage} / ${totalPages}</span>
      <button class="pagination-btn" data-action="next" ${currentPage === totalPages ? 'disabled' : ''}>
        &raquo;
      </button>
    </nav>
  `
}