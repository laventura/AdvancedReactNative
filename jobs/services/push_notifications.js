import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

// Backend used for storing tokens
const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';


export default async () => {
    let previousToken = await AsyncStorage.getItem('pushtoken');
    console.log('Previous token:', previousToken);  // DEBUG

    if (previousToken) {
        return; // existing permission 
    } else {
        // Ask User for Permissions - via a pop up
        let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
        
        if (status !== 'granted') {
            return;
        }

        // Identify this User's device
        let token = await Notifications.getExponentPushTokenAsync();
        // POST token to our backend
        await axios.post(PUSH_ENDPOINT, { token: { token } });
        // Save to AsyncStorage
        AsyncStorage.setItem('pushtoken', token);
    }
};
