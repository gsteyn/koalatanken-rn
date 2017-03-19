import React, { Component } from 'react';

import MapView from 'react-native-maps'
import { Subtitle, Title } from '@shoutem/ui';

import StationMarker from './StationMarker';
import styles from './styles';

const StationsMap = ({ mapRegion, gpsAccuracy, stations, onRegionChange, navigator }) => (
    <MapView.Animated 
            region={mapRegion}
            style={styles.fullscreen}
            showsMyLocationButton={true}
            showsUserLocation={true}
            onRegionChange={onRegionChange}>

        {stations && stations.map(station => <StationMarker navigator={navigator} station={station} key={station.stationHashKey} />)}

    </MapView.Animated>
);

export default StationsMap;