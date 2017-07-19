import {
   FETCH_POSITION_START,
   RECEIVE_POSITION,
   FETCH_POSITION_ERROR
} from '../actions/position';

const initialState = {
   latitude: '',
   longitude: '',
   isFetching: false,
   isFetched: false
};

export function position(state = initialState, action) {
   switch (action.type) {
      case FETCH_POSITION_START:
         return {
            ...state,
            isFetching: true
         };
      case RECEIVE_POSITION:
         return {
            ...state,
            latitude: action.latitude,
            longitude: action.longitude,
            isFetching: false,
            isFetched: true
         };
      case FETCH_POSITION_ERROR:
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
