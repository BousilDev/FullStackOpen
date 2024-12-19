import axios from 'axios'
const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(allUrl)
    return request.then(response => response.data)
  }

export default { getAll }