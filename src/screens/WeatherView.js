import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import weatherRequestServer from '../weatherRequest'
import WeatherDisplay from '../components/WeatherDisplay'
import commonStyles from '../commonStyles'
import Map from '../components/Map'
import SaveLocationScreen from './LocationName'
import Options from './Options'

export default props => {
    const [options, setOptions] = useState(false)
    const [saveScreen, setSaveScreen] = useState(false)
    const [weather, setWeather] = useState({})

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
        const editLocation = { id: weather.id, name }
        setOptions(false,
            props.navigation.navigate('List', { editLocation }))
    }

    function onDeleteLocation() {
        setOptions(false,
            Alert.alert(`Delete ${weather.name} location?`, 'This action will delete the location',
                [{
                    text: 'DELETE',
                    onPress: () => props.navigation.navigate('List', { deleteLocation: weather })
                },
                { text: 'Cancel' }], { cancelable: false }))
    }

    return (
        <View style={style.container}>
            {weather.city ? (
                <>
                    <Map markerCoord={{ latitude: weather.coord.latitude, longitude: weather.coord.longitude }} getMylocation={() => null} />

                    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        <View style={{ flex: 2 }}>
                            <View style={style.headerButtons}>
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
                            <View style={style.display} >
                                <WeatherDisplay weather={weather} />
                            </View>
                        </View>
                        <View style={{ flex: 3 }} />
                        {!weather.id ?
                            <View style={{ bottom: 30 }}>
                                <TouchableOpacity onPress={() => setSaveScreen(true)}>
                                    <View style={style.favoriteButton}>
                                        <Icon name='star' color='#FFF' size={20} />
                                        <Text style={style.favoriteText}>Favorite</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </View>
                </>

            ) : <ActivityIndicator size='large' color='#FFF' style={{ alignSelf: 'center' }} />}
            <SaveLocationScreen isVisible={saveScreen}
                onSave={weather.id ?
                    onEditLocation : onSaveLocation}
                onCancel={() => setSaveScreen(false)} />
            <Options isVisible={options}
                mode={weather.id ? true : false}
                onSave={onSaveLocation}
                onEdit={() => setOptions(false, setSaveScreen(true))}
                onDelete={onDeleteLocation}
                onCancel={() => setOptions(false)} />
        </View >
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.backgroundColor
    },
    headerButtons: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: commonStyles.colors.backgroundTransparent,
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: 12
    },
    display: {
        width: '100%',
        backgroundColor: commonStyles.colors.backgroundTransparent,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingBottom: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    favoriteButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        backgroundColor: commonStyles.colors.backgroundTransparent,
    },
    favoriteText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 25,
        marginLeft: 10
    },
    map: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})