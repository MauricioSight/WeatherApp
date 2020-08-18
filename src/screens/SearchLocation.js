import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Geolocation from '@react-native-community/geolocation'

import requestServerData, { getWatherWithoutCatch } from '../weatherRequest'
import commonStyles from '../commonStyles'
import Map from '../components/Map'

const initialState = ''

export default props => {
    const [city, setCity] = useState(initialState)
    const [myLocation, setMyLocation] = useState({})
    const [markedLocation, setMarkedLocation] = useState({})

    useEffect(() => {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                setMarkedLocation({ coord: { latitude, longitude } })
                setMyLocation({ latitude, longitude })
            },
            () => { },
            { timeout: 2000, enableHighAccuracy: true, maximumAge: 1000 }
        )
    }, [])

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

    function searchWeatherSelected() {
        props.navigation.navigate('Weather', { location: { coord: markedLocation.coord } })
    }

    function searchWeatherMyLocation() {
        props.navigation.navigate('Weather', { location: { coord: myLocation } })
    }

    return (
        <View style={style.conteiner}>
            {markedLocation.coord ?
                <Map markerCoord={markedLocation.coord} updateMarker={onUpdateMarker} />
                : null
            }
            <View style={style.overlay}>
                <View style={style.searchArea}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon name='chevron-left' color='#FFF' size={20}
                            style={{ marginLeft: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <TextInput placeholder="Search by City..." style={style.input}
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
                    {myLocation !== {} ?
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
    conteiner: {
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
        backgroundColor: commonStyles.colors.backgroundColorGray,
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
        backgroundColor: commonStyles.colors.backgroundColorGray,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    hairLine: {
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    listText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15
    }
})