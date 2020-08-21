import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import weatherRequestServer from '../functions/weatherRequest'
import WeatherDisplay from '../components/WeatherDisplay'
import commonStyles from '../commonStyles'
import Map from '../components/Map'
import SaveLocationScreen from './LocationName'
import Options from './Options'

/**
 * Componente Tela expôe os parâmetros do clima
 */
export default props => {
    const [options, setOptions] = useState(false)        // Estado do modal de opções
    const [saveScreen, setSaveScreen] = useState(false)  // Estado do modal de coleta do nome pelo usuário
    const [weather, setWeather] = useState({})           // Estado com o objeto item, parâmetros do clima

    /**
     * Componente formado recebe um item para expor as variáveis de clima
     */
    useEffect(() => {
        weatherRequest(props.route.params.location)
    }, [])

    /**
     * Atualiza o item recebido com as novas informações do clima. 
     * @param {Object} location item
     */
    async function weatherRequest(location) {
        const data = await weatherRequestServer(false, location.coord)
        if (data) {
            const weatherNew = { ...location, ...data }
            setWeather(weatherNew)
        } else {
            props.navigate.goBack()
        }
    }

    /**
     * Salva o item em questão, caso já não esteja salvo, e volta a Tela de lista.
     * @param {String} name nome
     */
    function onSaveLocation(name) {
        if (name == '') {
            setOptions(false, setSaveScreen(true))

        } else {
            const saveLocation = {
                id: new Date().getTime(),
                name: name,
                savedAt: new Date().getTime(),
                ...weather
            }
            setSaveScreen(false, props.navigation.navigate('List', { saveLocation }))
        }
    }

    /**
     * Edita um item em questão, caso já esteja salvo, e volta a Tela de lista.
     * @param {String} name novo nome
     */
    function onEditLocation(name) {
        const editLocation = { id: weather.id, name }
        setOptions(false,
            props.navigation.navigate('List', { editLocation }))
    }

    /**
     * Deleta o item em questão, caso já esteja salvo, e volta a Tela de lista.
     */
    function onDeleteLocation() {
        setOptions(false,
            Alert.alert(`Delete ${weather.name} location?`, 'This action will delete the location',
                [{
                    text: 'DELETE',
                    onPress: () => props.navigation.navigate('List', { deleteLocation: weather })
                },
                { text: 'Cancel' }], { cancelable: false }))
    }

    return (
        <View style={style.container}>
            {/* Mosta as informações so quando a requisição ao servidor termina */}
            {weather.city ? (
                <>
                    <Map markerCoord={{ latitude: weather.coord.latitude, longitude: weather.coord.longitude }} getMylocation={() => null} />

                    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        <View style={{ flex: 2 }}>
                            <View style={style.headerButtons}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                                    <View style={style.icons}>
                                        <Icon name='chevron-left' color='#FFF' size={20} />
                                    </View>
                                </TouchableOpacity>

                                {/* Exibe o nome salvo pelo usuário caso este exista, ou seja, item já salvo antes */}
                                {weather.name ? <Text style={style.locationName}>{weather.name}</Text> : null}

                                <TouchableOpacity onPress={() => setOptions(true)}>
                                    <View style={[style.icons, {alignSelf: 'flex-end'}]}>
                                        <Icon name='ellipsis-v' color='#FFF' size={20} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={style.display} >
                                <WeatherDisplay weather={weather} />
                            </View>
                        </View>

                        <View style={{ flex: 3 }} />

                        {/* Caso o item não esteja salvo, mostra um botão de favoritar */}
                        {!weather.id ?
                            <View style={{ bottom: 30 }}>
                                <TouchableOpacity onPress={() => setSaveScreen(true)}>
                                    <View style={style.favoriteButton}>
                                        <Icon name='star' color='#FFF' size={20} />
                                        <Text style={style.favoriteText}>Favorite</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </View>
                </>

            ) : <ActivityIndicator size='large' color='#FFF' style={{ alignSelf: 'center' }} />}
            {/* Se item salvo o nome retornado pelo modal parte para função editar, caso não a função salvar */}
            <SaveLocationScreen isVisible={saveScreen}
                onSave={weather.id ?
                    onEditLocation : onSaveLocation}
                onCancel={() => setSaveScreen(false)} />      

            {/* Se item salvo Modal Opções mostra Editar e Deletar, caso não Favoritar */}
            <Options isVisible={options}
                mode={weather.id ? true : false}
                onSave={onSaveLocation}
                onEdit={() => setOptions(false, setSaveScreen(true))}
                onDelete={onDeleteLocation}
                onCancel={() => setOptions(false)} />
        </View >
    )
}

/**
 * Estilos dos compoentes inserido nesse componente
 */
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.backgroundColor
    },
    headerButtons: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: commonStyles.colors.backgroundTransparent,
    },
    locationName: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 17
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: 12
    },
    display: {
        width: '100%',
        backgroundColor: commonStyles.colors.backgroundTransparent,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingBottom: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    favoriteButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        backgroundColor: commonStyles.colors.backgroundTransparent,
    },
    favoriteText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 25,
        marginLeft: 10
    },
    map: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})