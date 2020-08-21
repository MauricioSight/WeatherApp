import React, { useState, useEffect } from 'react'
import { Alert, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

import MapStyle from './MapStyle'

/**
 * Componente de redenrização do mapa
 */
export default props => {
    const [myLocation, setMyLocation] = useState()                  // Localização do Usuário
    const [locationPermission, setLocationPermission] = useState()  // Validação de permissão para pegar a localização atual 

    /**
     * Quando definida a localização do usuário é exportada pro componente pai
     */
    useEffect(() => {
        myLocation && props.getMylocation(myLocation)
    }, [myLocation])

    /**
     * Coletar localização atual
     */
    useEffect(() => {
        verifyLocationPermission()
        if (locationPermission) {
            Geolocation.getCurrentPosition(
                async ({ coords: { latitude, longitude } }) => {
                    setMyLocation({ coord: { latitude, longitude } })
                },
                err => Alert.alert('Ops! Something went wrong.', `${err.message} Pleas, restart the app`,
                    [{ text: 'OK' }], { cancelable: false })
            )
        }
    }, [locationPermission])

    /**
     * Verificação de premissão para coletar localização atual
     */
    async function verifyLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setLocationPermission(true)

            } else {
                setLocationPermission(false)
            }
        } catch (err) {
            Alert.alert('Ops! Something went wrong.', `${err}`,
                [{ text: "OK" }], { cancelable: false })
        }
    }

    // Regiao inicial do mapa
    const initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 20,
        longitudeDelta: 20
    }

    // Dimensão do mapa
    const delta = {
        latitudeDelta: 0.08,
        longitudeDelta: 0.08
    }

    // Latitude recebida do componente pai caso definida ou inicial se não
    const latitude = props.markerCoord && props.markerCoord.latitude || initialRegion.latitude    
    const longitude = props.markerCoord && props.markerCoord.longitude || initialRegion.longitude 
    // ^ Longitude recebida do componente pai caso definida ou inicial se não  ^ 

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{ ...initialRegion }}
            region={{ latitude, longitude, ...delta }}
            scrollEnabled={true}
            zoomEnabled={true}
            showsUserLocation
            loadingEnabled
            showsMyLocationButton={false}
            customMapStyle={MapStyle}
            onPress={e => props.updateMarker ? props.updateMarker(false, { ...e.nativeEvent.coordinate }) : null}>
            {/* ^ Caso o componente pai permita que o usuário possa marcar o mapa em outra região ^ */}    

            {/* Caso o componente recebe as cordenas do marcador do componente pai o mapa é marcado */}
            {props.markerCoord ?
                <Marker
                    coordinate={{
                        latitude: props.markerCoord.latitude,
                        longitude: props.markerCoord.longitude
                    }} 
                /> : null
            }
        </MapView>
    )
}
