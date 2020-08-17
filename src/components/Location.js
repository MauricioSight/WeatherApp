import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import moment from 'moment'

import commonStyles from '../commonStyles'

export default props => {
    return (
        <View style={style.conteiner}>
            <TouchableOpacity onPress={() => props.weatherView(props)}>
                <Text style={style.locationName}>{props.name}</Text>
                <Text style={style.saveDate}>
                    {props.city} - {moment(props.savedAt).format('ddd, D [de] MMMM [de] YYYY')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    conteiner: {
        width: '100%',
        height: 60,
        backgroundColor: commonStyles.colors.backgroundColorGray,
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 10
    },
    locationName: {
        color: commonStyles.colors.mainText,
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 30
    },
    saveDate: {
        color: commonStyles.colors.subText,
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        marginLeft: 30
    }
})