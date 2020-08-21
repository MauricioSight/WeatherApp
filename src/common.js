// Url padrão para requisição de clima pelo OpenWeatherApi
const serverUrl = 'https://api.openweathermap.org/data/2.5/weather?'

// Chave para requisição de clima pelo OpenWeatherApi
const apiKey = '700e6eed83533da7f45f74bc4f067917'

// Lista relacional entre o nome do icone da FontAwesome5 e icone receido do OpenWeatherApi
const icon = {
    i01: {
        sun: 'sun',
        moon: 'moon'
    },
    i02: {
        sun: 'cloud-sun',
        moon: 'cloud-moon'
    },
    i03: 'cloud',
    i04: 'cloud',
    i09: 'cloud-showers-heavy',
    i10: {
        sun: 'cloud-sun-rain',
        moon: 'cloud-moon-rain'
    },
    i11: 'bolt',
    i13: 'snowflake',
    i50: 'smog',
}

/**
 * Pegar a Url do OpenWeatherApi para requisição do clima pela nome da cidade.
 * @param {String} city nome da cidade
 * @returns {String} Url
 */
function getUrlByCity(city) {
    return `${serverUrl}q=${city}&appid=${apiKey}&units=metric`
}

/**
 * Pegar a Url do OpenWeatherApi para requisição do climo pelas coordenadas do local.
 * @param {String} coords  coordenadas do local 
 * @returns {String} Url
 */
function getUrlByCoord(coords) {
    return `${serverUrl}lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
}

/**
 * Pegar o icone de acordo com descrição do clima e o horário.
 * Obs: Horário referente número em milisegundos desde 1º de Janeiro de 1970.
 * @param {String} iconServer icone receido pelo servidor do OpenWeatherApi
 * @param {Number} sunRise horário do nascer do sol
 * @param {Number} sunSet horário do pôr do sol
 * @param {Number} currentTime horário atual
 * @returns {String} Nome do icone referente a lib FontAwesome5
 */
function getIcon(iconServer, sunRise, sunSet, currentTime) {
    const iconName = 'i' + iconServer.substr(0, 2)

    if (iconName == 'i02' || iconName == 'i01' || iconName == 'i10') {
        if (currentTime > sunRise && currentTime < sunSet ) {
            return icon[iconName].sun
        } else {
            return icon[iconName].moon
        }
    }
    return icon[iconName]
}

/**
 * Transforma a data recebida pelo OpenWeatherApi no fuso horário do local desejado.
 * Obs: Horário referente número em milisegundos desde 1º de Janeiro de 1970.
 * @param {Number} date Data no UTC em segundos
 * @param {Number} timerzone Fuso horário do local em segundos
 * @returns {Number} Data com o fuso horário desejado em milisegundos
 */
function utcToTimezoneDate(date, timerzone) {
    return date * 1000 + timerzone * 1000 + (new Date().getTimezoneOffset() * 60) * 1000
}

export { getUrlByCity, getUrlByCoord,  getIcon, utcToTimezoneDate }