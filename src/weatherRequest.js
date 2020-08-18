import axios from 'axios'
import { getUrlCity, getUrlCords } from './common'
import { Alert } from 'react-native'

async function getWeather(city, coord) {
    const url = city ? getUrlCity(city) : getUrlCords(coord)

    try {
        const res = await axios.get(url)

        return filter(res.data)

    } catch (err) {
        console.error(err)
        Alert.alert("Ops! Something wrong.", '',
            [{ text: "OK" }], { cancelable: false })
        return null
    }
}

async function getWatherWithoutCatch(city, coord) {
    const url = city ? getUrlCity(city) : getUrlCords(coord)

    try {
        const res = await axios.get(url)
        
        return filter(res.data)

    } catch (err) {

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
        icon: data.weather[0].icon,
        coord: {
            latitude: data.coord.lat,
            longitude: data.coord.lon,
        }
    }
}

export { getWatherWithoutCatch }
export default getWeather