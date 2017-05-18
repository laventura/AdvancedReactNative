import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
// local
import Slides from '../components/Slides';

// static list of slides for Tutorials - to be passed down to Slides components
const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to find your job', color: '#009688'  },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {

    // Use AppLoading to figure out if fb_token exists or not
    state = { token: null }

    // lifecycle:
    async componentWillMount() {
        // 1 - wait till we find fb_token
        let token = await AsyncStorage.getItem('fb_token');
        // 2 - if token exists, nav to MapScreen
        if (token) {
            this.props.navigation.navigate('map');
            this.setState({ token });   // set it explicitly
        } else {
            this.setState({ token: false });
        }
    }


    // callback - for SlidesComplete - nav to Auth Screen
    // NOTE: if we dont use arrow func () =>, then we must use .bind(this)
    onSlidesComplete() {
        // navigate to Auth Screen when Slides compeleted
        // 'navigation' props is passed onto WelcomeScreen automatically
        this.props.navigation.navigate('auth');
    }

    // main render
    render() {
        // 1 - when componet first renders - token is null
        if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }
        // 2 - else, token is false, in which case, show the WelcomeScreen
        // 3 if token is true, then Nav to MapScreen (see componentWillMount)
        console.log('Created WelcomeScreen');
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
        );
    }
}

export default WelcomeScreen;
