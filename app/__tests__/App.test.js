/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Realm from 'realm';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  Realm.clearTestState();
});
