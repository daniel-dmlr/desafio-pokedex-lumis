import '../styles/style.css'
import { fetchPokemonList, fetchPokemonDetails, fetchPokemon } from '../api/services/pokemon.js'
// import {fetchTypes,fetchPokemonByType} from '../api/services/type.js'
import { SearchBar } from '../components/SearchBar.js'
// import { TypeFilter } from '../components/TypeFilter.js'
import { PokemonCard } from '../components/PokemonCard.js'
import { Pagination } from '../components/Pagination.js'
import { Loading } from '../components/Loading.js'
import { getTotalPages } from '../utils/pagination.js'
import { debounce } from '../utils/debounce.js'

let state = {
    pokemon: [],
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
            gridEl.innerHTML = '<p class="col-span-full whitespace-nowrap">Nenhum Pokémon encontrado.</p>'
            return
        }

        gridEl.innerHTML = pokemon.map(PokemonCard).join('')
    }

    function renderPagination() {
        const { currentPage, totalPages, searchQuery, selectedType } = state

        if (searchQuery || selectedType) {
            paginationEl.innerHTML = ''
            return
        }

        Pagination({
            currentPage,
            totalPages,
            container: paginationEl,

            onPageChange: async (page) => {
                await loadPage(page)
            },
        })
    }

    async function renderControls() {
        // const types = await fetchTypes().catch(() => [])

        controlsEl.innerHTML = SearchBar() // + TypeFilter(types, state.selectedType)

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

    const handleSearch = debounce(async (query) => {
        const gen = ++searchGeneration

        state = {
            ...state,
            searchQuery: query,
            selectedType: '',
            isLoading: true,
        }

        renderGrid()

        try {
            const pokemon = await fetchPokemon(query.toLowerCase())

            if (gen !== searchGeneration) return

            state = {
                ...state,
                pokemon: [pokemon],
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
            loadPage(1)
            return
        }

        try {
            const list = await fetchPokemonByType(type)

            const details = await fetchPokemonDetails(
                list.slice(0, 18)
            )

            state = {
                ...state,
                pokemon: details,
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

        // const typeSelect =
        //     controlsEl.querySelector('#type-filter')

        searchInput?.addEventListener('input', (e) => {
            const value = e.target.value.trim()
            if (!value) {
                handleSearch.cancel()
                searchGeneration++
                state = { ...state, searchQuery: '', selectedType: '' }
                loadPage(state.currentPage)
                return
            }
            handleSearch(value)
        })

        // typeSelect?.addEventListener('change', (e) =>
        //     handleTypeFilter(e.target.value)
        // )
    }

    await renderControls()
    await loadPage(1)
}