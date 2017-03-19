import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import { Screen } from '@shoutem/ui';

import styles from './styles';

export default class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Screen>
                <NavigationBar
                    style={{backgroundColor: '#2980b9'}}
                    statusBar={statusBarConfig}
                    title={titleConfig}
                    leftButton={leftButtonConfig(this.props.navigator)}
                />
            </Screen>
        );
    }
}

const statusBarConfig = {
    hidden: true,
    hideAnimation: 'fade'
};

const titleConfig = {
    title: 'Settings',
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