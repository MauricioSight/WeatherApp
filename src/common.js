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
    i10: 'cloud-rain',
    i11: 'bolt',
    i13: 'snowflake',
    i50: 'smog',
}

function getUrlCity(city) {
    return `${serverUrl}q=${city}&appid=${apiKey}&units=metric`
}

function getUrlCords(coords) {
    return `${serverUrl}lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
}

function getIcon(iconServer, sunSet, currentTime) {
    const iconName = 'i' + iconServer.substr(0, 2)

    if (iconName == 'clearsky' || iconName == 'fewclouds') {
        if (currentTime < sunSet) {
            return icon[iconName].sun
        } else {
            return icon[iconName].moon
        }
    }
    return icon[iconName]
}

export { getUrlCity, getUrlCords,  getIcon}