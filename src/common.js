const serverUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = '700e6eed83533da7f45f74bc4f067917'

function getUrlCity(city) {
    return `${serverUrl}q=${city}&appid=${apiKey}&units=metric`
}

function getUrlCords(coords) {
    return `${serverUrl}lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
}

export { getUrlCity, getUrlCords }