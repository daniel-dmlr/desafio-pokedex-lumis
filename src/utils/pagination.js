export function getTotalPages(total, limit = 20) {
  return Math.ceil(total / limit)
}

export function getOffset(page, limit = 20) {
  return (page - 1) * limit
}