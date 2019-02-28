import { FETCH_JOBS_SUCCESS, FETCH_JOBS_REQUEST } from "../actions/types";

const initialState = {
  results: [],
  isFetching: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_JOBS_SUCCESS:
      return { results: action.payload, isFetching: false };
    default:
      return state;
  }
}
