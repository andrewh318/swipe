import axios from "axios";

import {
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_REQUEST,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from "./types";

const API_ENDPOINT = "https://jobs.github.com/positions.json?lat=37.3229978&long=-122.0321823";


export const fetchJobs = (region, callback) => {
    return async function(dispatch) {
    try {
        dispatch({type: FETCH_JOBS_REQUEST});
        const response = await axios.get(API_ENDPOINT);
        const jobs = response.data.slice(0, 10)
        dispatch({type: FETCH_JOBS_SUCCESS, payload: jobs});
        callback();
    } catch (err) {
        console.log(err);
    }

    }
}; 

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    };
}

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    }
}