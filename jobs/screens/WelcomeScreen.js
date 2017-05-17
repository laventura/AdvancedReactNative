import React, { Component } from 'react';
import { View, Text } from 'react-native';
// local
import Slides from '../components/Slides';

// static list of slides for Tutorials - to be passed down to Slides components
const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to find your job', color: '#009688'  },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {

    // callback - for SlidesComplete - nav to Auth Screen
    // NOTE: if we dont use arrow func () =>, then we must use .bind(this)
    onSlidesComplete() {
        // navigate to Auth Screen when Slides compeleted
        // 'navigation' props is passed onto WelcomeScreen automatically
        this.props.navigation.navigate('auth');
    }

    // main render
    render() {
        console.log('Created WelcomeScreen');
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
        );
    }
}

export default WelcomeScreen;
