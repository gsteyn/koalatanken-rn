import React, { Component } from 'react';

import { Navigator, View, TouchableOpacity } from 'react-native';
import { Screen, Spinner } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';
import { stringify as queryString } from 'query-string';
import NavigationBar from 'react-native-navbar';

import * as Routes from './routes';
import Settings from './Settings';
import StationsMap from './StationsMap';
import styles from './styles';

const API_DEBOUNCE_TIME = 2000;
const KOALA_TANKEN_ENDPOINT = 'https://l1ln509yc7.execute-api.us-west-2.amazonaws.com/test/api/fuel/by-location';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mapRegion: null,
            gpsAccuracy: null,
            stations: null,
            lastCall: null
        };

        this.watchId = null;
    }

    componentWillMount() {
        this.watchId = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            };

            this.onRegionChange(region, position.coords.accuracy);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onRegionChange(region, gpsAccuracy) {
        this.fetchStations(region);

        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }

    fetchStations(region) {
        if (!this.shouldFetchStations()) return;
        
        const stations = require('./stations.json');
        this.setState({
            stations: stations,
            lastCall: new Date()
        });

        // const query = KOALA_TANKEN_ENDPOINT + '?' + this.stationsQuery(region);

        // fetch(query)
        //     .then(fetch.throwErrors)
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log('' + json);
        //         console.log('json response index 0 > ' + json[0]);
        //         this.setState({
        //             stations: json,
        //             lastCall: new Date()
        //         });
        //     })
        //     .catch(err => console.log(err));
    }

    shouldFetchStations() {
        return this.state.lastCall === null
            || new Date() - this.state.lastCall > API_DEBOUNCE_TIME;
    }

    stationsQuery({latitude, longitude}) {
        return queryString({
            location: latitude + ',' + longitude,
            distance: '1'
        });
    }

    render() {
        const { mapRegion } = this.state;

        if (mapRegion) {
            return (
                <Navigator
                    initialRoute={Routes.MAIN_SCENE}
                    renderScene={this.renderScene.bind(this)}
                />
            );
        } else {
            return (
                <Screen style={styles.centered}>
                    <Spinner styleName="large" />
                </Screen>
            );
        }
    }

    renderScene(route, navigator) {
        console.log('App > renderScene > route > ', route);
        if (route.id === Routes.MAIN_SCENE.id) {
            return (
                <Screen>
                    <View style={{height: 50}}>
                        <NavigationBar
                            style={{backgroundColor: '#2980b9'}}
                            statusBar={statusBarConfig}
                            title={titleConfig}
                            rightButton={rightButtonConfig(navigator)}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <StationsMap {...this.state} onRegionChange={this.onRegionChange.bind(this)} />
                    </View>
                </Screen>
            );
        } else if (route.id === Routes.SETTINGS_SCENE.id) {
            return (
                <Settings 
                    navigator={navigator}
                />
            );
        }
    }

}

const statusBarConfig = {
    hidden: true,
    hideAnimation: 'fade'
};

const titleConfig = {
    title: 'Koala Tanken',
    style: {
        color: 'white'
    }
};

function rightButtonConfig(navigator) {
    return (
        <TouchableOpacity style={styles.navbarButton} onPress={() => navigator.push(Routes.SETTINGS_SCENE)}>
            <Icon name='ios-settings' color='white' size={25} />
        </TouchableOpacity>
    );
};

export default App;