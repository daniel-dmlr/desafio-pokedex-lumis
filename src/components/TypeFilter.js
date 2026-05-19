import { capitalize } from '../utils/pokemon.js'

export function TypeFilter(types, selectedType = '') {
  const options = types
    .map(({ name }) => `<option value="${name}" ${name === selectedType ? 'selected' : ''}>${capitalize(name)}</option>`)
    .join('')

  return `
    <select id="type-filter" class="type-select">
      <option value="">Todos os tipos</option>
      ${options}
    </select>
  `
}