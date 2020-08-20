import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'

import commonStyles from '../commonStyles'
import { getIcon } from '../common'


export default props => {
    const weather = props.weather
    const iconName = getIcon(weather.icon, weather.sunSet, new Date().getTime())

    return (
        <>  
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name='map-marker-alt' color='#FFF' size={20} />
                <Text style={style.textWeatherValues}>{weather.city}</Text>
            </View>
            <Text style={style.textDate}>
                {moment().format('ddd, MMM D h:mm a')}
            </Text>
            <View  style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={iconName} color='#FFF' size={50}/>
                <Text style={style.textTemp}>{weather.temp.toFixed(0)}°</Text>
            </View>
            <Text style={style.textWeatherValues}>
                {weather.tempMin.toFixed(0)}°/{weather.tempMax.toFixed(0)}° Feels like {weather.feelsLike.toFixed(0)}°
            </Text>
            <Text style={style.textWeatherValues}>{weather.description}</Text>
        </>
    )
}

const style = StyleSheet.create({
    textWeatherValues: {
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20
    },
    textDate: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 15
    },
    textTemp: {
        marginLeft: 20,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 60
    }
})