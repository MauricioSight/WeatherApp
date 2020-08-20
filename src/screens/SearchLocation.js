import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import requestServerData, { getWatherWithoutCatch } from '../functions/weatherRequest'
import commonStyles from '../commonStyles'
import Map from '../components/Map'

const initialState = ''

export default props => {
    const [city, setCity] = useState(initialState)
    const [myLocation, setMyLocation] = useState({})
    const [markedLocation, setMarkedLocation] = useState({})

    async function onUpdateMarker(city, coord = false) {
        if (coord) {
            const cityName = await requestServerData(false, coord)
            setMarkedLocation(cityName)
            setCity(cityName.city)

        } else {
            if (city != '') {
                const cityCoord = await getWatherWithoutCatch(city)
                if (cityCoord) {
                    setMarkedLocation(cityCoord)
                }
            }
        }
    }

    function updateMyLocation(location) {
        setMyLocation(location.coord)
        setMarkedLocation(location)
    }

    function searchWeatherSelected() {
        if (markedLocation.city == city.trim()) {
            props.navigation.navigate('Weather', { location: { coord: markedLocation.coord } })
        } else {
            Alert.alert('Ops! Something is wrong.',  "The City you selected is not marked on the map or doesn't exist. Pleas, mark the city you want in the map.",
                [{ text: "OK" }], { cancelable: false })
        }
    }

    function searchWeatherMyLocation() {
        props.navigation.navigate('Weather', { location: { coord: myLocation } })
    }

    return (
        <View style={style.container}>
            <Map markerCoord={markedLocation.coord} updateMarker={onUpdateMarker} getMylocation={updateMyLocation} />
            <View style={style.overlay}>
                <View style={style.searchArea}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon name='chevron-left' color='#FFF' size={20}
                            style={{ marginLeft: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <TextInput placeholder='Search by City...' style={style.input}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        onChangeText={desc => { setCity(desc); onUpdateMarker(desc) }}
                        value={city} />
                </View>
                <View style={style.searchList}>
                    {city !== '' ?
                        <TouchableOpacity style={style.hairLine}
                            onPress={searchWeatherSelected}>
                            <Text style={style.listText}>{city}</Text>
                        </TouchableOpacity> : null
                    }
                    {myLocation.latitude ?
                        <TouchableOpacity onPress={searchWeatherMyLocation}>
                            <Text style={style.listText}>My Location</Text>
                        </TouchableOpacity> : null
                    }
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.backgroundColor
    },
    overlay: {
        position: 'absolute',
        width: '100%'
    },
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: commonStyles.colors.backgroundTransparent,
        marginTop: 5,
        marginBottom: 10
    },
    input: {
        width: '100%',
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 17
    },
    searchList: {
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.backgroundTransparent,
        borderRadius: 20,
        paddingHorizontal: 20
    },
    hairLine: {
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    listText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        paddingVertical: 15
    }
})