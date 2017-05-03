import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
// local imports
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

class App extends React.Component {
  // lifecycle
  componentDidMount() {

      // Initialize Firebase
      const config = {
        apiKey: "AIzaSyA9lScpuWdGm0_PARRxb_HUzb9X6MJRGkU",
        authDomain: "one-time-password-106aa.firebaseapp.com",
        databaseURL: "https://one-time-password-106aa.firebaseio.com",
        projectId: "one-time-password-106aa",
        storageBucket: "one-time-password-106aa.appspot.com",
        messagingSenderId: "636840219839"
      };
      firebase.initializeApp(config);

  }

  // main render ------
  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

Expo.registerRootComponent(App);
