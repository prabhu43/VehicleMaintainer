/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Container} from "native-base";
import {FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import Images from '@assets/images';
import Realm from "realm";
import VehicleItem from "./VehicleItem";

let realm;

export default class MyVehicles extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({ path: "VehicleMaintainerDB.realm" });
        this.state = {
            vehicles: realm.objects("vehicles")
        };

        this.vehiclesListItems = this.vehiclesListItems.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener("focus", () => {
            this.setState({
                vehicles: realm.objects("vehicles")
            });
        });
    }

    vehiclesListItems() {
        return this.state.vehicles.map((vehicle) => {
            let itemKey = vehicle.name.toLowerCase().split(" ").join("");
            return (<VehicleItem key={itemKey} vehicle={vehicle}/>);
        });
    }

    render() {
        return (
            <Container>
                {/*<View style={{ flex: 1 }}>*/}
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={this.state.vehicles}
                            renderItem={({ item }) => <VehicleItem vehicle={item}/>}
                            keyExtractor={item => item.name.toLowerCase().split(" ").join("")}
                        />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.TouchableOpacityStyle}
                        onPress={() => {
                            this.props.navigation.navigate("AddVehicle")
                        }
                        }
                    >
                        <Image
                            source={Images.plusIcon}
                            style={styles.FloatingButtonStyle}
                        />
                    </TouchableOpacity>
                    </SafeAreaView>
                {/*</View>*/}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        // backgroundColor:'black'
    },
});

