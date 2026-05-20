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
    fire: { text: '#FF9741' },
    water: { text: '#3692DC' },
    grass: { text: '#38BF4B' },
    electric: { text: '#FBD100' },
    psychic: { text: '#FF6675' },
    ice: { text: '#4CD1C0' },
    dragon: { text: '#4F60E2' },
    dark: { text: '#5B5466' },
    fairy: { text: '#FB89EB' },
    fighting: { text: '#E0306A' },
    poison: { text: '#B567CE' },
    ground: { text: '#E87236' },
    rock: { text: '#C8B686' },
    ghost: { text: '#556AAE' },
    bug: { text: '#83C300' },
    steel: { text: '#5A8EA2' },
    flying: { text: '#89AAE3' },
    normal: { text: '#919AA2' },
    stellar: { text: '#40B5A5' },
    unknown: { text: '#6e6e6e' },
}

export function getTypeColor(type) {
    return typeColors[type] ?? { text: '#919AA2' }
}