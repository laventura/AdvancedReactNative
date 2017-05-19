// Actions for Job Search API

import axios from 'axios';  // for networking
import reverseGeocode from 'latlng-to-zip'; 
import qs from 'qs'; // for query string construction

// new Action type
import {
    FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

// params for Job search: radius (miles), latlong (1 = return latlong), q (search term), 
const JOB_QUERY_PARAMS = {
    publisher: '3140900416013473',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 20,
    q: 'swift'
};

// create query string 
const buildJobsUrl = (zip) => {
    // pass in 'location' as param 'l' with zip
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;  
};

// Fetch Jobs Action (concise format)
export const fetchJobs = (region) =>  async (dispatch) => {
    // 'region' prop contains lat/long info - so just pass region as-is
    try { 
        // 1 - convert from lat/long to zip code
        console.log(' JobActions: converting region to zip');
        let zip = await reverseGeocode(region);
        console.log('convert region to zip', region, zip); // debug

        // 2 - get job search query URL
        const url = buildJobsUrl(zip);
        console.log('Searching for:', url); // debug

        // 3 - make actual REST API request
        let { data } = await axios.get(url);

        // 4 - dispatch Action - pass all data we got from REST
        dispatch({ type: FETCH_JOBS, payload: data }); 
        console.log(data);  // debug
    } catch (e) {
        console.error(e);
    }
};
