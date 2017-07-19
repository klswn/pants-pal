import {
   FETCH_LOCATION_START,
   RECEIVE_LOCATION,
   FETCH_LOCATION_ERROR,
} from '../actions/location';

const initialState = {};

export function location(state = initialState, action) {
   switch (action.type) {
      case FETCH_LOCATION_START:
         return {
            ...state,
            isFetching: true
         };
      case RECEIVE_LOCATION:
         return {
            ...state,
            isFetching: false,
            isFetched: true,
            title: action.title,
            woeid: action.woeid
         };
      case FETCH_LOCATION_ERROR:
         return {
            ...state,
            isFetching: false,
            isFetched: false,
            error: action.error
         };
      default:
         return state;
   }
}
