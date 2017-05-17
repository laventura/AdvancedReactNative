import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {

    // class property: to show how to show/nav ReviewScreen
    static navigationOptions = ({ navigation }) => ({
        // name of Tab, and the Header for that screen
        // header will return an object that customizes the Header for the tab
        // the 'settings' key is defined in main.js
        title:  'Review Jobs',
        headerRight: (
            <Button 
                title="Settings" 
                onPress={() => { navigation.navigate('settings'); }}
                backgroundColor='rgba(0,0,0,0)'
                color='rgba(0, 122, 255, 1)'
            />
        )
    })

    // main render
    render() {
        console.log('Created ReviewScreen');
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}

export default ReviewScreen;
