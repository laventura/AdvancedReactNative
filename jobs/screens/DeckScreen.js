import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';

// local
import Swipe from '../components/Swipe';    // our Deck of Cards made earlier
import * as actions from '../actions';

class DeckScreen extends Component {

    // when React Navigation navigates to this component, it check these navOptions
    // to decide how to render the component on navbar 
    static navigationOptions = {
        title: 'Jobs',
         tabBarIcon: ({ tintColor }) => {
            return <Icon name="description" size={30} color={tintColor} />;
        }
    }

    // show a single job
    renderCard(job) {
        const initialRegion = {
            latitude:   job.latitude,
            longitude:  job.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        };

        return (
            <Card title={job.jobtitle}>
                <View style={{ height: 300 }}>
                    <MapView
                      scrollEnabled={false}
                      style={{ flex: 1 }}
                      cacheEnabled={Platform.OS === 'android' ? true : false}
                      initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </Text>
            </Card>
        );
    }

    // callback - when no more jobs
    // show a button - and nav to Map
    // use arrow func () =>  because
    // we want the Deckscreen to exec the func renderNoMoreCards(), not the SwipeScreen in this case,
    // because, otherwise SwipeScreen does not have prop 'navigation', so it will complain

    renderNoMoreCards = () => {
        return (
            <Card title="No More Jobs">
                <Button
                    title="Back To Map"
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor="#03A9F4"
                    raised={true}
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    // main render
    render() {
        return (
            <View style={{ marginTop: 10 }}>
              <Swipe 
                data={this.props.jobs}
                renderCard={this.renderCard}
                renderNoMoreCards={this.renderNoMoreCards}
                keyProp="jobkey"    // the unique ID for the job (for sorting in Swipe.js)
                onSwipeRight={job => this.props.likeJob(job)}
              />
            </View>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
};

// get list of jobs 
function mapStateToProps({ jobs }) {
    // return the list of jobs from Indeed REST API
    return { jobs: jobs.results };
}

// wire up to Redux State
export default connect(mapStateToProps, actions)(DeckScreen);
