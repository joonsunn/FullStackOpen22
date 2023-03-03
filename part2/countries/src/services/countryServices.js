import axios from "axios"

const baseURL = 'https://restcountries.com/v3.1/'

const getAll = () => {
    const endPoint  = "all"
    const request = axios.get(baseURL + endPoint)

    return (
        request.then(response => response.data)
    )
}

export default {getAll}