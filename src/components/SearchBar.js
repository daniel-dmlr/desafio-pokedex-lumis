export function SearchBar() {
  return `
    <div class="flex items-center  w-180 bg-[#F2F2F7] rounded-[28px]">
      <input
        id="search-input"
        type="search"
        placeholder="Faça uma busca por nome ou número do pokémon"
        class="w-full h-14 pl-6  placeholder-gray-800 cursor-text focus:outline-none bg-transparent"
        autocomplete="off"
      />
      <span class="w-12 h-12 flex items-center justify-center pr-2">
       <img src="/assets/search.svg" alt="Search" class="w-6 h-6" />
      </span>
    </div>
  `
}