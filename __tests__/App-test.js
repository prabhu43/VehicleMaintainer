/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../app/App';
import Realm from 'realm';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

afterAll(() => {
  Realm.clearTestState();
});
