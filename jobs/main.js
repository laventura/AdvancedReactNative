import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

// Redux stuff
import { Provider } from 'react-redux'; 

import store from './store';
import registerForNotifications from './services/push_notifications';

// local 
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

class App extends React.Component {

  // lifecycle
  componentDidMount() {
    // 1 - reg for Push Notifications
    registerForNotifications(); 

    // 2 - handler for when Push Notif are received
    Notifications.addListener((notification) => {
      // grab the data + origin from inside the notification
      const { data: { text }, origin } = notification;

      // 2.a -- Show the Notification Alert to User. 
      // Can also Nav to other screens, etc. etc.
      if (origin === 'received' && text) {
          Alert.alert(
            'New Push Notification',
            text, 
            [{ text: 'Ok' }]
        );
      }
    }); // listener
  }

  render() {
    // create navigator: with a nested TabNavigator at 'main', and StackNavigator inside it
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },  // keys 'welcome' / 'auth' can be used programmatically
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              innerReview: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, { // 2nd arg to TabNavigator
          tabBarPosition: 'bottom', 
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      // config options for the outer TabNavigator
      // lazily load the FB Auth login
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
