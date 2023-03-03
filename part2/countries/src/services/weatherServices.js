import axios from "axios"
import {useEffect, useState} from 'react'

const appID = process.env.REACT_APP_API_KEY

const useGetCapitalWeather =  (country) => {
    
    const capitalLat = country.capitalInfo.latlng[0]
    const capitalLon = country.capitalInfo.latlng[1]
    const [weather, setWeather] = useState(null)

    useEffect(() => {axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLon}&appid=${appID}`)
    .then(response => setWeather(response.data))}, [])

    return (
        weather
    )
}

export default {useGetCapitalWeather}