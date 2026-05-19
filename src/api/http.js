const BASE_URL = 'https://pokeapi.co/api/v2'

export async function http(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (!response.ok) throw new Error(`Erro na requisição: ${endpoint}`)
  return response.json()
}