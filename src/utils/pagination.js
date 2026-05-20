export function getTotalPages(total, limit = 18) {
  return Math.ceil(total / limit)
}

export function getOffset(page, limit = 18) {
  return (page - 1) * limit
}