export function getSpriteUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function getIdFromUrl(url) {
    const parts = url.split('/').filter(Boolean)
    return Number(parts[parts.length - 1])
}

export function formatId(id) {
    return `#${String(id).padStart(3, '0')}`
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const typeTranslations = {
    fire: 'Fogo',
    water: 'Água',
    grass: 'Planta',
    electric: 'Elétrico',
    psychic: 'Psíquico',
    ice: 'Gelo',
    dragon: 'Dragão',
    dark: 'Sombrio',
    fairy: 'Fada',
    fighting: 'Lutador',
    poison: 'Veneno',
    ground: 'Terra',
    rock: 'Pedra',
    ghost: 'Fantasma',
    bug: 'Inseto',
    steel: 'Aço',
    flying: 'Voador',
    normal: 'Normal',
    stellar: 'Estelar',
    unknown: 'Desconhecido',
}

export function translateType(type) {
    return typeTranslations[type] ?? capitalize(type)
}

export const typeColors = {
    fire: { text: '#EE8130' },
    water: { text: '#6390F0' },
    grass: { text: '#7AC74C' },
    electric: { text: '#F7D02C' },
    psychic: { text: '#F95587' },
    ice: { text: '#96D9D6' },
    dragon: { text: '#6F35FC' },
    dark: { text: '#705746' },
    fairy: { text: '#FB89EB' },
    fighting: { text: '#C22E28' },
    poison: { text: '#A33EA1' },
    ground: { text: '#E2BF65' },
    rock: { text: '#B6A136' },
    ghost: { text: '#735797' },
    bug: { text: '#A6B91A' },
    steel: { text: '#B7B7CE' },
    flying: { text: '#A98FF3' },
    normal: { text: '#A8A77A' },
    stellar: { text: '#40B5A5' },
    unknown: { text: '#000000' },
}

export function getTypeColor(type) {
    return typeColors[type] ?? { text: '#A8A77A' }
}