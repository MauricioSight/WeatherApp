import axios from 'axios'
import { getUrl } from './common'

async function getWeather(ciry) {
    try {
        const url = getUrl(ciry)
        const res =  await axios.get(url)

        return filter(res.data)

    } catch (err) {
        return { err: err.response.data.message }
    }
}

function filter(data) {
    return {
        city: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        description: data.weather[0].description,
        icon: data.weather[0].icon
    } 
}

export default getWeather