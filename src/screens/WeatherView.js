import React, { useState, useEffect  } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import commonStyles from '../commonStyles'
import SaveLocation from './SaveLocation'

const initialState = {
    city: '',
    description: '',
    fellsLike: '',
    temp: '',
    tempMax: '',
    tempMin: ''
}

export default props => {

    const [saveScreen, setSaveScreen] = useState(false)
    const [weatherLocation, setweatherLocation] = useState(initialState)

    useEffect(() => {
        setweatherLocation(props.route.params.weather)
    })

    function onSaveLocation (name) {
        
        const saveLocation = {
            name: name,
            city: weatherLocation.city,
            savedAt: new Date().getTime()
        }
        setSaveScreen(false, props.navigation.navigate('List', { saveLocation }))
    }

    return (
        <View style={style.conteiner}>
            <View style={style.weatherView}>
                <View style={style.options}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon name='chevron-left' color='#FFF' size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='ellipsis-v' color='#FFF' size={20}/>
                    </TouchableOpacity>
                </View>
                <Text style={style.textWeatherValues}>{weatherLocation.city}</Text>
                <Text style={style.textDate}>
                    {moment(new Date()).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
                </Text>
                <View>
                    <Text style={style.textTemp}>{weatherLocation.temp}°</Text>
                </View>
                <Text style={style.textWeatherValues}>
                    {weatherLocation.tempMin}°/{weatherLocation.tempMax}° Feels like {weatherLocation.feelsLike}°
                </Text>
                <Text style={style.textWeatherValues}>{weatherLocation.description}</Text>
            </View>
            <View style={style.content}>
                <TouchableOpacity onPress={() => setSaveScreen(true)}>
                    <View style={style.favorateButton}>
                        <Icon name='star' color='#FFF' size={20}/>
                        <Text style={style.favorateText}>Favorate</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <SaveLocation isVisible={saveScreen}
                    onSave={onSaveLocation}
                    onCancel={() => setSaveScreen(false)} />
        </View>
    )
}

const style = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: commonStyles.colors.backgroundColor
    },
    options: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWeatherValues: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20
    },
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
    content: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }, 
    favorateButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyles.colors.backgroundColorGray,
        borderRadius: 20,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        marginBottom: 40
    }, 
    favorateText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 25,
        marginLeft: 10
    }
})