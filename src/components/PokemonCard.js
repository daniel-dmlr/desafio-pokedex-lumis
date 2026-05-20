import { getSpriteUrl, formatId, capitalize, translateType, getTypeColor } from '../utils/pokemon.js'
import { Loading } from './Loading.js'

export function PokemonCard(pokemon) {
  const { id, name, types } = pokemon
  const spriteUrl = getSpriteUrl(id)

  const typesBadges = types
    .map(({ type }, index) => {
      const { text } = getTypeColor(type.name)

      return `
        ${index > 0 ? `<span class="w-[3px] h-[3px] rounded-full bg-[#757575] self-center shrink-0"></span>` : ''}

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
        <div class="flex items-center gap-1">
          ${typesBadges}
        </div>

        <span class="text-[#263156] font-bold">
          ${formatId(id)}
        </span>
      </div>

      <div class="relative w-36 h-36 pt-5">
        <div
          class="absolute inset-0 flex items-center justify-center"
        >
          ${Loading()}
        </div>

        <img
          src="${spriteUrl}"
          alt="${capitalize(name)}"
          class="w-36 h-36 object-contain opacity-0 transition-opacity duration-300"
          loading="lazy"
          onload="
            this.classList.remove('opacity-0');
            this.previousElementSibling.remove();
          "
        />
      </div>

      <h3 class="text-[#263156] font-bold pt-3 pb-14">
        ${capitalize(name)}
      </h3>
    </article>
  `
}