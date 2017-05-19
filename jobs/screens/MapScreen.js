import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';  // this encapsulates AirBnB's React-Native MapView
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
// local 
import * as actions from '../actions';


class MapScreen extends Component {
    // component state (init val)
    state = {
        mapLoaded: false,
        region: {
            longitude:  -122,
            latitude:   37,
            longitudeDelta: 0.04,
            latitudeDelta:  0.09
        }
    }

    // lifecycle
    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    // callback - when User completes change of Region
    onRegionChangeComplete = (region) => {
        // console.log('MapView Region:', region);
        this.setState({ region });
    }

    // button press - fire off a query to Indeed
    onButtonPress = () => {
        // fire off the action to Indeed - via the action creator, passing in this region
        this.props.fetchJobs(this.state.region);
    }

    // main render
    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    region={this.state.region}
                    style={{ flex: 1 }}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContainer}>
                    <Button 
                        large
                        title="Search This Area"
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        );
    }
}

// style
const styles = {
    buttonContainer: {
        position: 'absolute',   // floating button
        bottom: 20,
        left: 0,
        right: 0
    }
};

// connect helper wired with actions (jobs)
export default connect(null, actions)(MapScreen);
