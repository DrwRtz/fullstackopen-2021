import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

  const api_key = process.env.REACT_APP_THY_KEY
  const requestString = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios.get(requestString)
      .then(response => {
        console.log(response.data.current)
        setWeather(response.data.current)
      })
  }, [requestString])

  return (
    <div>
      <h2>{country.name}</h2>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(lang =>
            <li key={lang.name}>{lang.name}</li>
          )}
        </ul>
        <img src={country.flag} height="100" width="150"
          alt="flag of the country"></img>
        <h3>Weather in {country.capital}</h3>
        <div>
            <b>Temperature: </b>{weather.temperature} Celcius
            {weather.length !== 0 ?
              <>
              <br></br>
              <img src={weather.weather_icons[0]} height="70" width="70"
              alt="weatherIcon"></img>
              <br></br>
              </>
              :
              <br></br>
            }
            <b>Wind: </b>{weather.wind_speed} km/h Direction {weather.wind_dir}
        </div> 
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => setSearch(event.target.value)

  const filterMatches = countries.filter(country => country.name
    .toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      find countries
      <input onChange={handleSearch} value={search}/><br></br>
      
      {filterMatches.length > 10 ?
        "Too many matches, specify another filter" 
        :
        filterMatches.length <= 10 && filterMatches.length > 1 ?
        filterMatches.map(country =>
          <div key={country.name}>
            <p>{country.name} 
             <button onClick={() => setSearch(country.name)}>show</button>
            </p>
          </div>
        ) 
        :
        filterMatches.map(country => 
          <Country key={country.name} country={country} />
        )
      }
    </div>
  )
}

export default App;
