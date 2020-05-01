/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from "react-native";
import {Text} from "native-base";
import Images from '@assets/images';

export default class VehicleItem extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let {vehicle} = this.props;
        let vehicleName = vehicle.name;
        let bgImage;
        if (vehicle.type === "Car") {
            bgImage = Images.car
        } else {
            bgImage = Images.bike
        }
        return (
            <View style={styles.item}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <Text style={styles.title}>{vehicleName}</Text>
                    <Text>{vehicle.make} </Text>
                    <Text>{vehicle.model}</Text>
                    <Text>{vehicle.variant}</Text>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightblue',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    }
});
