import _ from 'lodash';

import {
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case LIKE_JOB:
            // capture only the uniq job, but not the same job
            // only return a uniq job from among ALL the jobs liked before (state), 
            // and this new one (action.payload)
            return _.uniqBy([
                action.payload, ...state
            ], 'jobkey');

        case CLEAR_LIKED_JOBS:
            // remove everything from liked jobs
            return [];

        default:
            return state;
    }
}