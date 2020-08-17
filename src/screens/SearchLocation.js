import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'
import weatherRequest from '../weatherRequest'

const initialState = ''

export default props => {
    const [city, setCity] = useState(initialState);

    async function searchCity() {
        const weather = await weatherRequest(city)
        if (weather.err) {
            Alert.alert(
                "Ops! Something wrong.",
                weather.err,
                [{ text: "OK" }],
                { cancelable: false }
            )
            setCity('')
        } else {
            props.navigation.navigate('Weather', { weather })
        }
    }

    return (
        <View style={style.conteiner}>
            <View style={style.searchArea}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name='chevron-left' color='#FFF' size={20}
                        style={{ marginLeft: 20, marginRight: 20 }} />
                </TouchableOpacity>
                <TextInput placeholder="Search by City..." style={style.input}
                    onChangeText={desc => setCity(desc)}
                    placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                    value={city} />
            </View>
            <View style={style.searchList}>
                {city !== '' ?
                    <TouchableOpacity style={style.hairLine}
                        onPress={searchCity}>
                        <Text style={style.listText}>{city}</Text>
                    </TouchableOpacity> : null
                }
                <TouchableOpacity onPress={searchCity}>
                    <Text style={style.listText}>My Location</Text>
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
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: commonStyles.colors.backgroundColorGray,
        marginTop: 5,
        marginBottom: 10
    },
    input: {
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