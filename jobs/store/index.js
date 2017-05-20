import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// for Redux Persist
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

// local
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk),
        autoRehydrate()     // enhances Redux; enables storage across App shutdowns 
    )

);

// informs where to store (AsyncStorage) when Redux state changes 
// whitelist - tells which prop to save (keep safe)
//// 'likedJobs' comes from combined reducers/index.js
persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;
