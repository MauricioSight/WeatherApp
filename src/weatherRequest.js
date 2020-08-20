import axios from 'axios'
import { getUrlByCity, getUrlByCoord } from './common'
import { Alert } from 'react-native'

async function getWeather(city, coord) {
    const url = city ? getUrlByCity(city) : getUrlByCoord(coord)

    try {
        const res = await axios.get(url)

        return filter(res.data)

    } catch (err) {
        Alert.alert('Ops! Something wrong.', `${err}`,
            [{ text: 'OK' }], { cancelable: false })
        return null
    }
}

async function getWatherWithoutCatch(city, coord) {
    const url = city ? getUrlByCity(city) : getUrlByCoord(coord)

    try {
        const res = await axios.get(url)
        
        return filter(res.data)

    } catch (err) {}
}

function filter(data) {
    return {
        city: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunRise: data.sys.sunrise,
        sunSet: data.sys.sunset,
        coord: {
            latitude: data.coord.lat,
            longitude: data.coord.lon,
        }
    }
}

export { getWatherWithoutCatch }
export default getWeather