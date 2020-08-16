const serverUrl = 'http://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '700e6eed83533da7f45f74bc4f067917'

function getUrl(city) {
    return `${serverUrl + city}&appid=${apiKey}&units=metric`
}

export { getUrl }