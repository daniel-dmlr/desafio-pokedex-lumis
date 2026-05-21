import '../styles/style.css'
import { fetchPokemonList, fetchPokemonDetails, fetchPokemon } from '../api/services/pokemon.js'
import { fetchTypes, fetchPokemonByType } from '../api/services/type.js'
import { SearchBar } from '../components/SearchBar.js'
import { TypeFilter } from '../components/TypeFilter.js'
import { PokemonCard } from '../components/PokemonCard.js'
import { Pagination } from '../components/Pagination.js'
import { Loading } from '../components/Loading.js'
import { getTotalPages } from '../utils/pagination.js'
import { debounce } from '../utils/debounce.js'

let state = {
    pokemon: [],
    typeFilteredList: [],
    currentPage: 1,
    totalPages: 0,
    searchQuery: '',
    selectedType: '',
    isLoading: false,
    error: null,
}

let searchGeneration = 0

export async function HomePage(app) {
    app.innerHTML = `
    <header id="header" class="flex flex-col sm:flex-row w-full items-center justify-between p-8 gap-4 sm:gap-0 border-b border-[#D9D9D9] mb-8">
      <img src="/assets/pokedex-text.png" alt="Pokédex" class="w-[124px]" />

      <div id="home-buttons" class="flex gap-4 w-full sm:w-auto justify-center sm:justify-end">
        <h2 class="hover:bg-[#E5E5E5] rounded-lg p-2 cursor-pointer">Home</h2>
        <h2 class="hover:bg-[#E5E5E5] rounded-lg p-2 cursor-pointer">Pokédex</h2>
      </div>
    </header>

    <div id="controls" class="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 px-4 sm:px-8">
      <div id="search"></div>
      <div id="type-filter"></div>
    </div>

    <div id="pokemon-grid" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mx-4 sm:mx-8"></div>

    <footer id="footer" class="flex w-full justify-center mt-26">
      <div id="pagination"></div>
    </footer>
  `

    const controlsEl = app.querySelector('#controls')
    const gridEl = app.querySelector('#pokemon-grid')
    const paginationEl = app.querySelector('#pagination')

    function renderGrid() {
        const { pokemon, isLoading } = state

        if (isLoading) {
            gridEl.innerHTML = Loading()
            return
        }

        if (pokemon.length === 0) {
            gridEl.innerHTML = '<p class="col-span-full whitespace-nowrap text-center">Nenhum Pokémon encontrado.</p>'
            return
        }

        gridEl.innerHTML = pokemon.map(PokemonCard).join('')
    }

    function renderPagination() {
        const { currentPage, totalPages, searchQuery, selectedType } = state

        if (searchQuery) {
            paginationEl.innerHTML = ''
            return
        }

        Pagination({
            currentPage,
            totalPages,
            container: paginationEl,

            onPageChange: async (page) => {
                if (selectedType) {
                    await loadTypePage(page)
                } else {
                    await loadPage(page)
                }
            },
        })
    }

    async function renderControls() {
        const allTypes = await fetchTypes().catch(() => [])
        const types = allTypes.filter(({ name }) => name !== 'stellar' && name !== 'unknown')

        controlsEl.innerHTML = SearchBar() + TypeFilter(types, state.selectedType)

        bindControlEvents()
    }

    async function loadPage(page) {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        state = {
            ...state,
            isLoading: true,
            error: null,
            currentPage: page,
        }

        renderGrid()

        try {
            const { results, count } = await fetchPokemonList(page)

            const details = await fetchPokemonDetails(results)

            state = {
                ...state,
                pokemon: details,
                totalPages: getTotalPages(count),
                isLoading: false,
            }
        } catch (err) {
            state = {
                ...state,
                isLoading: false,
                error: err.message,
            }
        }

        renderGrid()
        renderPagination()
    }

    async function loadTypePage(page) {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        state = { ...state, isLoading: true, currentPage: page }
        renderGrid()

        const PAGE_SIZE = 18
        const start = (page - 1) * PAGE_SIZE
        const slice = state.typeFilteredList.slice(start, start + PAGE_SIZE)

        try {
            const details = await fetchPokemonDetails(slice)
            state = { ...state, pokemon: details, isLoading: false }
        } catch (err) {
            state = { ...state, isLoading: false, error: err.message }
        }

        renderGrid()
        renderPagination()
    }

    const handleSearch = debounce(async (query) => {
        const gen = ++searchGeneration

        state = {
            ...state,
            searchQuery: query,
            isLoading: true,
        }

        renderGrid()

        try {
            const pokemon = await fetchPokemon(query.toLowerCase())

            if (gen !== searchGeneration) return

            const matchesType = !state.selectedType ||
                pokemon.types.some(({ type }) => type.name === state.selectedType)

            state = {
                ...state,
                pokemon: matchesType ? [pokemon] : [],
                isLoading: false,
            }
        } catch {
            if (gen !== searchGeneration) return

            state = {
                ...state,
                pokemon: [],
                isLoading: false,
            }
        }

        renderGrid()
        renderPagination()
    }, 400)

    async function handleTypeFilter(type) {
        state = {
            ...state,
            selectedType: type,
            searchQuery: '',
            isLoading: true,
        }

        renderGrid()

        if (!type) {
            state = { ...state, typeFilteredList: [] }
            loadPage(1)
            return
        }

        try {
            const list = await fetchPokemonByType(type)

            const details = await fetchPokemonDetails(list.slice(0, 18))

            state = {
                ...state,
                pokemon: details,
                typeFilteredList: list,
                totalPages: getTotalPages(list.length),
                currentPage: 1,
                isLoading: false,
            }
        } catch (err) {
            state = {
                ...state,
                isLoading: false,
                error: err.message,
            }
        }

        renderGrid()
        renderPagination()
    }

    function bindControlEvents() {
        const searchInput = controlsEl.querySelector('#search-input')

        const updatePlaceholder = () => {
            if (!searchInput) return
            searchInput.placeholder = window.innerWidth < 640
                ? 'Faça uma busca por nome ou n°'
                : 'Faça uma busca por nome ou número do pokémon'
        }
        updatePlaceholder()
        window.addEventListener('resize', updatePlaceholder)

        const typeWrapper = controlsEl.querySelector('#type-filter-wrapper')
        const typeTrigger = controlsEl.querySelector('#type-filter-trigger')
        const typeLabel = controlsEl.querySelector('#type-filter-label')
        const typeChevron = controlsEl.querySelector('#type-filter-chevron')
        const typeDropdown = controlsEl.querySelector('#type-filter-dropdown')

        const closeDropdown = () => {
            typeDropdown?.classList.add('hidden')
            typeChevron?.classList.remove('rotate-180')
        }

        searchInput?.addEventListener('input', (e) => {
            const value = e.target.value.trim()
            if (!value) {
                handleSearch.cancel()
                searchGeneration++
                state = { ...state, searchQuery: '' }
                if (state.selectedType) {
                    handleTypeFilter(state.selectedType)
                } else {
                    loadPage(state.currentPage)
                }
                return
            }
            handleSearch(value)
        })

        typeTrigger?.addEventListener('click', () => {
            const isOpen = !typeDropdown.classList.contains('hidden')
            typeDropdown.classList.toggle('hidden', isOpen)
            typeChevron.classList.toggle('rotate-180', !isOpen)
        })

        typeDropdown?.addEventListener('click', (e) => {
            const item = e.target.closest('li')
            if (!item) return

            const { value, color } = item.dataset
            typeLabel.textContent = item.textContent.trim()
            typeLabel.style.color = color || '#1C1C1E'
            if (searchInput) searchInput.value = ''
            closeDropdown()
            handleTypeFilter(value)
        })

        document.addEventListener('click', (e) => {
            if (!typeWrapper?.contains(e.target)) closeDropdown()
        })
    }

    await renderControls()
    await loadPage(1)
}