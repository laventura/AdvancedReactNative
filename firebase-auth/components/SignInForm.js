import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

// My Google Cloud Funcs
// 
const ROOT_URL = 'https://us-central1-one-time-password-106aa.cloudfunctions.net';
const VERIFY_ONE_TIME_PASSWORD = 'verifyOneTimePassword';

class SignInForm extends Component {
    // component-level state
    constructor(props) {
        super(props);

        // init val is blank
        this.state = { phone: '', code: '', error: '' }; // component level state!
    }

    // state = { phone: '' };  // ES7 syntax, abs identical to ctor above

    // handler for SUBMIT button
    handleSubmit = async () => {
      try {
          // 1 - Verify the OTP (passing in phone / code), receive Json Web Token (JWT)
          let { data } = await axios.post(`${ROOT_URL}/${VERIFY_ONE_TIME_PASSWORD}`, {
              phone: this.state.phone, code: this.state.code
          });
          // 2 - Authenticate to Firebase
          firebase.auth().signInWithCustomToken(data.token);
      } catch (err) {
          console.log('Verify: ' + err);
      }
    }

    // -- main render --
    render() {
        return (
            <View>
              <View style={{ marginBottom: 12 }}>
                <FormLabel>Enter Phone Number:</FormLabel>
                <FormInput
                    value={this.state.phone}
                    onChangeText={phone => this.setState({ phone })}
                 />
              </View>

              <View style={{ marginBottom: 12 }}>
                <FormLabel>Enter Code:</FormLabel>
                <FormInput
                    value={this.state.code}
                    onChangeText={code => this.setState({ code })}  // same syntax as above
                 />
              </View>

                <Button 
                    onPress={this.handleSubmit}
                    title="Verify Code" 
                />
            </View>
        );
    }
}

// export
export default SignInForm;
