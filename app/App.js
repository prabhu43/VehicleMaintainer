/**
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import MyVehicles from "./components/MyVehicles";

const Stack = createStackNavigator();

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="MyVehicles" component={MyVehicles} options={{ title: 'My Vehicles' }}/>
                </Stack.Navigator>

            </NavigationContainer>
        );
    }
}