import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import { Screen, View, Text, Image, Row, Subtitle, Caption, Title, Divider, } from '@shoutem/ui';

import styles from './styles';

export default class StationDetails extends Component {
    constructor(props) {
        super(props);

        this.station = this.props.station;
    }

    render() {
        const { name, address, postalCode, fuelDetails } = this.station;

        return (
            <Screen>
                <NavigationBar
                    style={styles.navbarContainer}
                    statusBar={statusBarConfig}
                    title={titleConfig}
                    leftButton={leftButtonConfig(this.props.navigator)}
                />

                <Image
                    styleName='large-banner' 
                    style={{height: 75}}
                    source={require('../assets/images/esso.png')}
                />

                <View style={{padding: 10}}>
                    <Row>
                        <View styleName='vertical'>
                            <Title>{name}</Title>
                            <Caption>{address + ', ' + postalCode}</Caption>
                        </View>
                    </Row>

                    <Divider styleName="line" />

                    {fuelDetails.map(fd => this.renderFuelDetail(fd))}
                </View>
            </Screen>
        );
    }

    renderFuelDetail(fuelDetail) {
        const { deltaIcon, color } = (fuelDetail.deltaAverage > 0 ? {deltaIcon: 'ios-arrow-up', color: 'red'} : {deltaIcon: 'ios-arrow-down', color: 'green'});
        const { type, price } = fuelDetail;

        const details = `${type}, ${price}`;

        return (
            <Row key={fuelDetail.type} styleName='small'>
                <Icon name={deltaIcon} color={color} size={20} />
                <Text style={{marginLeft: 5}}>{details}</Text>
            </Row>
        );
    }
}

const statusBarConfig = {
    hidden: true,
    hideAnimation: 'fade'
};

const titleConfig = {
    title: 'Station Details',
    style: {
        color: 'white'
    }
};

function leftButtonConfig(navigator) {
    return (
        <TouchableOpacity style={styles.navbarButton} onPress={() => navigator.pop()}>
            <Icon name='ios-arrow-back' color='white' size={25} />
        </TouchableOpacity>
    );
};