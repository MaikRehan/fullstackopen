import axios from 'axios'

const api_key = import.meta.env.VITE_COUNTRYDATA_OPENWEATHER_KEY
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather'
const iconUrl = 'https://openweathermap.org/payload/api/media/file'

const getCityWeather = (latitude, longitude) => {
    const request = axios.get(`${baseUrlWeather}?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
    return request.then(response => response)
}

const getCityWeatherIcon = (weather) => {
    return `${iconUrl}/${weather.icon}.png`
}

export default {getCityWeather, getCityWeatherIcon}
