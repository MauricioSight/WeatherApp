import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import weatherRequestServer from '../weatherRequest'
import WeatherDisplay from '../components/WeatherDisplay'
import commonStyles from '../commonStyles'
import SaveLocation from './Save'
import Options from './Options'

const initialState = {
    city: '',
    description: '',
    fellsLike: '',
    temp: '',
    tempMax: '',
    tempMin: ''
}

export default props => {

    const [options, setOptions] = useState(false)
    const [saveScreen, setSaveScreen] = useState(false)
    const [weather, setWeather] = useState(initialState)

    useEffect(() => {
        weatherRequest(props.route.params.location)
    }, [])

    async function weatherRequest(location) {
        const data = await weatherRequestServer(false, location.coord)
        if (data) {
            const weatherNew = { ...location, ...data }
            setWeather(weatherNew)
        } else {
            props.navigate.goBack()
        }
    }

    function onSaveLocation(name) {
        if (name == '') {
            setOptions(false, setSaveScreen(true))

        } else {
            const saveLocation = {
                id: new Date().getTime(),
                name: name,
                savedAt: new Date().getTime(),
                ...weather
            }
            setSaveScreen(false, props.navigation.navigate('List', { saveLocation }))
        }
    }

    function onEditLocation(name) {
        const editWaether = { id: weather.id, name }
        setOptions(false, 
            props.navigation.navigate('List', { editLocation: editWaether }))
    }

    function onDeleteLocation() {
        setOptions(false,
            Alert.alert(`Delete ${weather.name} location ?`, 'This action will delete the location',
                [{ text: "DELETE", 
                    onPress: () => props.navigation.navigate('List', { deleteLocation: weather }) 
                },
                { text: "Calcel" }], { cancelable: false }))
    }

    return (
        <View style={style.conteiner}>
            {weather.city ? (
                <>
                    <View style={style.weatherView}>
                        <View style={style.options}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                                <View style={style.icons}>
                                    <Icon name='chevron-left' color='#FFF' size={20} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setOptions(true)}>
                                <View style={style.icons}>
                                    <Icon name='ellipsis-v' color='#FFF' size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <WeatherDisplay weather={weather}/>
                    </View>
                    <View style={style.content}>
                        {!weather.id ? (
                            <TouchableOpacity onPress={() => setSaveScreen(true)}>
                                <View style={style.favorateButton}>
                                    <Icon name='star' color='#FFF' size={20} />
                                    <Text style={style.favorateText}>Favorate</Text>
                                </View>
                            </TouchableOpacity> ) : null
                        }
                    </View>
                    <SaveLocation isVisible={saveScreen}
                        onSave={weather.id ?
                            onEditLocation : onSaveLocation}
                        onCancel={() => setSaveScreen(false)} />
                    <Options isVisible={options}
                        saved={weather.id ? true : false}
                        onSave={onSaveLocation}
                        onEdit={() => setOptions(false, setSaveScreen(true))}
                        onDelete={onDeleteLocation}
                        onCancel={() => setOptions(false)} />
                </>
            ) : <ActivityIndicator size='large' color='#FFF' style={{alignSelf:'center'}}/>}
        </View >
    )
}

const style = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.backgroundColor
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: 12
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