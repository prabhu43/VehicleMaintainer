/**
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import MyVehicles from "./components/MyVehicles";
import AddVehicle from "./components/AddVehicle";
import Realm from "realm";


const Stack = createStackNavigator();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        new Realm({
                path: "VehicleMaintainerDB.realm",
                schema: [
                    {
                        name: "vehicles",
                        primaryKey: "name",
                        properties: {
                            name: "string",
                            type: "string",
                            make: "string",
                            model: "string",
                            variant: "string",
                            purchaseDate: "date"
                        }
                    }
                ]
            }
        );
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"MyVehicles"}>
                    <Stack.Screen name="MyVehicles" component={MyVehicles} options={{title: "My Vehicles"}}/>
                    <Stack.Screen name="AddVehicle" component={AddVehicle} options={{title: "Add Vehicle"}}/>
                </Stack.Navigator>

            </NavigationContainer>
        );
    }
}