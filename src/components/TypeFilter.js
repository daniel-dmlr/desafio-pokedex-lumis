import { translateType, getTypeColor } from '../styles/types.js'

export function TypeFilter(types, selectedType = '') {
  const selectedLabel = selectedType ? translateType(selectedType) : 'Todos'
  const selectedColor = selectedType ? getTypeColor(selectedType).text : ''

  const options = [...types]
    .sort((a, b) => translateType(a.name).localeCompare(translateType(b.name), 'pt-BR'))
    .map(({ name }) => {
      const { text } = getTypeColor(name)
      return `
        <li
          data-value="${name}"
          data-color="${text}"
          class="px-6 py-2 cursor-pointer hover:bg-[#F2F2F7] font-bold leading-none"
          style="color: ${text};"
        >
          ${translateType(name)}
        </li>
      `
    })
    .join('')

  return `
    <div class="relative w-full sm:w-52" id="type-filter-wrapper">
      <button
        id="type-filter-trigger"
        type="button"
        class="flex items-center justify-between w-full h-14 pl-6 pr-4 bg-[#F2F2F7] rounded-[28px] focus:outline-none cursor-pointer"
      >
        <span
          id="type-filter-label"
          class="font-bold leading-none"
          style="color: ${selectedColor || '#1C1C1E'};"
        >
          ${selectedLabel}
        </span>
        <span id="type-filter-chevron" class="flex items-center justify-center w-8 h-8 transition-transform duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#1E1E1E" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <ul
        id="type-filter-dropdown"
        class="hidden absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto py-2"
      >
        <li
          data-value=""
          data-color=""
          class="px-6 py-2 cursor-pointer hover:bg-[#F2F2F7] font-bold leading-none"
          style="color: #1C1C1E;"
        >
          Todos
        </li>
        ${options}
      </ul>
    </div>
  `
}
