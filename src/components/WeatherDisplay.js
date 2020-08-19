import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import commonStyles from '../commonStyles'
import { getIcon } from '../common'


export default props => {

    return (
        <>  
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name='map-marker' color='#FFF' size={20} />
                <Text style={style.textWeatherValues}>{props.weather.city}</Text>
            </View>
            <Text style={style.textDate}>
                {moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
            </Text>
            <View  style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={getIcon(props.weather.icon, props.weather.sunSet, new Date().getTime())} color='#FFF' size={50}/>
                <Text style={style.textTemp}>{props.weather.temp.toFixed(0)}°</Text>
            </View>
            <Text style={style.textWeatherValues}>
                {props.weather.tempMin.toFixed(0)}°/{props.weather.tempMax.toFixed(0)}° Feels like {props.weather.feelsLike.toFixed(0)}°
                        </Text>
            <Text style={style.textWeatherValues}>{props.weather.description}</Text>
        </>
    )
}

const style = StyleSheet.create({
    textDate: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 13
    },
    textTemp: {
        marginLeft: 20,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 60
    },
    textWeatherValues: {
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20
    },
})