import { useState, useEffect } from 'react'
import countryService from './services/countyData'
import weatherService from './services/weatherData'

const Find = ({ find, change }) => {
  return (
    <div>
      find countries <input value={find} onChange={change}/>
    </div>
  )
}

const View = ({ countries, showCountry, weather, getWeather }) => {
  const length = countries.length
  if (length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  if (length <= 10 && length > 1) {
    return (
      <div>
        {countries.map(country => <CountryList key={country.name.common} country={country} show={showCountry} />)}
      </div>
    )
  }
  if (length === 1) {
    const country = countries[0]
    if (!weather || (weather.sys.country !== country.altSpellings[0])) {getWeather(country)}
    else {return (<Country country={country} weather={weather}/>)}
  }
  else {
    return (<div>No matches</div>)
  }
}

const CountryList = ({ country, show }) => {
  return (
    <p>
      {country.name.common} <button onClick={() => show(country)}>show</button>
    </p>
  )
}

const Country = ({ country, weather }) => {
  const languages = Object.values(country.languages)
  const capital = country.capital.map((capital, i) => {
    if (i < country.capital.length - 1) {return `${capital}, `} 
    else {return capital}
  })
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        Capital: {capital}
        <br></br>
        Area: {country.area}  
      </div>
      <h3>Languages:</h3>
      {languages.map(language => <li key={language}>{language}</li>)}
      <br></br>
      <img src={country.flags.png} alt={`${country.name.common} flag`} width={"200"} height={"auto"}/>
      <Weather capital={capital} weather={weather}/>
    </div>
  )
}

const Weather = ({ capital, weather }) => {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>
        temperature {weather.main.temp} Celsius
        <br></br>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <br></br>
        wind {weather.wind.speed} m/s
      </p>
    </div>
  )
}

function App() {
  const [find, setFind] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        const filteredCountries = response.filter(country => country.name.common.toLowerCase().includes(find.toLowerCase()))
        setCountries(filteredCountries)
      })
    }
  ,[find])

  const handleFindChange = (event) => {
    setFind(event.target.value)
  }

  const showCountry = (country) => {
    setCountries([country])
  }

  const getWeather = (country) => {
    const [lat, lon] = country.capitalInfo.latlng
    weatherService.getWeatherData(lat, lon)
      .then(response => {
        setWeather(response)
      })
  }

  return (
    <div>
      <Find find={find} change={handleFindChange}/>
      <View countries={countries} showCountry={showCountry} weather={weather} getWeather={getWeather}/>
    </div>
  )
}

export default App
