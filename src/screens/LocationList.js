import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';

import commonStyles from '../commonStyles'
import Location from '../components/Location'

export default props => {
    const [locationList, setLocationList] = useState([])

    useEffect(() => {
        getLocalSave()
    }, [])

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

    async function getLocalSave() {
        const locationString = await AsyncStorage.getItem('LocationList')
        const locations = JSON.parse(locationString)
        setLocationList(locations)
    }

    function saveLocation(location) {
        const cloneList = [...locationList]
        cloneList.push(location)
        setLocationList(cloneList)
        AsyncStorage.setItem('LocationList', JSON.stringify(cloneList))
    }

    function editLocation({ id, name }) {
        const cloneList = [...locationList]
        const newList = cloneList.map(location => {
            if (location.id == id) {
                location.name = name
                return location
            }
            return location
        })
        setLocationList(newList)
        AsyncStorage.setItem('LocationList', JSON.stringify(newList))
    }

    function deleteLocation({ id }) {
        const cloneList = [...locationList]
        const newList = cloneList.filter(location => location.id != id)
        setLocationList(newList)
        AsyncStorage.setItem('LocationList', JSON.stringify(newList))
    }

    function onWeatherView(item) {
        let location = { ...item }
        location.openWeatherView = null
        
        console.log(location)
        //props.navigation.navigate('Weather', { location })
    }

    return (
        <View style={style.conteiner}>
            <View style={style.header}>
                <Text style={style.headerText}>Weather App</Text>
                <TouchableOpacity style={style.buttonSearch}
                    onPress={() => props.navigation.navigate('Search')} >
                    <View>
                        <Icon name='plus' color='#FFF' size={20} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.list}>
                <FlatList data={locationList}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => {
                        return <Location {...item} openWeatherView={onWeatherView} />
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
    list: {
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