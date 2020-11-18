import axios from 'axios'

const baseUrl = 'https://bad-api-assignment.reaktor.com'

// Products path: /products/:category
// Availability path: /availability/:manufacturer

const getAll = (category) => {
  const request = axios.get(`${baseUrl}/products/${category}`)
  return request.then(response => response.data)
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const getAvailability = (manufacturer) => {
  let headers = {}
  // increase argument for getRandomInt to test error-mode (2 = 50% chance, 3 = 33% etc...)
  if (getRandomInt(1) === 1){
    console.log('error')
    headers = { 'x-force-error-mode': 'all' }
  }
  const request = axios.get(`${baseUrl}/availability/${manufacturer}`, { headers })
  return request.then(response => response.data)
}

export default { getAll, getAvailability }