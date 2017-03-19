import React, { Component } from 'react';

import MapView from 'react-native-maps';
import { Card, Image, View, Subtitle, Text, Caption } from '@shoutem/ui';

export default class StationMarker extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { name, stationGeoJson, address, postalCode } = this.props.station;
        const coordinates = stationGeoJson.coordinates;

        return (
            <MapView.Marker coordinate={{
                latitude: coordinates[0],
                longitude: coordinates[1]
            }}>

                <MapView.Callout onPress={() => alert('herro!')}>
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