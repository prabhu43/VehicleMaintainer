/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Container} from 'native-base';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Images from '@assets/images';
import Realm from 'realm';
import VehicleItem from './VehicleItem';

let realm;

export default class MyVehicles extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({path: 'VehicleMaintainerDB.realm'});
        this.state = {
            vehicles: realm.objects('vehicles'),
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                vehicles: realm.objects('vehicles'),
            });
        });
    }

    render() {
        return (
            <Container>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.vehicles}
                        renderItem={({item}) => (
                            <VehicleItem
                                vehicle={item}
                                navigation={this.props.navigation}
                            />
                        )}
                        keyExtractor={item =>
                            item.name
                                .toLowerCase()
                                .split(' ')
                                .join('')
                        }
                    />
                    <TouchableOpacity
                        testID="AddVehicleButton"
                        activeOpacity={0.7}
                        style={styles.touchableOpacityStyle}
                        onPress={() => {
                            this.props.navigation.navigate('AddVehicle', {
                                mode: 'create',
                                title: 'Add Vehicle',
                            });
                        }}>
                        <Image
                            source={Images.plusIcon}
                            style={styles.floatingButtonStyle}
                        />
                    </TouchableOpacity>
                </SafeAreaView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingButtonStyle: {
        height: 50,
        resizeMode: 'contain',
        width: 50,
    },
    touchableOpacityStyle: {
        alignItems: 'center',
        bottom: 30,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        right: 30,
        width: 50,
    },
});
