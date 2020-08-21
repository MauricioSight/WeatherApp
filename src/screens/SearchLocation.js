import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import requestServerData, { getWatherWithoutCatch } from '../functions/weatherRequest'
import commonStyles from '../commonStyles'
import Map from '../components/Map'

const initialState = ''  // Estado inicial do nome da cidade

/**
 * Componente Tela exibe um mapa a qual se pode marcar uma região de preferência e uma barra de pesquisa 
 * com uma lista podendo o usuário pesquisar uma cidade ou escolher sua localização para exibição do clima.
 */
export default props => {
    const [city, setCity] = useState(initialState)           // Nome da cidade inserida pelo usuário
    const [myLocation, setMyLocation] = useState({})         // Localização do usuário
    const [markedLocation, setMarkedLocation] = useState({}) // Localização esolhida pelo usuário

    /**
     * Muda a localização escolhida pelo usuário.
     * Recebe uma cidade ou as codernadas de um local, Caso recebe as cordenadas
     * é requisitado o nome da cidade pelo servidor da OpenWeatherApi e mostra o nome da
     * mesma na lista de pesquisa. Caso receba a cidade é requisita as cordenadas do mesmo.
     * @param {String} city Nome da cidade
     * @param {Object} coord As cordenadas
     */
    async function onUpdateMarker(city, coord = false) {
        if (coord) {
            const cityName = await requestServerData(false, coord)
            setMarkedLocation(cityName)
            setCity(cityName.city)

        } else {
            if (city != '') {
                const cityCoord = await getWatherWithoutCatch(city)
                if (cityCoord) {
                    setMarkedLocation(cityCoord)
                }
            }
        }
    }

    /**
     * Define a localização atual do usuário
     * @param {Object} location Localização
     */
    function updateMyLocation(location) {
        setMyLocation(location.coord)
        setMarkedLocation(location)
    }

    /**
     * Parte para próxima tela, de exibição dos parâmetros do clima, caso o usuário escolha a 
     * localização pesquisada
     */
    function searchWeatherSelected() {
        if (markedLocation.city.toLowerCase() == city.trim().toLowerCase()) {
            props.navigation.navigate('Weather', { location: { coord: markedLocation.coord } })
        } else {
            Alert.alert('Ops! Something is wrong.',  "The City you selected is not marked on the map or doesn't exist. Pleas, mark the city you want in the map.",
                [{ text: "OK" }], { cancelable: false })
        }
    }

    /**
     * Parte para próxima tela, de exibição dos parâmetros do clima, caso o usuário escolha a 
     * sua localização
     */
    function searchWeatherMyLocation() {
        props.navigation.navigate('Weather', { location: { coord: myLocation } })
    }

    return (
        <View style={style.container}>
            <Map markerCoord={markedLocation.coord} updateMarker={onUpdateMarker} getMylocation={updateMyLocation} />
            <View style={style.overlay}>
                <View style={style.searchArea}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon name='chevron-left' color='#FFF' size={20}
                            style={{ marginLeft: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                    <TextInput placeholder='Search by City...' style={style.input}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        onChangeText={desc => { setCity(desc); onUpdateMarker(desc) }}
                        value={city} />
                </View>
                <View style={style.searchList}>
                    {/* Adiciona a lista de pesquisa apenas quando a caixa de pesquisa possui algo */}
                    {city !== '' ?
                        <TouchableOpacity style={style.hairLine}
                            onPress={searchWeatherSelected}>
                            <Text style={style.listText}>{city}</Text>
                        </TouchableOpacity> : null
                    }
                    {/* Adiciona a lista de pesquisa apenas quando a localização do usuário está definida */}
                    {myLocation.latitude ?
                        <TouchableOpacity onPress={searchWeatherMyLocation}>
                            <Text style={style.listText}>My Location</Text>
                        </TouchableOpacity> : null
                    }
                </View>
            </View>
        </View>
    )
}

/**
 * Estilos dos compoentes inserido nesse componente
 */
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.backgroundColor
    },
    overlay: {
        position: 'absolute',
        width: '100%'
    },
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: commonStyles.colors.backgroundTransparent,
        marginTop: 5,
        marginBottom: 10
    },
    input: {
        width: '100%',
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 17
    },
    searchList: {
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.backgroundTransparent,
        borderRadius: 20,
        paddingHorizontal: 20
    },
    hairLine: {
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    listText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        paddingVertical: 15
    }
})