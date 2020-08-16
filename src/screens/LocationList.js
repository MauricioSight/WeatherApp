import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'
import Location from '../components/Location'

export default props => {
    const [locations, setLocations] = useState([{
        id: 8,
        name: 'Home',
        city: 'Recife',
        saved: false,
        savedAt: new Date(),
        temp: null,
        feelsLike: null,
        tempMin: null,
        tempMax: null,
        desciption: null
    },{
        id: 9,
        name: 'Father',
        city: 'Olinda',
        saved: false,
        savedAt: new Date(),
        temp: null,
        feelsLike: null,
        tempMin: null,
        tempMax: null,
        desciption: null
    }])

    const render = [...locations]
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
                    <FlatList data={render}
                        keyExtractor={item => `${item.id}`}
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