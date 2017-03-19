import React, { Component } from 'react';

import MapView from 'react-native-maps';
import { Card, Image, View, Subtitle, Text, Caption } from '@shoutem/ui';

import * as Routes from './routes';

export default class StationMarker extends Component {
    constructor(props) {
        super(props)

        this.navigator = this.props.navigator;
        this.station = this.props.station;
    }

    gotoStationDetails() {
        Routes.STATION_DETAILS.station = this.station;
        this.navigator.push(Routes.STATION_DETAILS);
    }

    render() {
        const { name, stationGeoJson, address, postalCode } = this.station;
        const coordinates = stationGeoJson.coordinates;

        return (
            <MapView.Marker coordinate={{
                latitude: coordinates[0],
                longitude: coordinates[1]
            }}>

                <MapView.Callout onPress={() => this.gotoStationDetails()}>
                    <Card>
                        <Image 
                            styleName='medium-wide' 
                            source={require('../assets/images/esso.png')} />
                        <View styleName='content'>
                            <Subtitle>{name}</Subtitle>
                            <Caption>{address + ', ' + postalCode}</Caption>
                        </View>
                    </Card>
                </MapView.Callout>

            </MapView.Marker>
        );
    }
}