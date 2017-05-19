import {
    FETCH_JOBS
} from '../actions/types';

// initial 
const INITIAL_STATE = {
    results: []
};

// reducers
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        // return only the new jobs found (not accumulated set of jobs)
        // the 'results' from the returned json will have the list of jobs
        case FETCH_JOBS:
            return action.payload;
        default: 
            return state;
    }
}

