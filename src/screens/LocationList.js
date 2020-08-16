import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'
import Location from '../components/Location'

const initialState = [{
    name: '',
    city: '',
    savedAt: null
}]

export default props => {
    const [locationList, setLocationList] = useState([])

    useEffect(() => {
        if (props.route.params && props.route.params.save) {   
            favoriteLocation(props.route.params.favorateLocation)
            props.route.params.save = false
        }
    })

    function favoriteLocation(location) {
        const locations = [ ...locationList ]
        locations.push(location)
        setLocationList(locations)
        console.log(locations)
    }

    return (
        <View style={style.conteiner}>
            <View style={style.header}>
                <Text style={style.headerText}>Weather App</Text>  
                <TouchableOpacity style={style.buttonSearch}
                    onPress={() => props.navigation.navigate('Search')} >
                    <Icon name='plus' color='#FFF' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                    <FlatList data={locationList}
                        keyExtractor={item => `${item.savedAt}`}
                        renderItem={({ item }) => {
                           return <Location name={item.name} savedAt={item.savedAt}/>
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