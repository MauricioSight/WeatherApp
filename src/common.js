const serverUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = '700e6eed83533da7f45f74bc4f067917'
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

function getUrlByCity(city) {
    return `${serverUrl}q=${city}&appid=${apiKey}&units=metric`
}

function getUrlByCoord(coords) {
    return `${serverUrl}lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
}

function getIcon(iconServer, sunSet, currentTime) {
    const iconName = 'i' + iconServer.substr(0, 2)

    if (iconName == 'i02' || iconName == 'i01' || iconName == 'i10') {
        if (currentTime < sunSet * 1000) {
            return icon[iconName].sun
        } else {
            return icon[iconName].moon
        }
    }
    return icon[iconName]
}

function utcToTimezoneDate(date, timerzone) {
    return date * 1000 + timerzone * 1000 + (new Date().getTimezoneOffset() * 60) * 1000
}

export { getUrlByCity, getUrlByCoord,  getIcon, utcToTimezoneDate }