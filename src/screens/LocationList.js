import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'

import commonStyles from '../commonStyles'
import Location from '../components/Location'

/**
 * Tela incial do aplicativo. Mostra uma lista com as localizações salvas e possui um
 * botão a qual parte para tela de pesquisa de localização.
 */
export default props => {
    /**
     * Estado contendo a lista de itens salvos
     */
    const [locationList, setLocationList] = useState([])

    /**
     * Quando aplicativo iniciado coleta lista salva no dispositivo.
     */
    useEffect(() => {
        getLocalSave()
    }, [])

    /**
     * Atua na função requisitada por outros componentes.
     * Bem como, salvar, editar e deletar.
     */
    useEffect(() => {
        if (props.route.params && props.route.params.saveLocation) {
            saveLocation(props.route.params.saveLocation)
            props.route.params.saveLocation = null
        }
        if (props.route.params && props.route.params.editLocation) {
            editLocation(props.route.params.editLocation)
            props.route.params.editLocation = null
        }
        if (props.route.params && props.route.params.deleteLocation) {
            deleteLocation(props.route.params.deleteLocation)
            props.route.params.deleteLocation = null
        }
    })

    /**
     * Coleta lista salva no dispositivo
     */
    async function getLocalSave() {
        const locationString = await AsyncStorage.getItem('LocationList')
        const locations = JSON.parse(locationString)
        setLocationList(locations)
    }

    /**
     * Sala uma nova localização a lista
     * @param {Object} location localização a ser salva
     */
    function saveLocation(location) {
        const cloneList = locationList ? [...locationList] : []
        cloneList.push(location)
        sortBySavedAt(cloneList)
        setLocationList(cloneList)
        AsyncStorage.setItem('LocationList', JSON.stringify(cloneList))
    }

    /**
     * Edita um item da lista com um novo nome
     * @param {Object} obj Objeto desconstruido com Id e novo nome
     */
    function editLocation({ id, name }) {
        const cloneList = [...locationList]
        const newList = cloneList.map(location => {
            if (location.id == id) {
                location.name = name
                return location
            }
            return location
        })
        setLocationList(newList)
        AsyncStorage.setItem('LocationList', JSON.stringify(newList))
    }

    /**
     * Deleta um item da lista
     * @param {Object} obj Objeto desconstruido possuindo o Id do item
     */
    function deleteLocation({ id }) {
        const cloneList = [...locationList]
        const newList = cloneList.filter(location => location.id != id)
        setLocationList(newList)
        AsyncStorage.setItem('LocationList', JSON.stringify(newList))
    }

    /**
     * Navega para tela onde mostra os parâmetros do climas dado a região.
     * @param {Object} item Item da lista contendo a região
     */
    function onWeatherView(item) {
        let location = { ...item }
        location.selfDelete = null
        location.selfEdit = null
        location.openWeatherView = null

        props.navigation.navigate('Weather', { location })
    }

    /**
     * Ordena a lista de acordo com a data de salvamento em ordem decrescento. 
     * Itens adicionados mais cedo vem primeiro
     * @param {Array} list Lista
     */
    function sortBySavedAt(list) {
        list.sort((a, b) => {
            if (a.savedAt > b.savedAt) return -1
            if (a.savedAt < b.savedAt) return 1
            return 0
        })
    }

    return (
        <View style={style.conteiner}>
            <View style={style.header}>
                <Text style={style.headerText}>Weather App</Text>
                <TouchableOpacity style={style.buttonSearch}
                    onPress={() => props.navigation.navigate('Search')} >
                    <View>
                        <Icon name='plus' color='#FFF' size={20} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.list}>
                <FlatList data={locationList}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => {
                        return <Location {...item} openWeatherView={onWeatherView}
                            selfDelete={deleteLocation} selfEdit={editLocation} />
                    }} />
            </View>
        </View>
    )
}

/**
 * Estilos dos compoentes inserido nesse componente
 */
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
    list: {
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