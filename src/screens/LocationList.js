import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';

import commonStyles from '../commonStyles'
import Location from '../components/Location'

const initialState = [{
    name: '',
    city: '',
    savedAt: null
}]

export default props => {
    const [locationList, setLocationList] = useState([])
    const [localStorege, setLocalStorege] = useState(true)

    useEffect(() => {
        if (props.route.params && props.route.params.saveLocation) {
            saveLocation(props.route.params.saveLocation)
            props.route.params.saveLocation = null
        }
        if (props.route.params && props.route.params.editLocation) {
            editLocation(props.route.params.editLocation)
            props.route.params.editLocation = null
        }
        if (props.route.params && props.route.params.deleteLocation) {
            deleteLocation(props.route.params.deleteLocation)
            props.route.params.deleteLocation = null
        }

    })

    useEffect(() => {
        getLocalSave()
    }, [localStorege])

    async function getLocalSave() {
        const locationString = await AsyncStorage.getItem('LocationList')
        const locations = JSON.parse(locationString)
        setLocationList(locations)
        console.log(locations)
        setLocalStorege(false)
    }

    async function saveLocation(location) {
        const locations = [...locationList]
        locations.push(location)
        await AsyncStorage.setItem('LocationList', JSON.stringify(locations))
        setLocationList(locations)
        setLocalStorege(true)
    }

    async function editLocation({id, name}) {
        let locations = [...locationList]
        locations = locations.map(location => {
            if (location.id == id) {
                location.name = name
                return location
            }
            return location
        })
        await AsyncStorage.setItem('LocationList', JSON.stringify(locationList))
        setLocationList(locations)
        setLocalStorege(true)
    }

    async function deleteLocation({id}) {
        let locations = [...locationList]
        locations = locations.filter(location => location.id != id)
        await AsyncStorage.setItem('LocationList', JSON.stringify(locations))
        setLocationList(locations)
        setLocalStorege(true)
    }

    function openWeatherView(item) {
        let location = { ...item }
        location.weatherView = null
        props.navigation.navigate('Weather', { location })
    }

    return (
        <View style={style.conteiner}>
            <View style={style.header}>
                <Text style={style.headerText}>Weather App</Text>
                <TouchableOpacity style={style.buttonSearch}
                    onPress={() => props.navigation.navigate('Search')} >
                    <View style={{ height: 25, width: 25, borderRadius: 12 }}>
                        <Icon name='plus' color='#FFF' size={20} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                <FlatList data={locationList}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => {
                        return <Location {...item} weatherView={openWeatherView} />
                    }} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: commonStyles.colors.backgroundColor
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 30,
    },
    content: {
        flex: 3,
    },
    buttonSearch: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        bottom: 10,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})