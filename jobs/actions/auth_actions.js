// All Actions with Facebook Authentication

import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

// AsyncStorage is a Key-Value store on the User's device 
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

// Action Creator (async)
/// Bcos it is async, we have to use ReduxThunk and use dispatch()
export const facebookLogin = () => {
    // check for FB Login Success Token in AsyncStorage (on User's Phone)

    return async (dispatch) => {
        // 1 - get FB token
        let token = await AsyncStorage.getItem('fb_token'); // get async'ly the token
        if (token) {
            // 1.1 Dispatch an action saying FB login is done
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
        } else {
            // 2. Start FB login process..
            doFacebookLogin(dispatch);
        }
    };
};

// perform FB login
//  async func
const doFacebookLogin = async (dispatch) => {
    // 1 - login to FB with App ID, request minimal perms; we dont store anything FB
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('196207057539134', { // stephen's FB app ID
        permissions: ['public_profile']
    });
    // 2 - result has 'type' and 'token'
    if (type === 'cancel') {
        // 2.1 - dispatch a FAIL action
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    // 3 - save the token (wait for it)
    await AsyncStorage.setItem('fb_token', token);
    // 4 - dispatch the SUCCESS action
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
