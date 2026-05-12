import { useState , useEffect} from 'react'
import Searchbar from "./components/Searchbar.jsx";
import countryService from './services/countries'
import weatherService from './services/openweather'

const CountryInfo = ({country}) => {
    const capital = country.capital[0]
    const latitude = country.capitalInfo.latlng[0]
    const longitude = country.capitalInfo.latlng[1]

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {capital}</div>
            <div>Area: {country.area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([code, name]) => (
                    <li key={code}>{name}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <WeatherContent capital={capital} latitude={latitude} longitude={longitude} />
        </div>
    )
}

const WeatherContent = ({capital, latitude, longitude}) => {
    const [cityWeather, setCityWeather] = useState(null)
    const [cityWeatherIcon, setCityWeatherIcon] = useState(null)

    useEffect(() => {
        weatherService
            .getCityWeather(latitude, longitude)
            .then(response =>
                setCityWeather(response.data))
    }, [capital, latitude, longitude])

    useEffect(() => {
        if (cityWeather === null) return
            setCityWeatherIcon(weatherService.getCityWeatherIcon(cityWeather.weather[0]))
    }, [cityWeather])

    if (cityWeather !== null) {
        return (
            <div>
                <h1>Weather in {capital}</h1>
                <div>
                    <div>Temperature {cityWeather.main.temp} Celsius</div>
                    <div><img src={cityWeatherIcon} alt={cityWeather.weather[0].main}></img></div>
                    <div>Wind {cityWeather.wind.speed} m/s</div>
                </div>

            </div>
        )
    }
}

const Content = ({countriesFiltered}) => {
    const [spotlightCountry, setSpotlightCountry] = useState(null)

    useEffect(() => {
        if (countriesFiltered.length === 1) {
            countryService
                .getByName(countriesFiltered[0].name.common)
                .then(country => {
                    setSpotlightCountry(country)
                })
        } else {
            setSpotlightCountry(null)
        }
    }, [countriesFiltered])

    if (countriesFiltered.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    else if (countriesFiltered.length === 1) {
        if (!spotlightCountry) return <div>Loading...</div>
        return (
            <div>
                <CountryInfo country={spotlightCountry}/>
            </div>
        )
    }

    else if (spotlightCountry !== null) {
        return (
        <div>
            <CountryInfo country={spotlightCountry}/>
        </div>
        )
    }

    else {
        return (
            <ul>
                {(countriesFiltered).map(country =>
                    <li key={country.cca2}>
                        {country.name.common}
                        <button onClick={() => setSpotlightCountry(country)}>show</button>
                    </li>
                )}
            </ul>
        )
    }
}

function App() {
  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])

  useEffect(() => {
    countryService
        .getAll()
        .then(allCountries => {
          setCountries(allCountries)
        })
  }, [])

  const filterCountries = (event) => {
    setCountriesFiltered(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <>
      <Searchbar filterCountries={filterCountries}/>
      <Content
        countriesFiltered={countriesFiltered}
      />
    </>
  )
}

export default App
