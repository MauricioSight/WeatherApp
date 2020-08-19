import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'

import MapStyle from './MapStyle'

export default props => {

    const delta = {
        latitudeDelta: 0.08,
        longitudeDelta: 0.08
    }

    return (
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: props.markerCoord.latitude,
                longitude: props.markerCoord.longitude,
                ...delta
            }}
            scrollEnabled={true}
            zoomEnabled={true}
            showsUserLocation
            loadingEnabled
            showsMyLocationButton={false}
            customMapStyle={MapStyle}
            onPress={e => props.updateMarker ? props.updateMarker(false, { ...e.nativeEvent.coordinate }) : null}>
            <Marker
                coordinate={{
                    latitude: props.markerCoord.latitude,
                    longitude: props.markerCoord.longitude
                }}
            />
        </MapView>
    )
}
