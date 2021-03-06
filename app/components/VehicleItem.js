/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ImageBackground, StyleSheet, TouchableHighlight} from 'react-native';
import {Text} from 'native-base';
import Images from '@assets/images';
import Colors from '../common/colors';

export default class VehicleItem extends React.Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        let vehicleName = this.props.vehicle.name;
        this.props.navigation.navigate('VehicleInfo', {name: vehicleName});
    }

    render() {
        let {vehicle} = this.props;
        let vehicleName = vehicle.name;
        let bgImage;
        if (vehicle.type === 'Car') {
            bgImage = Images.car;
        } else {
            bgImage = Images.bike;
        }
        return (
            <TouchableHighlight
                style={styles.item}
                underlayColor={'#03b1fc'}
                onPress={this.handlePress}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <Text style={styles.title}>{vehicleName}</Text>
                    <Text style={styles.text}>{vehicle.make} </Text>
                    <Text style={styles.text}>{vehicle.model}</Text>
                    <Text style={styles.text}>{vehicle.variant}</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    item: {
        backgroundColor: Colors.lightblue,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 15,
    },
    text: {
        fontStyle: 'italic',
    },
    title: {
        fontSize: 24,
    },
});
