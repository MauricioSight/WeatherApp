import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import moment from 'moment'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome5'

import commonStyles from '../commonStyles'
import GetNameView from '../screens/LocationName'

/**
 * Constitui o item da lista da Tela de Lista
 */
export default props => {
    const [getName, setGetName] = useState(false)  // Estado do modal de coleta do nome pelo usuário caso função editar

    /**
     * Deleta a si mesmo
     */
    function onSelfDelete() {
        Alert.alert(`Delete ${props.name} location?`, 'This action will delete the location',
            [{
                text: 'DELETE',
                onPress: () => props.selfDelete(props)
            },
            { text: 'Cancel' }], { cancelable: false })
    }

    /**
     * Edita o seu próprio nome
     * @param {String} name novo nome
     */
    function onSelfEdit(name) {
        if (name) {
            setGetName(false)
            props.selfEdit({id: props.id, name: name})
        } else {
            setGetName(true)
        }
    }

    /**
     * Componente monstado quando o usuário arrasta o item para a esquerda
     * @returns {JSX} O componente
     */
    function getRightContent() {
        return (
            <View style={style.rightButtons}>
                <GetNameView isVisible={getName}
                    onSave={onSelfEdit}
                    onCancel={() => setGetName(false)} />
                <TouchableOpacity onPress={() => setGetName(true)}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Icon name='pen' color='#FFF' size={20}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSelfDelete}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Icon name='trash' color='#F00' size={20}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent}>
            <View style={style.conteiner}>
                <TouchableOpacity onPress={() => props.openWeatherView(props)}>
                    <Text style={style.locationName}>{props.name}</Text>
                    <Text style={style.saveDate}>
                        {props.city} - {moment(props.savedAt).format('ddd, MMM D')}
                    </Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    )
}

/**
 * Estilos dos compoentes inserido nesse componente.
 */
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
    },
    rightButtons: {
        backgroundColor: '#212121',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },

})