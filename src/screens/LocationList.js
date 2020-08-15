import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'
import Location from '../components/Location'

export default () => {
    return (
        <View style={style.conteiner}>
            <View style={style.header}>
                <Text style={style.headerText}>Weather App</Text>  
                <TouchableOpacity style={style.buttonSearch}>
                    <Icon name='plus' color='#FFF' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                <Location location='Recife' saveAt= {new Date()}/>
                <Location location='Olinda' saveAt= {new Date()}/>
                <Location location='Rio de Janeiro' saveAt= {new Date()}/>
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
        alignItems: 'center'
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