import React from 'react';
import Realm from 'realm';
import {ImageBackground, StyleSheet, View, Alert} from 'react-native';
import {Text, Fab, Icon, Button} from 'native-base';
import Images from '@assets/images';
import Colors from '../common/colors';
import moment from 'moment';

let realm;

export default class VehicleInfo extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({path: 'VehicleMaintainerDB.realm'});
        let {name} = this.props.route.params;
        this.state = {
            vehicle: realm.objectForPrimaryKey('vehicles', name),
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            let {name} = this.props.route.params;
            this.setState({
                showFAB: false,
                vehicle: realm.objectForPrimaryKey('vehicles', name),
            });
        });
    }

    handleEdit() {
        console.log('Edit vehicle', this.state.vehicle.name);
        this.props.navigation.navigate('AddVehicle', {
            title: 'Edit Vehicle',
            mode: 'edit',
            name: this.state.vehicle.name,
        });
    }

    handleDelete() {
        Alert.alert('Delete vehicle', 'Confirm to delete?', [
            {
                text: 'Confirm',
                onPress: () => {
                    console.log('Delete vehicle', this.state.vehicle.name);
                    realm.write(() => {
                        realm.delete(this.state.vehicle);
                    });
                    this.props.navigation.goBack();
                },
            },
            {
                text: 'Cancel',
                onPress: () => {
                    this.setState(prevState => ({
                        ...prevState,
                        showFAB: !prevState.showFAB,
                    }));
                },
            },
        ]);
    }

    render() {
        let {vehicle} = this.state;
        let vehicleImage;
        if (vehicle.type === 'Bike') {
            vehicleImage = Images.bike;
        } else if (vehicle.type === 'Car') {
            vehicleImage = Images.car;
        }
        return (
            <View style={styles.page}>
                <View style={styles.info}>
                    <View style={styles.left}>
                        <View style={styles.item}>
                            <Text style={styles.label}>Make</Text>
                            <Text style={styles.title} testID="make">
                                {vehicle.make}
                            </Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>Model</Text>
                            <Text style={styles.title} testID="model">
                                {vehicle.model}
                            </Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>Variant</Text>
                            <Text style={styles.title} testID="variant">
                                {vehicle.variant}
                            </Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>PurchaseDate</Text>
                            <Text style={styles.title} testID="purchaseDate">
                                {moment(vehicle.purchaseDate).format(
                                    'MMMM DD, YYYY',
                                )}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <ImageBackground
                            style={styles.vehicleImage}
                            source={vehicleImage}
                        />
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <Fab
                        active={this.state.showFAB}
                        direction="up"
                        containerStyle={{}}
                        style={styles.fab}
                        position="bottomRight"
                        onPress={() =>
                            this.setState(prevState => ({
                                ...prevState,
                                showFAB: !prevState.showFAB,
                            }))
                        }>
                        <Icon
                            type="SimpleLineIcons"
                            name="options"
                            testID="options"
                        />
                        {this.state.showFAB ? (
                            <Button style={styles.editButton}>
                                <Icon
                                    type="MaterialIcons"
                                    name="edit"
                                    testID="editVehicle"
                                    onPress={this.handleEdit}
                                />
                            </Button>
                        ) : null}
                        {this.state.showFAB ? (
                            <Button style={styles.deleteButton}>
                                <Icon
                                    type="MaterialIcons"
                                    name="delete"
                                    testID="deleteVehicle"
                                    onPress={this.handleDelete}
                                />
                            </Button>
                        ) : null}
                    </Fab>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottomSection: {
        flex: 1,
    },
    deleteButton: {backgroundColor: Colors.darkblue},
    editButton: {backgroundColor: Colors.green},
    fab: {backgroundColor: Colors.mediumblue},
    info: {
        backgroundColor: Colors.lightblue,
        borderRadius: 40,
        flexDirection: 'row',
        marginHorizontal: 12,
        marginVertical: 12,
        padding: 10,
    },
    item: {
        padding: 10,
    },
    label: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    left: {
        width: '65%',
    },
    page: {
        flex: 1,
    },
    right: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
    },
    vehicleImage: {
        backgroundColor: Colors.cyan,
        borderRadius: 60,
        height: 120,
        width: 120,
    },
});
