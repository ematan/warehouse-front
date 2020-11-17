import axios from 'axios'

const baseUrl = 'https://bad-api-assignment.reaktor.com'

// Products path: /products/:category
// Availability path: /availability/:manufacturer
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const getAll = (category) => {
  const request = axios.get(`${baseUrl}/products/${category}`)
  return request.then(response => response.data)
}



const getAvailability = (manufacturer) => {
  let headers = {}
  if (getRandomInt(3) === 0){
    headers = { 'x-force-error-mode': 'all' }
    //console.log(headers)
  }
  const request = axios.get(`${baseUrl}/availability/${manufacturer}`, { headers })
  return request.then(response => response.data)
}

export default { getAll, getAvailability }