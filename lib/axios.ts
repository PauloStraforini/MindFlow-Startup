import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_URL

// Verificando a base URL
console.log('Base URL:', baseUrl)

export const api = axios.create({
  baseURL: baseUrl,  // Usando a variável corretamente
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
