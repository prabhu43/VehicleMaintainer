/**
 * @format
 */

import 'react-native';
import React from 'react';
import Realm from 'realm';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AddVehicle from '../AddVehicle';

it('renders correctly', () => {
    let routeParams = {params: {mode: 'create'}};
    const tree = renderer.create(<AddVehicle route={routeParams} />).toJSON();
    expect(tree).toMatchSnapshot();
});

afterAll(() => {
    Realm.clearTestState();
});
