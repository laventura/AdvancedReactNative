import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';

class SettingsScreen extends Component {
    render() {
        // clear out any Liked Jobs
        return (
            <View>
               <Button 
                  title="Reset Liked Jobs"
                  large
                  icon={{ name: 'delete-forever' }}
                  backgroundColor="#F44336"
                  onPress={this.props.clearLikedJobs}
               />
            </View>
        );
    }
}

// wire up Redux
export default connect(null, actions)(SettingsScreen);
