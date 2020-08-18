import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import commonStyles from '../commonStyles'


export default props => {

    return (
        <>
            <Text style={style.textWeatherValues}>{props.weather.city}</Text>
            <Text style={style.textDate}>
                {moment(new Date()).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
            </Text>
            <View>
                <Text style={style.textTemp}>{props.weather.temp}°</Text>
            </View>
            <Text style={style.textWeatherValues}>
                {props.weather.tempMin}°/{props.weather.tempMax}° Feels like {props.weather.feelsLike}°
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
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 60
    },
    textWeatherValues: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20
    },
})