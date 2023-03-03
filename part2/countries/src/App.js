import axios from "axios";
import {useEffect, useState} from 'react'
import countryServices from "./services/countryServices";
import weatherServices from "./services/weatherServices";
import DisplayCountries from "./components/DisplayCountries";
import DisplayFilter from "./components/DisplayFilter";

function App() {
  
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  useEffect( () => {
    countryServices.getAll().then(response => setCountries(response))
  }, [])

  const countryFilter = (countryName) => {
    if(countryName.toLowerCase().includes(newSearch)){  //name search
      return true
    }
  }

  const filteredCountries = countries.filter(country => countryFilter(country.name.common))
  
  return (
    <div className="App">
      <DisplayFilter value = {newSearch} onChange = {handleSearchChange}></DisplayFilter>
      <DisplayCountries countries = {filteredCountries}></DisplayCountries>
    </div>
  );
}

export default App;
