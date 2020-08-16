import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {
    return (
        <View style={style.conteiner}>
            <Text style={style.name}>{props.location}</Text>
            <Text style={style.saveDate}>
                {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
            </Text>
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