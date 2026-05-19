import { getSpriteUrl, formatId, capitalize } from '../utils/pokemon.js'

export function PokemonCard(pokemon) {
    const { id, name, types } = pokemon
    const spriteUrl = getSpriteUrl(id)

    const typesBadges = types
        .map(({ type }) => `<span class="type-badge type-${type.name}">${capitalize(type.name)}</span>`)
        .join('')

    return `
    <article class="pokemon-card" data-id="${id}">
      <span class="pokemon-id">${formatId(id)}</span>
      <img src="${spriteUrl}" alt="${capitalize(name)}" class="pokemon-sprite" loading="lazy" />
      <h3 class="pokemon-name">${capitalize(name)}</h3>
      <div class="pokemon-types">${typesBadges}</div>
    </article>
  `
}