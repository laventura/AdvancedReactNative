import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';

class SettingsScreen extends Component {

    // main render
    render() {
        // clear out any Liked Jobs
        return (
            <View style={{ marginTop: 10 }} >
               <Button 
                  title="Reset Liked Jobs"
                  large
                  icon={{ name: 'delete-forever' }}
                  backgroundColor="#F44336"
                  raised={true}
                  onPress={this.props.clearLikedJobs}
               />
            </View>
        );
    }
}

// wire up Redux
export default connect(null, actions)(SettingsScreen);
