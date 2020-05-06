import React from "react";
import Realm from "realm";
import {ImageBackground, StyleSheet, View, Alert} from "react-native";
import {Text, Fab, Icon, Button} from "native-base";
import Images from '@assets/images';
import moment from "moment";

let realm;

export default class VehicleInfo extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({path: "VehicleMaintainerDB.realm"});
        let {name} = this.props.route.params;
        this.state = {
            vehicle: realm.objectForPrimaryKey("vehicles", name),
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        Alert.alert('Delete vehicle', 'Confirm to delete?',
            [
                {
                    text: 'Confirm', onPress: () => {
                        realm.write(() => {
                            realm.delete(this.state.vehicle)
                        });
                        this.props.navigation.goBack();
                    }
                },
                {
                    text: 'Cancel', onPress: () => {
                        this.setState((prevState) => ({
                            ...prevState,
                            showFAB: !prevState.showFAB
                        }));
                    }
                },
            ],
        )
    }

    render() {
        let {vehicle} = this.state;
        let vehicleImage;
        if (vehicle.type === "Bike") {
            vehicleImage = Images.bike
        } else if (vehicle.type === "Car") {
            vehicleImage = Images.car
        }
        return (
            <View style={{flex: 1}}>
                <View style={styles.info}>
                    <View style={styles.left}>
                        <View style={styles.item}>
                            <Text style={styles.label}>Make</Text>
                            <Text style={styles.title}>{vehicle.make}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>Model</Text>
                            <Text style={styles.title}>{vehicle.model}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>Variant</Text>
                            <Text style={styles.title}>{vehicle.variant}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>PurchaseDate</Text>
                            <Text style={styles.title}>{moment(vehicle.purchaseDate).format("DD/MM/YYYY")}</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <ImageBackground style={styles.vehicleImage} source={vehicleImage}/>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Fab
                        active={this.state.showFAB}
                        direction="up"
                        containerStyle={{}}
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => this.setState((prevState) => ({
                            ...prevState,
                            showFAB: !prevState.showFAB
                        }))
                        }
                    >
                        <Icon type="SimpleLineIcons" name="options"/>
                        {
                         this.state.showFAB ?
                             <Button style={{backgroundColor: '#34A34F'}}>
                                <Icon type="MaterialIcons" name="edit"/>
                            </Button> : null
                        }
                        {
                            this.state.showFAB ?
                                <Button style={{backgroundColor: '#3B5998'}}>
                                    <Icon type="MaterialIcons" name="delete"
                                          onPress={this.handleDelete}/>
                                </Button> : null
                        }

                    </Fab>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    info: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 40,
        marginVertical: 12,
        marginHorizontal: 12,
        flexDirection: "row"
    },
    left: {
        width: "65%",
    },
    right: {
        justifyContent: "center",
    },
    item: {
        padding: 10,
    },
    label: {
        fontSize: 12,
        fontStyle: "italic"
    },
    title: {
        fontSize: 20,
    },
    vehicleImage: {
        backgroundColor: "#03b1fc",
        borderRadius: 60,
        width: 120,
        height: 120
    },
});
