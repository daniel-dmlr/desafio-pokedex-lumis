import { SearchBar } from '../components/SearchBar.js'
import { TypeFilter } from '../components/TypeFilter.js'
import { PokemonCard } from '../components/PokemonCard.js'
import { Pagination } from '../components/Pagination.js'
import { Loading } from '../components/Loading.js'
import { fetchPokemonList, fetchPokemonDetails, fetchPokemon } from '../api/services/pokemon.js'
import { fetchTypes, fetchPokemonByType } from '../api/services/type.js'
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

export async function HomePage(app) {
  app.innerHTML = `
    <header id="header">
      <h1>Pokédex</h1>
      <div id="controls"></div>
    </header>
    <main>
      <div id="pokemon-grid"></div>
      <div id="pagination"></div>
    </main>
  `

  const controlsEl = app.querySelector('#controls')
  const gridEl = app.querySelector('#pokemon-grid')
  const paginationEl = app.querySelector('#pagination')

  function renderGrid() {
    const { pokemon, isLoading, error } = state

    if (isLoading) {
      gridEl.innerHTML = Loading()
      return
    }

    // if (error) {
    //   gridEl.innerHTML = ErrorMessage(error)
    //   gridEl.querySelector('#btn-retry')?.addEventListener('click', () => loadPage(1))
    //   return
    // }

    if (pokemon.length === 0) {
      gridEl.innerHTML = '<p>Nenhum Pokémon encontrado.</p>'
      return
    }

    gridEl.innerHTML = pokemon.map(PokemonCard).join('')
  }

  function renderPagination() {
    const { currentPage, totalPages, searchQuery, selectedType } = state
    paginationEl.innerHTML = searchQuery || selectedType ? '' : Pagination(currentPage, totalPages)
    bindPaginationEvents()
  }

  async function renderControls() {
    const types = await fetchTypes().catch(() => [])
    controlsEl.innerHTML = SearchBar() + TypeFilter(types, state.selectedType)
    bindControlEvents()
  }

  async function loadPage(page) {
    state = { ...state, isLoading: true, error: null, currentPage: page }
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
      state = { ...state, isLoading: false, error: err.message }
    }

    renderGrid()
    renderPagination()
  }

  const handleSearch = debounce(async (query) => {
    state = { ...state, searchQuery: query, selectedType: '' }

    if (!query) {
      loadPage(state.currentPage)
      return
    }

    state = { ...state, isLoading: true }
    renderGrid()

    try {
      const pokemon = await fetchPokemon(query.toLowerCase())
      state = { ...state, pokemon: [pokemon], isLoading: false }
    } catch {
      state = { ...state, pokemon: [], isLoading: false }
    }

    renderGrid()
    renderPagination()
  }, 400)

  async function handleTypeFilter(type) {
    state = { ...state, selectedType: type, searchQuery: '', isLoading: true }
    renderGrid()

    if (!type) {
      loadPage(1)
      return
    }

    try {
      const list = await fetchPokemonByType(type)
      const details = await fetchPokemonDetails(list.slice(0, 20))
      state = { ...state, pokemon: details, isLoading: false }
    } catch (err) {
      state = { ...state, isLoading: false, error: err.message }
    }

    renderGrid()
    renderPagination()
  }

  function bindControlEvents() {
    const searchInput = controlsEl.querySelector('#search-input')
    const typeSelect = controlsEl.querySelector('#type-filter')

    searchInput?.addEventListener('input', e => handleSearch(e.target.value.trim()))
    typeSelect?.addEventListener('change', e => handleTypeFilter(e.target.value))
  }

  function bindPaginationEvents() {
    paginationEl.querySelectorAll('.pagination-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const { currentPage, totalPages } = state
        if (btn.dataset.action === 'prev' && currentPage > 1) loadPage(currentPage - 1)
        if (btn.dataset.action === 'next' && currentPage < totalPages) loadPage(currentPage + 1)
      })
    })
  }

  await renderControls()
  await loadPage(1)
}