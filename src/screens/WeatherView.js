import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'

export default props => {
    return (
        <View style={style.conteiner}>
            <View style={style.weatherView}>
                <View style={style.options}>
                    <Icon name='chevron-left' color='#FFF' size={20}/>
                    <Icon name='ellipsis-v' color='#FFF' size={20}/>
                </View>
                <Text style={style.textWeatherValues}>Recife</Text>
                <Text style={style.textDate}>Sab 8 de Jan 2020</Text>
                <View><Text style={style.textTemp}>25°</Text></View>
                <Text style={style.textWeatherValues}>23°/29° Feels like 25°</Text>
                <Text style={style.textWeatherValues}>Fair</Text>
            </View>
            <View style={style.content}>
                <TouchableOpacity>
                    <View style={style.favorateButton}>
                        <Icon name='star' color='#FFF' size={20}/>
                        <Text style={style.favorateText}>Favorate</Text>
                    </View>
                </TouchableOpacity>
            </View>
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