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
}

export function translateType(type) {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    return typeTranslations[type] ?? capitalize(type)
}

export function getTypeColor(type) {
    return typeColors[type] ?? { text: '#A8A77A' }
}
