import { LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/types";

const initialState = {
  likedJobs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIKE_JOB:
      return {
        ...state,
        likedJobs: [action.payload, ...state.likedJobs]
      };
    case CLEAR_LIKED_JOBS: {
      return {
        likedJobs: []
      }
    }
    default:
      return state;
  }
}
