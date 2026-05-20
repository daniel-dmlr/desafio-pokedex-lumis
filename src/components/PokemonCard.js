import { getSpriteUrl, formatId, capitalize, translateType, getTypeColor } from '../utils/pokemon.js'

export function PokemonCard(pokemon) {
  const { id, name, types } = pokemon
  const spriteUrl = getSpriteUrl(id)

  const typesBadges = types
    .map(({ type }) => {
      const { text } = getTypeColor(type.name)

      return `
        <span
          class="type-badge"
          style="color:${text}; font-weight: 700;"
        >
          ${translateType(type.name)}
        </span>
      `
    })
    .join('')

  return `
    <article
      class="bg-[#F0F3FF] flex flex-col justify-center items-center rounded-lg"
      data-id="${id}"
    >
      <div
        id="pokemon-header"
        class="w-full flex justify-between p-3"
      >
        <div class="flex gap-1">
          ${typesBadges}
        </div>

        <span class="text-[#263156] font-bold">
          ${formatId(id)}
        </span>
      </div>

      <img
        src="${spriteUrl}"
        alt="${capitalize(name)}"
        class="
          w-36 h-36 pt-5
          object-contain
        "
        loading="lazy"
      />

      <h3 class="text-[#263156] font-bold pt-3 pb-14">
        ${capitalize(name)}
      </h3>
    </article>
  `
}