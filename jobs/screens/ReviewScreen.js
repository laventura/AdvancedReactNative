import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';

import { connect } from 'react-redux';

class ReviewScreen extends Component {

    // class property: to show how to show/nav ReviewScreen
    static navigationOptions = ({ navigation }) => ({
        // name of Tab, and the Header for that screen
        // header will return an object that customizes the Header for the tab
        // the 'settings' key is defined in main.js
        title:  'Review Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />;
        },
        headerRight: (
            <Button 
                title="Settings" 
                onPress={() => { navigation.navigate('settings'); }}
                backgroundColor='rgba(0,0,0,0)'
                color='rgba(0, 122, 255, 1)'
            />
        )
    })

    // helper - show all Liked Jobs
    renderLikedJobs() {
        return this.props.likedJobs.map(job => {

            // destructure 
            const { company, formattedRelativeTime, 
                url, longitude, latitude,
                jobtitle, jobkey } = job;

            const initialRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };


            return (
                <Card title={jobtitle} key={jobkey}>
                  <View style={{ height: 200 }}>
                      <MapView 
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android'}
                        scrollEnabled={false}
                        initialRegion={initialRegion}
                      />
                      <View style={styles.detailWrapper}>
                          <Text style={styles.italics}>{company}</Text>
                          <Text style={styles.italics}>{formattedRelativeTime}</Text>
                      </View>
                      <Button
                        title="Apply Now!"
                        backgroundColor="#03A9F4"
                        onPress={() => Linking.openURL(url)}
                        raised={true}
                      />
                  </View>
                </Card>
            );
        });
    }

    // main render
    render() {
        console.log('Created ReviewScreen');
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};

// create a new prop 'likedJobs' based on reducer likedJobs
function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
