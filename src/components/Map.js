import React, { useState, useEffect } from 'react'
import { Alert, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

import MapStyle from './MapStyle'

export default props => {
    const [myLocation, setMyLocation] = useState()
    const [locationPermission, setLocationPermission] = useState()

    useEffect(() => {
        myLocation && props.getMylocation(myLocation)
    }, [myLocation])

    useEffect(() => {
        verifyLocationPermission()
        if (locationPermission) {
            Geolocation.getCurrentPosition(
                async ({ coords: { latitude, longitude } }) => {
                    setMyLocation({ coord: { latitude, longitude } })
                },
                err => Alert.alert('Ops! Something went wrong.', `${err.message}`,
                    [{ text: 'OK' }], { cancelable: false })
            )
        }
    }, [locationPermission])

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

    const initialState = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 20,
        longitudeDelta: 20
    }

    const delta = {
        latitudeDelta: 0.08,
        longitudeDelta: 0.08
    }

    const latitude = props.markerCoord && props.markerCoord.latitude || initialState.latitude
    const longitude = props.markerCoord && props.markerCoord.longitude || initialState.longitude

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{ ...initialState }}
            region={{ latitude, longitude, ...delta }}
            scrollEnabled={true}
            zoomEnabled={true}
            showsUserLocation
            loadingEnabled
            showsMyLocationButton={false}
            customMapStyle={MapStyle}
            onPress={e => props.updateMarker ? props.updateMarker(false, { ...e.nativeEvent.coordinate }) : null}>
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
