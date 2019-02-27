import { FETCH_JOBS_SUCCESS } from "../actions/types";

const initialState = {
  results: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return { results: action.payload };
    default:
      return state;
  }
}
