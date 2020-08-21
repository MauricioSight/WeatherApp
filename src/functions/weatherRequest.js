import axios from 'axios'
import { Alert } from 'react-native'

import { getUrlByCity, getUrlByCoord, utcToTimezoneDate } from '../common'

/**
 * Requisita do servidor da OpenWeatherApi as informações sobre o clima de uma dada região.
 * Pode-se escolher em mandar um ou outro parâmetro. Caso mande os 2, a cidade tem prioridade.
 * Para escolher por cordenadas mande: getWeather(false, coord)
 * @param {String} city Nome da cidade
 * @param {Object} coord Coordenadas do local
 * @return {Object} objeto com as informações do clima dada a região ou Null se erro
 */
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

/**
 * Obs: Não alerta caso de erro!
 * Requisita do servidor da OpenWeatherApi as informações sobre o clima de uma dada região.
 * Pode-se escolher em mandar um ou outro parâmetro. Caso mande os 2, a cidade tem prioridade.
 * Para escolher por cordenadas mande: getWeather(false, coord)
 * @param {String} city nome da cidade
 * @param {Object} coord coordenadas do local
 * @return {Object} objeto com as informações do clima dada a região
 */
async function getWatherWithoutCatch(city, coord) {
    const url = city ? getUrlByCity(city) : getUrlByCoord(coord)

    try {
        const res = await axios.get(url)
        
        return filter(res.data)

    } catch (err) {}
}

/**
 * Filtra o obejto recebido pela OpenWeatherApi a qual retorna os parâmetros usados no app.
 * @param {Object} data Obejto recebido pela OpenWeatherApi
 * @return {Object} Objeto filtrado com os parâmetros utilizáveis
 */
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