/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import Images from '@assets/images';

import {Container, Header, Text, Body, Title, Content} from 'native-base';
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
                <Content contentContainerStyle={{ flexGrow: 1 }} >
                    <Text>Hello world</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.TouchableOpacityStyle}
                        onPress={() => console.log("Add new vehicle")}
                    >
                        <Image
                            //We are making FAB using TouchableOpacity with an image
                            //We are using online image here
                            // source={{
                            //     uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                            // }}
                            //You can use you project image Example below
                            source={Images.plusIcon}
                            style={styles.FloatingButtonStyle}
                        />
                    </TouchableOpacity>
                </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
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

