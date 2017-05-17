import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

// local 
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

class App extends React.Component {
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
        })
      }
    });

    return (
        <MainNavigator />
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
