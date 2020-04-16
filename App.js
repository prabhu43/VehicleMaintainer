/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { Container, Header, Text, Body, Title, Content } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
          <Header>
            <Body>
              <Title>My Vehicles</Title>
            </Body>
          </Header>
          <Content>
            <Text>Open up App.js to start working on your app!</Text>
          </Content>

        </Container>
    );
  }
}
