import axios from 'axios'
import { Alert } from 'react-native'

import { getUrlByCity, getUrlByCoord, utcToTimezoneDate } from '../common'

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
        localTime: utcToTimezoneDate(data.dt, data.timezone),
        sunRise: utcToTimezoneDate(data.sys.sunrise, data.timezone),
        sunSet: utcToTimezoneDate(data.sys.sunset, data.timezone),
        coord: {
            latitude: data.coord.lat,
            longitude: data.coord.lon,
        }
    }
}

export { getWatherWithoutCatch }
export default getWeather