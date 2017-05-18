import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

// local
import * as actions from '../actions';   // bcos we setup actions/index.js


class AuthScreen extends Component {

    // lifecycle
    componentDidMount() {
        // 1 - login to FB
        this.props.facebookLogin(); // async - from actions
        // AsyncStorage.removeItem('fb_token');  // TEMP ONLY!! to remove FB token
        // 2 - post-login ritual
        this.onAuthComplete(this.props);
    }

    // lifecycle - when component is just about to be rendered
    componentWillReceiveProps(nextProps) {
        // when User has successfully logged into FB
        this.onAuthComplete(nextProps);
    }

    // callback: nav to Map Screen when logged into FB
    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        console.log('Created AuthScreen');
        return (
            <View />
        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

// wire up the actions to connect helper
// args are: mapStateToProps, actions
export default connect(mapStateToProps, actions)(AuthScreen);
