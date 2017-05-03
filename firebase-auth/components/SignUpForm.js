import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

// My Google Cloud Funcs
// 
const ROOT_URL = 'https://us-central1-one-time-password-106aa.cloudfunctions.net';
const CREATE_USER = 'createUser';
const REQUEST_ONE_TIME_PASSWORD = 'requestOneTimePassword';
const VERIFY_ONE_TIME_PASSWORD = 'verifyOneTimePassword';

class SignUpForm extends Component {
    // component-level state
    constructor(props) {
        super(props);

        // init val is blank
        this.state = { phone: '', error: '' }; // component level state!
    }

    // state = { phone: '' };  // ES7 syntax, abs identical to ctor above

    // handler for SUBMIT button
    handleSubmit = async () => {
      try {
        // 1 - Call Firebase Google Cloud function - to Create User - with their Phone num
        await axios.post(`${ROOT_URL}/${CREATE_USER}`, { phone: this.state.phone });
        // 2 - Request One Time Password from Firebase
        await axios.post(`${ROOT_URL}/${REQUEST_ONE_TIME_PASSWORD}`, { phone: this.state.phone });
      } catch (err) {
          console.log(`Request failed: ${err}`);
          this.setState({ error: `Request failed: ${err}` });
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
                    onChangeText={phone => this.setState({ phone: phone })}
                 />
              </View>
                <Button 
                    onPress={this.handleSubmit}
                    title="Submit" 
                />
            </View>
        );
    }
}

// export
export default SignUpForm;
