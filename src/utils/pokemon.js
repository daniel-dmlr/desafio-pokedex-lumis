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