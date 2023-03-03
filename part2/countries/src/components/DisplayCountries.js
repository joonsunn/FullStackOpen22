import axios from "axios";
import {useEffect, useState} from 'react'
import countryServices from "../services/countryServices";
import weatherServices from "../services/weatherServices"

const DisplayCapital = ({country}) => {

    if (country.capital.length > 1) {
      return (
        <div>
          capital cities:
          <ul>
            {country.capital.map((capital, index) => <li key = {index}>{capital}</li>)}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          capital: {country.capital}
        </div>
      )
    }
  }
  
  const DisplayLanguages = ({country}) => {
    const countryLanguages = []
    for (const key in country.languages) {
      countryLanguages.push(country.languages[key])
    }
    return (
      <>
      <h3>languages:</h3>
      <ul>
        {countryLanguages.map((language, index) => <li key = {index}>{language}</li>)}
      </ul>
      </>
      
    )
  }
  
  const DisplayArea = ({country}) => {
    return (
      <div>
        area: {country.area} km<sup>2</sup>
      </div>
    )
  }
  
  const DisplayFlag = ({country}) => {
    return (
      <div>
        <img src = {country.flags.png} alt = {`flag of the country of ${country.name.common}`}></img>
      </div>
    )
  }
  
  const DisplayCountries = ({countries}) => {
    if (countries.length >= 10) {
  
      return (
        <>
          Too many results. Please be more specific in your query.
        </>
      )
    } else if (countries.length >= 1) {
  
      return (
        <>
          {countries.map((country, index) => <DisplayCountryNameAndInfo country = {country} index = {index} key = {index}></DisplayCountryNameAndInfo>)}
        </>
      )
    } 
  }
  
  const DisplayWeather = ({country}) => {
    const weather = weatherServices.useGetCapitalWeather(country)
  
    if (weather) {
      console.log("weather info:", weather)
      const weatherImg = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      return (
        <div>
            <h2>Weather in {country.capital} </h2>
            <p>temperature: {(weather.main.temp - 273).toFixed(2)} Celcius</p>
            <p><img src = {weatherImg} alt = {`current weather at ${country.capital} is currently ${weather.weather[0].main}`}></img></p>
            <p>weather description: {weather.weather[0].description}</p>
            <p>wind: {weather.wind.speed} m/s</p>
        </div>
      )
    }
  }
  
  const DisplayCountryInfo = ({country, index}) => {
    return (
        <div key = {index}>
            <DisplayCapital country = {country}></DisplayCapital>
            <DisplayArea country = {country}></DisplayArea>
            <DisplayLanguages country = {country}></DisplayLanguages>
            <DisplayFlag country = {country}></DisplayFlag>
            <DisplayWeather country = {country}></DisplayWeather>
        </div>
      )
  }
  
  const DisplayCountryNameAndInfo = ({country, index}) => {
    const [visible, setVisible] = useState(false) // adapted from https://www.quora.com/How-can-I-make-hide-show-of-multiple-divs-with-ReactJS
    const toggleVisible = () => {setVisible(!visible)}
    
    if (visible) {
      return (
        <li>
          {country.name.common} <button onClick = {toggleVisible}>{visible ? "hide info" : "show info"}</button>
          <DisplayCountryInfo country = {country}></DisplayCountryInfo>
        </li>
      )
    } else {
      return (
        <li>
          {country.name.common} <button onClick = {toggleVisible}>{visible ? "hide info" : "show info"}</button>
        </li>
      )
    }
  }

  export default DisplayCountries