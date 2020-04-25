/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Container, Content, Text} from "native-base";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import Images from '@assets/images';


export default class MyVehicles extends React.Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    <Text>Hello world</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.TouchableOpacityStyle}
                        onPress={() => {
                            console.log("Navigate to AddVehicle!");
                            this.props.navigation.navigate("AddVehicle")
                        }
                        }
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
        )
    }
}

const styles = StyleSheet.create({
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

